interface ButtonsProps {
  handler: () => Promise<void>;
}

export const SaveButton = ({ handler }: ButtonsProps) => {
  return (
    <button
      className="px-2 py-1 btn-animation font-semibold bg-blue-600 border border-blue-500 shadow-sm hover:bg-blue-700 text-white text-sm rounded-md hover:brightness-110 flex gap-1 items-center"
      onClick={handler}
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
      Guardar
    </button>
  );
};
