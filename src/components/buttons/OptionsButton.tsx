type Id = number | null;

interface ButtonProps {
  show: number | null;
  id: Id;
  handler: () => void;
  setter: (id: Id) => void;
}

export const OptionsButton = ({ show, id, handler, setter }: ButtonProps) => {
  return (
    <span
      onClick={handler}
      className="p-1.5 flex btn-animation border border-zinc-200 dark:border-zinc-800/50 rounded-lg hover:bg-indigo-400/80 group transition-colors duration-300 cursor-pointer"
    >
      {show !== id ? (
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
          className="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"
        >
          <circle cx={12} cy={12} r={1} />
          <circle cx={12} cy={5} r={1} />
          <circle cx={12} cy={19} r={1} />
        </svg>
      ) : (
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
          className="lucide lucide-arrow-right-from-line-icon lucide-arrow-right-from-line z-50"
          onClick={(e) => {
            e.stopPropagation();
            setter(null);
          }}
        >
          <path d="M3 5v14" />
          <path d="M21 12H7" />
          <path d="m15 18 6-6-6-6" />
        </svg>
      )}
    </span>
  );
};
