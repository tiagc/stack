import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface NavProps {
  onNewStack: (label: string) => void;
}

export function Navigation({ onNewStack }: NavProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newStackName, setNewStackName] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCancelClick = () => {
    setIsCreating(false);
    setNewStackName("");
  };

  const handleCreateClick = () => {
    if (!isCreating) {
      setIsCreating(true);
    } else if (newStackName.trim() !== "") {
      onNewStack(newStackName.trim());
      setNewStackName("");
      setIsCreating(false);
    }
  };

  useEffect(() => {
    if (isCreating && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCreating]);

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
                  className="text-black rounded-full px-3 py-2"
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

        {/* input appears on creationMode */}
        {isCreating && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}>
            <input
              ref={inputRef}
              type="text"
              value={newStackName}
              onChange={(e) => setNewStackName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateClick();
              }}
              placeholder="Name your habit"
              className="w-full text-2xl px-4 py-4 text-black bg-transparent outline-none focus:outline-none focus:ring-0 border-none"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
