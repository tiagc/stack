import { motion } from "framer-motion";
import { useState } from "react";
import { CreationMode } from "./components/navigation/CreationMode";
import { Footer } from "./components/navigation/Footer";
import { Stack } from "./components/Stack";
import "./styles.css";

interface StackItem {
  id: number;
  label: string;
  color: string;
  days: string[];
  goalPerDay: number;
  currentProgress: number;
}

const stackColors = [
  "bg-stackYellow",
  "bg-stackGreen",
  "bg-stackOrange",
  "bg-stackLightGray",
  "bg-stackBlue",
  "bg-stackPink",
  "bg-stackRed",
  "bg-stackBabyBlue",
  "bg-stackMint",
  "bg-stackGray",
];

function App() {
  const [stacks, setStacks] = useState<StackItem[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const getRandomColor = () =>
    stackColors[Math.floor(Math.random() * stackColors.length)];

  const addNewStack = (data: {
    label: string;
    goalPerDay: number;
    days: string[];
  }) => {
    const newStack: StackItem = {
      id: Date.now(),
      label: data.label,
      goalPerDay: data.goalPerDay,
      days: data.days,
      color: getRandomColor(),
      currentProgress: 0,
    };
    setStacks((prev) => [...prev, newStack]);
  };

  const deleteStack = (id: number) => {
    setStacks((prev) => prev.filter((stack) => stack.id !== id));
  };

  return (
    <div className="relative min-h-screen">
      <CreationMode
        onNewStack={addNewStack}
        isCreating={isCreating}
        setIsCreating={setIsCreating}
      />

      <motion.div layout transition={{ duration: 0.2, ease: "easeInOut" }}>
        {stacks.length > 0 && (
          <h2 className="sticky top-0 z-10 pt-2 px-4 text-sm text-gray-400 dark:text-gray-300">
            Habits and routines
          </h2>
        )}

        <div className="mt-4">
          {stacks.map((stack) => (
            <Stack
              key={stack.id}
              {...stack}
              isExpanded={expandedId === stack.id}
              onToggle={() =>
                setExpandedId((prev) => (prev === stack.id ? null : stack.id))
              }
              onDelete={() => deleteStack(stack.id)}
            />
          ))}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}

export default App;
