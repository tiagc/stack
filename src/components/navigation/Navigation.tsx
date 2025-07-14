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
    <div className="fixed top-0 z-10 w-full bg-white">
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

        {/* creation mode UI */}
        {isCreating && (
          <motion.div
            className="mt-4 mb-4 px-4 space-y-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}>
            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={newStackName}
              onChange={(e) => setNewStackName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateClick();
              }}
              placeholder="Name your habit"
              className="w-full text-2xl text-black bg-transparent outline-none border-none"
            />

            <hr className="border-gray-300" />

            {/* suggested */}
            <div className="space-y-4">
              <h3 className="text-sm text-gray-400">Suggested</h3>
              <div className="flex gap-2 flex-wrap">
                {["Meditate", "Run", "Read a book"].map((suggestion, index) => {
                  const bgColors = [
                    "bg-stackGreen",
                    "bg-stackBlue",
                    "bg-yellow-200",
                  ];
                  const bgColor = bgColors[index % bgColors.length];

                  return (
                    <button
                      key={suggestion}
                      onClick={() => setNewStackName(suggestion)}
                      className={`text-sm px-4 py-2 rounded-full transition hover:bg-gray-200 ${bgColor}`}>
                      {suggestion}
                    </button>
                  );
                })}
              </div>
            </div>

            <hr className="border-gray-300" />

            {/* daily goal */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-gray-400">Daily goal per day</h3>
              <input
                type="number"
                min={1}
                placeholder=""
                className="w-32 px-4 py-2 border rounded-full outline-none"
              />
            </div>

            <hr className="border-gray-300" />

            {/* days */}
            <div className="space-y-4">
              <h3 className="text-sm text-gray-400">Days</h3>
              <div className="flex flex-wrap gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <button
                      key={day}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-black p-2 text-xs">
                      {day}
                    </button>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
