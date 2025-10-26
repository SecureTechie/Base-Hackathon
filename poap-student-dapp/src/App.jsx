import React from "react";
import { Link, useLocation } from "react-router-dom";
import ConnectWallet from "./components/connectwallet";

export default function App({ children }) {
  const loc = useLocation();

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <h1>Poap Student</h1>
          <small>by Amanda</small>
        </div>

        <nav className="nav">
          <Link className={loc.pathname === "/" ? "active" : ""} to="/">Home</Link>
          <Link className={loc.pathname === "/events" ? "active" : ""} to="/events">Events</Link>
          <Link className={loc.pathname === "/badges" ? "active" : ""} to="/badges">My Badges</Link>
        </nav>

        <ConnectWallet />
      </header>

      <main className="main">
        {children}
      </main>

      <footer className="footer">
        <p>Good luck at the competition — make it shine ✨</p>
      </footer>
    </div>
  );
}
