import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export async function requestSignature(eventName, walletAddress) {
  // POST to your backend which verifies the student & returns signature for minting
  // Backend expected response: { signature: "0x..." }
  const res = await axios.post(`${API_BASE}/signature`, { eventName, walletAddress });
  return res.data.signature;
}
