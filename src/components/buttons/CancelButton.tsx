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
      className={`${className} flex gap-1 items-center rounded-md bg-zinc-800 text-white text-sm border 
      border-zinc-700 dark:border-zinc-500 font-semibold shadow-sm hover:bg-zinc-900 
        dark:bg-zinc-700 dark:hover:bg-zinc-600 transition`}
    >
      Cancelar
    </button>
  );
};
