import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { ThemeToggle } from "../buttons/ThemeToggle";

export function Footer() {
  return (
    <footer className="fixed bottom-0 w-full">
      <div className="flex justify-between items-center p-4">
        <div>
          <motion.button
            className="flex justify-center items-center size-10 bg-black rounded-full"
            whileTap={{ scale: 0.95 }}>
            <Menu className="size-6 text-white inline-block" />
          </motion.button>
        </div>

        <div></div>

        <div>
          <motion.button whileTap={{ scale: 0.95 }}>
            <ThemeToggle />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
