"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ClipPath } from "./ClipPath";
import { SystemIcon } from "./SystemIcon";

const tabs = [{ name: "System" }, { name: "Light" }, { name: "Dark" }];

export function ThemeToggle() {
  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(tabs[0].name);
  const toggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toggleRef.current && !toggleRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case "System":
        return <SystemIcon className="size-5" />;
      case "Light":
        return <Sun className="size-5" />;
      case "Dark":
        return <Moon className="size-5" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={toggleRef}
      className="relative flex items-center justify-center rounded-full"
      initial={false}
      animate={{
        width: open ? 220 : 40,
        backgroundColor: open ? "transparent" : "#000",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ overflow: "hidden" }}>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-full text-white size-10 flex items-center justify-center"
          aria-label="Toggle theme selector"
          type="button">
          {getIcon(activeTheme)}
        </button>
      )}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="tabs"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0 }}
            className="flex items-center">
            <ClipPath
              tabs={tabs}
              className="bg-white"
              activeTab={open ? activeTheme : ""}
              onTabChange={(tab) => {
                setActiveTheme(tab);
                console.log("Changed to", tab);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
