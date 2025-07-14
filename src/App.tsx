import { motion } from "framer-motion";
import { useState } from "react";
import { Navigation } from "./components/navigation/Navigation";
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
  const [isCreating, setIsCreating] = useState(false);

  const incrementProgress = (id: number) => {
    setStacks((prev) =>
      prev.map((stack) =>
        stack.id === id && stack.currentProgress < stack.goalPerDay
          ? { ...stack, currentProgress: stack.currentProgress + 1 }
          : stack
      )
    );
  };

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
    <motion.div
      animate={{ marginTop: isCreating ? 457 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="relative min-h-screen">
      <Navigation
        onNewStack={addNewStack}
        isCreating={isCreating}
        setIsCreating={setIsCreating}
      />

      {stacks.length > 0 && (
        <h2 className="px-8 mt-8 mb-2 text-sm text-gray-400">
          Habits and routines
        </h2>
      )}

      <div className="mt-4">
        {stacks.map((stack) => (
          <Stack
            key={stack.id}
            {...stack}
            onDelete={() => deleteStack(stack.id)}
            onIncrement={() => incrementProgress(stack.id)}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default App;
