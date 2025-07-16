"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { ClipPath } from "./ClipPath";
import { SunIcon } from "./SunIcon";
import { SystemIcon } from "./SystemIcon";

type Theme = "system" | "light" | "dark";

const tabs: { name: Theme; label: string }[] = [
  { name: "system", label: "System" },
  { name: "light", label: "Light" },
  { name: "dark", label: "Dark" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);

  const activeTheme = tabs.find((t) => t.name === theme) ? theme : "system";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toggleRef.current && !toggleRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (name: Theme) => {
    switch (name) {
      case "system":
        return <SystemIcon className="size-5" />;
      case "light":
        return <SunIcon className="size-5" />;
      case "dark":
        return <Moon className="size-5" />;
    }
  };

  return (
    <motion.div
      ref={toggleRef}
      className="relative flex items-center justify-center rounded-full"
      initial={false}
      animate={{
        width: open ? 220 : 40,
        backgroundColor: "transparent",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ overflow: "hidden" }}>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-full bg-black dark:bg-white text-white dark:text-black size-10 flex items-center justify-center"
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
              tabs={tabs.map(({ name, label }) => ({ name: label }))}
              className="bg-transparent"
              activeTab={tabs.find((t) => t.name === activeTheme)?.label ?? ""}
              onTabChange={(label) => {
                const tab = tabs.find((t) => t.label === label);
                if (tab) setTheme(tab.name);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
