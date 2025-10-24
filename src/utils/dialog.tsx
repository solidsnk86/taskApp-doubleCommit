import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";

export const showDialog = ({ content }: { content: ReactNode }) => {
  const dialog = document.createElement("dialog");
  document.body.appendChild(dialog);

  const root = createRoot(dialog);
  const controller = new AbortController();

  dialog.style.animation = "slideIn 0.3s ease-in";
  dialog.showModal();

  const closeDialogWithAnimation = () => {
    dialog.style.animation = "slideOut .3s ease-out";

    dialog.addEventListener(
      "animationend",
      () => {
        dialog.close();
        dialog.remove();
        root.unmount();
        controller.abort();
      },
      { once: true, signal: controller.signal }
    );
  };

  root.render(
    <>
      <span
        onClick={closeDialogWithAnimation}
        className="absolute top-2 right-2"
        title="Cerrar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-x-icon lucide-x hover:stroke-red-400"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </span>
      {content}
    </>
  );

  dialog.addEventListener(
    "click",
    (event: MouseEvent) => {
      const firstChildDialog = document.querySelector("dialog")?.firstChild;
      if (dialog.open && !firstChildDialog?.contains(event.target as Node)) {
        closeDialogWithAnimation();
      }
    },
    { signal: controller.signal }
  );
};
