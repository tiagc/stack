import { motion } from "framer-motion";
import Tabs from "./Tabs";

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

  const handleCancelClick = () => {
    console.log("Cancel clicked");
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
            onClick={handleCancelClick}
            id="cancel"
            className="justify-center text-black rounded-full px-3 py-2"
            whileTap={{ scale: 0.95 }}>
            Cancel
          </motion.button>

          <motion.button
            onClick={handleAddClick}
            id="create"
            className="justify-center bg-black text-white rounded-full px-3 py-2"
            whileTap={{ scale: 0.95 }}>
            Create
          </motion.button>
        </div>
      </div>
    </div>
  );
}
