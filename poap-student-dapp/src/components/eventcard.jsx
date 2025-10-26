import React, { useState } from "react";
import { requestSignature } from "../services/api";
import { mintPOAP } from "../services/poapContract";

export default function EventCard({ event }) {
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);

  async function claim() {
    try {
      setLoading(true);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const wallet = accounts[0];
      const signature = await requestSignature(event.name, wallet);
      const receipt = await mintPOAP(event.name, signature);
      setTxHash(receipt.transactionHash || receipt.hash || "success");
      alert("Mint successful! Tx: " + (receipt.transactionHash || receipt.hash || ""));
    } catch (err) {
      console.error(err);
      alert("Claim failed: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="event-card">
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <div className="event-actions">
        <button className="btn primary" onClick={claim} disabled={loading}>
          {loading ? "Claiming..." : "Claim Badge"}
        </button>
        {txHash && <small className="tx">Tx: {txHash}</small>}
      </div>
    </div>
  );
}
