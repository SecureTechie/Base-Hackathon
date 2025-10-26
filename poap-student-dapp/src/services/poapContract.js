import { ethers } from "ethers";
import POAP_ABI from "./poapAbi.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_POAP_CONTRACT_ADDRESS;

export function getProvider() {
  if (!window.ethereum) {
    throw new Error("No crypto wallet found");
  }
  return new ethers.BrowserProvider(window.ethereum);
}

export async function getSigner() {
  const provider = getProvider();
  const signer = await provider.getSigner();
  return signer;
}

export async function getContract(signerOrProvider) {
  return new ethers.Contract(CONTRACT_ADDRESS, POAP_ABI, signerOrProvider);
}

export async function mintPOAP(eventName, signature) {
  try {
    const signer = await getSigner();
    const contract = await getContract(signer);
    const tx = await contract.mintPOAP(eventName, signature);
    const receipt = await tx.wait();
    console.log("POAP minted successfully:", receipt);
    return receipt;
  } catch (error) {
    console.error("Error minting POAP:", error);
    throw error;
  }
}

// ✅ Only one unified version of getMyPOAPs to prevent redeclaration
export async function getMyPOAPs() {
  const provider = getProvider();
  const signer = await provider.getSigner();
  const address = (await signer.getAddress()).toLowerCase();
  const contract = await getContract(provider);

  // Try calling the contract method with the address first (most contracts expect the caller/address),
  // then fallback to a no-arg call if that fails. Normalize the return value to an array.
  if (typeof contract.getMyPOAPs === "function") {
    try {
      const res = await contract.getMyPOAPs(address);
      return Array.isArray(res) ? res : [res];
    } catch (err) {
      // try no-arg version
      try {
        const res2 = await contract.getMyPOAPs();
        return Array.isArray(res2) ? res2 : [res2];
      } catch (err2) {
        console.error("getMyPOAPs contract call failed:", err, err2);
      }
    }
  }

  return [];
}