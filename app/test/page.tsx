"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAutoAnimate } from "@formkit/auto-animate/react";
type Item = {
  id: number;
  name: string;
};
const initialItems: Item[] = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
  { id: 4, name: "Item 4" },
  { id: 5, name: "Item 5" },
];

export default function Page() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [parent, enableAnimations] = useAutoAnimate(
    /* optional config */ {
      duration: 500,
    }
  );
  const dragItem = useRef<number>(0);
  const draggedOverItem = useRef<number>(0);

  function handleSort() {
    const itemsClone = [...items];
    const temp = itemsClone[dragItem.current];
    itemsClone[dragItem.current] = itemsClone[draggedOverItem.current];
    itemsClone[draggedOverItem.current] = temp;
    setItems(itemsClone);
  }
  const add = () => {
    setItems([...items, items[items.length - 1]]);
  };
  const shuffle = () => {
    setItems([...items].sort((a, b) => (0.5 > Math.random() ? 1 : -1)));
  };
  return (
    <div className="mx-auto max-w-page">
      <h1>Test page</h1>
      <motion.ul className="grid gap-4" layoutRoot>
        {items.map((item, index) => {
          return (
            <motion.div
              layout
              layoutId={index}
              key={index}
              className="p-4 rd-2 bg-base3 ???"
              draggable
              onDragStart={() => (dragItem.current = index)}
              onDragEnter={() => (draggedOverItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
            >
              {item.name}
            </motion.div>
          );
        })}
      </motion.ul>
      <button onClick={add}>Add number</button>
      <br />
      <button onClick={shuffle}>shuffle</button>
    </div>
  );
}
