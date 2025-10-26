import React, { useEffect, useState } from "react";
import { getMyPOAPs } from "../services/poapContract";

export default function MyBadges() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadBadges() {
    try {
      setLoading(true);
  const arr = await getMyPOAPs();
      setBadges(arr || []);
    } catch (err) {
      console.error(err);
      alert("Could not fetch badges. Check contract or provider.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBadges();
  }, []);

  return (
    <section className="page badges">
      <h2>My Badges</h2>
      {loading && <p>Loading...</p>}
      <div className="badges-grid">
        {badges.length === 0 ? <p>No badges yet. Claim from Events.</p> : null}
        {badges.map((b, i) => (
          <div key={i} className="badge">
            <div className="badge-img">{/* image or SVG */}</div>
            <div className="badge-info">
              <strong>{b}</strong>
              <small>Claimed</small>
            </div>
          </div>
        ))}
      </div>
      <button className="btn" onClick={loadBadges}>Refresh</button>
    </section>
  );
}
