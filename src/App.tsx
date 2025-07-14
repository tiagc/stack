import { useState } from "react";
import { Navigation } from "./components/navigation/Navigation";
import { Stack } from "./components/Stack";
import "./styles.css";

interface StackItem {
  id: number;
  label: string;
  checked: boolean;
  color: string;
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

  const getRandomColor = () =>
    stackColors[Math.floor(Math.random() * stackColors.length)];

  const addNewStack = (label: string) => {
    const newStack: StackItem = {
      id: Date.now(),
      label,
      checked: false,
      color: getRandomColor(),
    };
    setStacks((prev) => [...prev, newStack]);
  };

  const toggleStack = (id: number) => {
    setStacks((prev) =>
      prev.map((stack) =>
        stack.id === id ? { ...stack, checked: !stack.checked } : stack
      )
    );
  };

  const deleteStack = (id: number) => {
    setStacks((prev) => prev.filter((stack) => stack.id !== id));
  };

  return (
    <div className="relative min-h-screen">
      <Navigation onNewStack={addNewStack} />
      {stacks.length > 0 && (
        <h2 className="px-8 mt-36 mb-2 text-sm text-gray-500">
          Habits and routines
        </h2>
      )}

      <div className="mt-4">
        {stacks.map((stack) => (
          <Stack
            key={stack.id}
            {...stack}
            onToggle={() => toggleStack(stack.id)}
            onDelete={() => deleteStack(stack.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
