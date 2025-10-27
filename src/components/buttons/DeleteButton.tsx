interface ButtonProps {
  title: string;
  handler: () => void;
}

export const DeleteButton = ({ title, handler }: ButtonProps) => {
  return (
    <span
      id="delete-btn"
      title={`Eliminar tarea ${title}`}
      onClick={handler}
      className="p-1.5 border border-zinc-200 dark:border-zinc-800/50 rounded-lg hover:bg-rose-400/80 group transition-colors duration-300 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-trash group-hover:text-zinc-100"
      >
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    </span>
  );
};
