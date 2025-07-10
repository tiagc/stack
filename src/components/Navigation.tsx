import { Plus } from "lucide-react";
import { motion } from "motion/dist/react";
import Tabs from "./NavigationTabs";

interface NavProps {
  setActiveTab: (tab: string) => void;
  addNewTab: (newTabName: string) => void;
  tabs: string[];
}

export function Navigation({ setActiveTab, addNewTab, tabs }: NavProps) {
  const handleAddClick = () => {
    const newTabName = prompt("Enter the name of the new tab:");
    if (newTabName) {
      addNewTab(newTabName);
    }
  };

  return (
    <div className="fixed top-0 z-10">
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          {tabs.map((listName) => (
            <Tabs
              key={listName} // Use listName as the key
              onClick={() => setActiveTab(listName)} // Set the active list when clicked
            >
              {listName} {/* Pass the listName as children to display */}
            </Tabs>
          ))}

          <motion.button
            onClick={handleAddClick}
            className="justify-center bg-black border-white border rounded-full p-1.5"
            id="plus-tab"
            whileTap={{ scale: 0.95 }}>
            <Plus className="size-6 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
