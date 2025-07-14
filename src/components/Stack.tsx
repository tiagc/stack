import { motion } from "framer-motion";
import { X } from "lucide-react";

export function Stack(props: {
  id: number;
  label: string;
  checked: boolean;
  color: string;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.ul className="relative">
      <motion.li
        className={`text-black font-bold text-2xl rounded-full mx-6 mb-0.5 px-3 py-6 flex group ${props.color}`}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.8 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        <label
          htmlFor=""
          className="flex-grow ml-3 cursor-pointer"
          onClick={props.onToggle}>
          <motion.p className={`${props.checked ? "line-through" : ""}`}>
            {props.label}
          </motion.p>
        </label>

        <button
          className="active:scale-75 mr-3 rounded-full stroke-white transition duration-150 ease-in"
          id="cross"
          onClick={props.onDelete}>
          <X className="size-6" />
        </button>
      </motion.li>
    </motion.ul>
  );
}
