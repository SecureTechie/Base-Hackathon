import React, { useEffect, useState, useCallback } from "react";

export default function ConnectWallet() {
  const [account, setAccount] = useState(null);

  const handleAccounts = useCallback((accounts) => {
    if (Array.isArray(accounts)) {
      setAccount(accounts[0] || null);
    } else {
      setAccount(accounts || null);
    }
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum
      .request({ method: "eth_accounts" })
      .then((acc) => handleAccounts(acc))
      .catch(() => {})
    ;

    const onAccountsChanged = (acc) => handleAccounts(acc);
    window.ethereum.on && window.ethereum.on("accountsChanged", onAccountsChanged);

    return () => {
      window.ethereum && window.ethereum.removeListener && window.ethereum.removeListener("accountsChanged", onAccountsChanged);
    };
  }, [handleAccounts]);

  async function connect() {
    if (!window.ethereum) {
      alert("No crypto wallet found. Please install MetaMask or similar.");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      handleAccounts(accounts);
    } catch (err) {
      console.error("Wallet connect failed", err);
    }
  }

  function short(addr) {
    if (!addr) return "";
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  }

  return (
    <div className="connect-wallet">
      {account ? (
        <button className="btn" onClick={() => navigator.clipboard?.writeText(account) } title="Click to copy">
          {short(account)}
        </button>
      ) : (
        <button className="btn" onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}
