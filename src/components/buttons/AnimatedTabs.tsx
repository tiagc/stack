"use client";

import { useEffect, useRef, useState } from "react";

type Tab = {
  name: string;
};

type AnimatedTabsProps = {
  tabs: Tab[];
  className?: string;
  activeTab?: string;
  onTabChange?: (tabName: string) => void;
};

export function AnimatedTabs({
  tabs,
  className = "",
  activeTab,
  onTabChange,
}: AnimatedTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeButton = container.querySelector(
      `[data-tab="${activeTab}"]`
    ) as HTMLButtonElement | null;

    if (activeButton) {
      const { offsetLeft, offsetWidth } = activeButton;
      setHighlightStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab, tabs]);

  const handleTabClick = (name: string) => {
    onTabChange?.(name);
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center w-fit mx-auto bg-transparent rounded-full ${className}`}>
      {/* animated highlight */}
      <div
        aria-hidden
        className="absolute top-0 left-0 h-10 rounded-full bg-black dark:bg-white transition-all duration-300 ease-in-out z-0"
        style={{
          transform: `translateX(${highlightStyle.left}px)`,
          width: `${highlightStyle.width}px`,
        }}
      />

      {/* tabs */}
      <ul className="relative z-10 flex gap-2 px-1">
        {tabs.map((tab) => (
          <li key={tab.name}>
            <button
              data-tab={tab.name}
              onClick={() => handleTabClick(tab.name)}
              className={`flex items-center gap-2 px-4 h-10 text-sm rounded-full transition-colors duration-300
                ${
                  activeTab === tab.name
                    ? "text-white dark:text-black"
                    : "text-black dark:text-white"
                }`}>
              {tab.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
