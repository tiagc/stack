import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Tabs from "./Tabs";

interface NavProps {
  setActiveTab: (tab: string) => void;
  addNewTab: (newTabName: string) => void;
  tabs: string[];
}

export function Navigation({ setActiveTab, addNewTab, tabs }: NavProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newTabName, setNewTabName] = useState("");

  const handleCancelClick = () => {
    setIsCreating(false);
    setNewTabName("");
  };

  const handleCreateClick = () => {
    if (!isCreating) {
      // first click just enters creation mode
      setIsCreating(true);
    } else if (newTabName.trim() !== "") {
      // if already creating and input is valid
      addNewTab(newTabName.trim());
      setNewTabName("");
      setIsCreating(false);
    }
  };

  return (
    <div className="fixed top-0 z-10 w-full">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="w-[80px] flex justify-start">
            <AnimatePresence>
              {isCreating && (
                <motion.button
                  key="cancel"
                  onClick={handleCancelClick}
                  className="text-black dark:text-white rounded-full px-3 py-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}>
                  Cancel
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="w-[80px] flex justify-end">
            <motion.button
              onClick={handleCreateClick}
              className={`bg-black text-white rounded-full px-3 py-2 ${
                isCreating
                  ? "opacity-60 transition duration-300"
                  : "transition duration-300"
              }`}
              whileTap={{ scale: 0.95 }}>
              Create
            </motion.button>
          </div>
        </div>

        {/* tabs only show when not creating */}
        {!isCreating && (
          <div className="mt-4 flex flex-wrap gap-3">
            {tabs.map((listName) => (
              <Tabs key={listName} onClick={() => setActiveTab(listName)}>
                {listName}
              </Tabs>
            ))}
          </div>
        )}

        {/* input appears on creationMode */}
        {isCreating && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}>
            <input
              type="text"
              value={newTabName}
              onChange={(e) => setNewTabName(e.target.value)}
              placeholder="Name your habit"
              className="w-full rounded-full border border-gray-300 px-4 py-2 text-black dark:text-white dark:bg-gray-800"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
