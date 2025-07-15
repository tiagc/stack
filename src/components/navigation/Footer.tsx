import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { ThemeToggle } from "../buttons/ThemeToggle";

export function Footer() {
  return (
    <footer className="fixed bottom-0 w-full p-8">
      <div className="flex justify-between items-center">
        <div>
          <motion.button
            className="flex justify-center items-center size-10 bg-black dark:bg-white rounded-full"
            whileTap={{ scale: 0.95 }}>
            <Menu className="size-6 text-white dark:text-black inline-block" />
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
