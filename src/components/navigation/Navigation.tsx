import { AnimatePresence, motion } from "framer-motion";
import { LucidePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface NavProps {
  onNewStack: (data: {
    label: string;
    goalPerDay: number;
    days: string[];
  }) => void;
  isCreating: boolean;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Navigation({
  onNewStack,
  isCreating,
  setIsCreating,
}: NavProps) {
  const [newStackName, setNewStackName] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [goalPerDay, setGoalPerDay] = useState("1");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

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
    <div className="w-full z-50">
      <div className="p-4">
        <div className="flex justify-between items-center px-4">
          <div className="w-[80px] flex justify-start">
            <AnimatePresence>
              {isCreating && (
                <motion.button
                  key="cancel"
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
            className="my-4 px-4 space-y-6 bg-white"
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
                      className={`text-sm px-4 font-semibold py-2 rounded-full transition hover:bg-gray-200 ${bgColor}`}>
                      {suggestion}
                    </button>
                  );
                })}
              </div>
            </div>

            <hr className="border-gray-300" />

            {/* daily goal */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-gray-400">Daily goal</h3>
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
                className="w-32 px-4 py-3 border rounded-full outline-none text-end text-sm"
              />
            </div>

            <hr className="border-gray-300" />

            {/* days */}
            <div className="space-y-4">
              <h3 className="text-sm text-gray-400">Days</h3>
              <div className="flex flex-wrap justify-between">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <button
                        key={day}
                        onClick={() =>
                          setSelectedDays((prev) =>
                            prev.includes(day)
                              ? prev.filter((d) => d !== day)
                              : [...prev, day]
                          )
                        }
                        className={`w-10 h-10 flex items-center justify-center rounded-full border p-2 text-xs ${
                          isSelected
                            ? "bg-black text-white border-black"
                            : "border-black"
                        }`}>
                        {day}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={handleCreateClick}
                disabled={
                  newStackName.trim() === "" || selectedDays.length === 0
                }
                className={`bg-black text-white rounded-full h-10 px-4 py-8 flex items-center gap-2 ${
                  newStackName.trim() === "" || selectedDays.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-800"
                }`}>
                <span className="text-sm">Add Stack</span>
                <LucidePlus className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
