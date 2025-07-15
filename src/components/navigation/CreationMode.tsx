import { AnimatePresence, motion } from "framer-motion";
import { LucidePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CreateProps {
  onNewStack: (data: {
    label: string;
    goalPerDay: number;
    days: string[];
  }) => void;
  isCreating: boolean;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreationMode({
  onNewStack,
  isCreating,
  setIsCreating,
}: CreateProps) {
  const [newStackName, setNewStackName] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [goalPerDay, setGoalPerDay] = useState("1");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  let suggestions = [
    { label: "Meditate", bgColor: "bg-stackGreen" },
    { label: "Run", bgColor: "bg-stackBlue" },
    { label: "Read a book", bgColor: "bg-yellow-200" },
  ];

  const handleCancelClick = () => {
    setIsCreating(false);
    setNewStackName("");
    setGoalPerDay("1");
    setSelectedDays([]);
  };

  const handleCreateClick = () => {
    if (!isCreating) {
      setIsCreating(true);
    } else if (newStackName.trim() !== "") {
      onNewStack({
        label: newStackName.trim(),
        goalPerDay: parseInt(goalPerDay) || 0,
        days: selectedDays,
      });
      setNewStackName("");
      setGoalPerDay("1");
      setSelectedDays([]);
      setIsCreating(false);
    }
  };

  useEffect(() => {
    if (isCreating && inputRef.current) {
      // inputRef.current.focus();
    }
  }, [isCreating]);

  return (
    <div className="bg-white dark:bg-black w-full z-50">
      <div className="p-4">
        <div className="flex justify-between items-center px-4">
          <div className="w-[80px] flex justify-start">
            <AnimatePresence>
              {isCreating && (
                <motion.button
                  key="cancel"
                  className="text-black dark:text-white"
                  onClick={handleCancelClick}
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
              className={`bg-black text-white dark:bg-white dark:text-black rounded-full px-3 py-2 ${
                isCreating
                  ? "opacity-60 transition duration-300"
                  : "transition duration-300"
              }`}
              whileTap={{ scale: 0.95 }}>
              Create
            </motion.button>
          </div>
        </div>

        {isCreating && (
          <motion.div
            className="my-4 px-4 space-y-6"
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
              className="w-full text-2xl text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300 bg-transparent outline-none border-none antialiased"
            />

            <hr className="border-gray-300" />

            {/* suggested */}
            <div className="space-y-4">
              <h3 className="text-sm text-gray-400 dark:text-gray-300">
                Suggested
              </h3>
              <div className="flex gap-2 flex-wrap">
                {suggestions.map(({ label, bgColor }) => {
                  const isSelected = newStackName === label;

                  return (
                    <motion.button
                      key={label}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setNewStackName(label)}
                      aria-pressed={isSelected}
                      className={`text-sm px-4 font-semibold py-2 rounded-full transition-colors duration-300
                      ${
                        isSelected
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : `${bgColor} text-black`
                      }`}>
                      {label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <hr className="border-gray-300" />

            {/* daily goal */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-gray-400 dark:text-gray-300">
                Daily goal
              </h3>
              <input
                type="number"
                min={0}
                max={100}
                value={goalPerDay}
                onChange={(e) => setGoalPerDay(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreateClick();
                }}
                placeholder=""
                className="w-32 px-4 py-2 border rounded-full outline-none text-end text-sm"
              />
            </div>

            <hr className="border-gray-300" />

            {/* days */}
            <div className="space-y-4">
              <h3 className="text-sm text-gray-400 dark:text-gray-300">Days</h3>
              <div className="flex flex-wrap justify-between">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <motion.button
                        key={day}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setSelectedDays((prev) =>
                            prev.includes(day)
                              ? prev.filter((d) => d !== day)
                              : [...prev, day]
                          )
                        }
                        className={`size-10 flex items-center justify-center rounded-full border border-black dark:border-white p-2 text-xs ${
                          isSelected
                            ? "bg-black text-white dark:bg-white dark:text-black"
                            : "dark:text-white"
                        }`}>
                        {day}
                      </motion.button>
                    );
                  }
                )}
              </div>
            </div>

            <hr className="border-gray-300" />

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={handleCreateClick}
                disabled={
                  newStackName.trim() === "" || selectedDays.length === 0
                }
                className={`bg-black text-white dark:bg-white dark:text-black rounded-full h-10 px-3 py-2 flex items-center gap-2 ${
                  newStackName.trim() === "" || selectedDays.length === 0
                    ? "opacity-50"
                    : ""
                }`}>
                <span>Stack</span>
                <LucidePlus className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
