interface ButtonProps {
  handler: () => void;
}

export const CancelButton = ({ handler }: ButtonProps) => {
  return (
    <button
      onClick={handler}
      className="rounded-md px-2 py-1 bg-zinc-800 text-white font-semibold shadow-sm hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600 transition"
    >
      Cancelar
    </button>
  );
};
