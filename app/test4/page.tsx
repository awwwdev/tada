"use client";

import React, { useState } from "react";
import { Reorder } from "framer-motion";
import { set } from "zod";

export default function Page() {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  return (
    <div>
      <h1>Reorder List</h1>
      <ul>
      <Reorder.Group values={cards} onReorder={(reorderedItems) => {
        setCards(reorderedItems);
      }}>
          {cards.map((card) => {
            return (
              <Reorder.Item value={card} key={card.id}>
                <li>{card.title}</li>
              </Reorder.Item>
            );
          })}
      </Reorder.Group>
        </ul>
    </div>
  );
}

const DEFAULT_CARDS = [
  // BACKLOG
  { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
  { title: "SOX compliance checklist", id: "2", column: "backlog" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
  { title: "Document Notifications service", id: "4", column: "backlog" },
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem for outage", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

  // DOING
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "doing",
  },
  { title: "Add logging to daily CRON", id: "9", column: "doing" },
  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
  },
];
