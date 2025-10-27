interface ButtonProps {
  title: string;
  handler: () => void;
}

export const EditButton = ({ title, handler }: ButtonProps) => {
  return (
    <span
      id="edit-btn"
      title={`Editar tarea ${title}`}
      onClick={handler}
      className="p-1.5 border border-zinc-200 dark:border-zinc-800/50 rounded-lg hover:bg-blue-500/80 group transition-colors duration-300 cursor-pointer"
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
        className="lucide lucide-pencil-icon lucide-pencil group-hover:text-zinc-100"
      >
        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
        <path d="m15 5 4 4" />
      </svg>
    </span>
  );
};
