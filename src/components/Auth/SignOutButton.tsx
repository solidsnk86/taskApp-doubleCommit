import type { CSSProperties } from "react";

interface SignOutButtonProps {
  signout: () => Promise<void>;
  isLoading: boolean;
  styles?: CSSProperties;
  mediaQuerys?: string;
}

export const SignOutButton = ({
  signout,
  isLoading,
  styles,
  mediaQuerys,
}: SignOutButtonProps) => {
  return (
    <button
      onClick={signout}
      style={styles}
      className={`md:flex items-center justify-center gap-2 w-44 px-4 py-2 text-sm shadow-md rounded-md border border-zinc-200 dark:border-zinc-800
         text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition ${mediaQuerys} btn-animation`}
    >
      {isLoading ? (
        <span className="animate-spin duration-1000">
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
            className="lucide lucide-loader-icon lucide-loader"
          >
            <path d="M12 2v4" />
            <path d="m16.2 7.8 2.9-2.9" />
            <path d="M18 12h4" />
            <path d="m16.2 16.2 2.9 2.9" />
            <path d="M12 18v4" />
            <path d="m4.9 19.1 2.9-2.9" />
            <path d="M2 12h4" />
            <path d="m4.9 4.9 2.9 2.9" />
          </svg>
        </span>
      ) : (
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
          className="svg-animation"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      )}
      {isLoading ? "Cerrando sesión" : "Cerrar sesión"}
    </button>
  );
};
