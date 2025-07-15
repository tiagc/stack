import React from "react";

export function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 850 850"
      fill="none"
      stroke="currentColor"
      strokeWidth={22}
      strokeMiterlimit={10}
      {...props}>
      <line x1="425" y1="850" x2="425" y2="0" />
      <line x1="637.5" y1="793.06" x2="212.5" y2="56.94" />
      <line x1="793.06" y1="637.5" x2="56.94" y2="212.5" />
      <line x1="850" y1="425" x2="0" y2="425" />
      <line x1="793.06" y1="212.5" x2="56.94" y2="637.5" />
      <line x1="637.5" y1="56.94" x2="212.5" y2="793.06" />
    </svg>
  );
}

export default SunIcon;
