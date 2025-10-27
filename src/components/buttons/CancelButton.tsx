import type { CSSProperties } from "react";

interface ButtonProps {
  className?: string;
  style?: CSSProperties;
  handler: () => void;
}

export const CancelButton = ({ handler, style, className }: ButtonProps) => {
  return (
    <button
    style={style}
      onClick={handler}
      className={`${className} flex gap-1 items-center rounded-md bg-zinc-800 text-white text-sm font-semibold shadow-sm hover:bg-zinc-900 
        dark:bg-zinc-700 dark:hover:bg-zinc-600 transition`}
    >
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-save-icon lucide-save svg-animation"
      >
        <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
        <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
        <path d="M7 3v4a1 1 0 0 0 1 1h7" />
      </svg>
      Cancelar
    </button>
  );
};
