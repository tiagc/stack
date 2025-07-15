"use client";

import { useEffect, useRef } from "react";

type Tab = {
  name: string;
};

type ClipPathProps = {
  tabs: Tab[];
  className?: string;
  activeTab?: string;
  onTabChange?: (tabName: string) => void;
};

export function ClipPath({
  tabs,
  className = "",
  activeTab,
  onTabChange,
}: ClipPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const activeButton = activeTabRef.current;

    if (container && activeButton) {
      const { offsetLeft, offsetWidth } = activeButton;
      const clipLeft = offsetLeft;
      const clipRight = offsetLeft + offsetWidth;
      const containerWidth = container.offsetWidth;

      const leftPercent = ((clipLeft / containerWidth) * 100).toFixed();
      const rightPercent = (100 - (clipRight / containerWidth) * 100).toFixed();

      container.style.clipPath = `inset(0 ${rightPercent}% 0 ${leftPercent}% round 17px)`;
    }
  }, [activeTab]);

  const handleTabClick = (name: string) => {
    onTabChange?.(name);
  };

  return (
    <div
      className={`relative flex flex-col items-center w-fit mx-auto bg-gray-200 rounded-full ${className}`}>
      {/* visible */}
      <ul className="relative flex justify-center gap-2 w-full">
        {tabs.map((tab) => (
          <li key={tab.name}>
            <button
              ref={activeTab === tab.name ? activeTabRef : null}
              onClick={() => handleTabClick(tab.name)}
              className="flex items-center gap-2 px-4 h-9 text-sm text-black rounded-full">
              {tab.name}
            </button>
          </li>
        ))}
      </ul>

      {/* overlay */}
      <div
        aria-hidden
        ref={containerRef}
        className="absolute z-10 w-full overflow-hidden transition-[clip-path,color] duration-300 ease-in-out bg-black"
        style={{
          color: activeTab ? "white" : "black",
        }}>
        <ul className="flex justify-center gap-2 w-full">
          {tabs.map((tab) => (
            <li key={tab.name}>
              <button
                className="flex items-center gap-2 px-4 h-9 text-sm rounded-full pointer-events-none"
                tabIndex={-1}>
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
