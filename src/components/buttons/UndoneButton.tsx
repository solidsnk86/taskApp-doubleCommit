interface ButtonProps {
  title: string;
  handler: () => Promise<void>;
}

export const UndoneButton = ({ title, handler }: ButtonProps) => {
  return (
    <span
      id="undone-btn"
      onClick={handler}
      title={`Deshacer tarea ${title} como hecha.`}
      className="p-1.5 btn-animation border border-zinc-200 dark:border-zinc-800/50 rounded-lg hover:bg-orange-400/80 group transition-colors duration-300 cursor-pointer"
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
        className="lucide lucide-undo group-hover:stroke-white"
      >
        <path d="M3 7v6h6" />
        <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
      </svg>
    </span>
  );
};
