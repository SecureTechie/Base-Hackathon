import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./pages/Home";
import Events from "./pages/Events";
import MyBadges from "./pages/MyBadges";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/badges" element={<MyBadges />} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);
