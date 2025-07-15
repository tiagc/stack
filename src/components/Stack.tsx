import { motion } from "framer-motion";
import { X } from "lucide-react";

export function Stack(props: {
  id: number;
  label: string;
  color: string;
  days: string[];
  goalPerDay: number;
  currentProgress: number;
  onIncrement: () => void;
  onDelete: () => void;
}) {
  const progressPercent = Math.min(
    (props.currentProgress / props.goalPerDay) * 100,
    100
  );

  return (
    <motion.ul className="relative">
      <motion.li
        onClick={props.onIncrement}
        className="text-black dark:text-white font-bold text-2xl rounded-full mx-6 mb-4 px-3 py-6 flex items-center justify-between overflow-hidden relative cursor-pointer border border-black dark:border-white"
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -40, scale: 0.85 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1.05,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
            bounce: 0.4,
          },
        }}
        exit={{
          opacity: 0,
          y: -40,
          scale: 0.8,
          transition: { duration: 0.3, ease: "easeInOut" },
        }}>
        <motion.div
          className={`absolute top-0 left-0 h-full ${props.color} rounded-full z-0`}
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <div className="relative z-10 flex items-center justify-between w-full">
          <span className="ml-3">{props.label}</span>
          <div className="flex items-center gap-4 pr-2">
            <span className="text-sm text-gray-400 font-normal">
              {props.goalPerDay}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                props.onDelete();
              }}
              className="rounded-full transition duration-150 ease-in hover:bg-gray-200 p-1"
              aria-label={`Delete habit ${props.label}`}>
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.li>
    </motion.ul>
  );
}
