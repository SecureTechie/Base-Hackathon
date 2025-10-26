import React from "react";
import EventCard from "../components/eventcard";

const MOCK_EVENTS = [
  { id: "e1", name: "Intro to Blockchain", description: "Workshop: Blockchain basics" },
  { id: "e2", name: "Smart Contracts 101", description: "Hands-on smart contract session" },
  { id: "e3", name: "Poap Hackathon", description: "Competition — build & claim" }
];

export default function Events() {
  return (
    <section className="page events">
      <h2>Events</h2>
      <div className="events-list">
        {MOCK_EVENTS.map(ev => <EventCard key={ev.id} event={ev} />)}
      </div>
    </section>
  );
}
