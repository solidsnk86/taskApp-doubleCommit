interface ButtonProps {
    title: string;
    handler: () => Promise<void>
}

export const DoneButton = ({ title, handler }: ButtonProps) => {
  return (
    <span
      id="done-btn"
      onClick={handler}
      title={`Marcar tarea ${title} como hecha`}
      className="p-1.5 btn-animation border border-zinc-200 dark:border-zinc-800/50 rounded-lg hover:bg-lime-400/80 group transition-colors duration-300 cursor-pointer"
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
        className="lucide lucide-check group-hover:stroke-white svg-animation"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
};
