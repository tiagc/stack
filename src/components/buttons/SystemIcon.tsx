export function SystemIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" {...props}>
      <circle
        cx="11"
        cy="11"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18,11c0,3.86-3.14,7-7,7-.55,0-1-.45-1-1V5c0-.55.45-1,1-1,3.86,0,7,3.14,7,7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SystemIcon;
