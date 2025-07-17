import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export function Stack(props: {
  id: number;
  label: string;
  color: string;
  days: string[];
  goalPerDay: number;
  currentProgress: number;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <ul className="relative">
      <li
        onClick={props.onToggle}
        className={`text-black dark:text-white rounded-3xl mx-4 px-4 mb-4 py-6 border border-black dark:border-white relative overflow-hidden cursor-pointer ${
          props.isExpanded ? "pb-auto" : ""
        }`}>
        {/* stack header */}
        <div className="flex items-center justify-between w-full">
          <span className="font-bold text-2xl">{props.label}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              props.onDelete();
            }}
            className="rounded-lg hover:bg-gray-100 dark:hover:bg-[#1F1F1F] p-0.5 transition-colors duration-200"
            aria-label={`Delete ${props.label}`}>
            <X className="size-6" />
          </button>
        </div>

        {/* expanded */}
        <AnimatePresence>
          {props.isExpanded && (
            <motion.div
              className="mt-4 text-sm text-black dark:text-white"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Progress</span>
                <span className="text-sm">
                  {props.currentProgress} / {props.goalPerDay}
                </span>
              </div>

              <div className="text-xs">
                <span className="text-gray-400">Days: </span>
                {props.days.length > 0 ? props.days.join(", ") : "None"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </li>
    </ul>
  );
}
