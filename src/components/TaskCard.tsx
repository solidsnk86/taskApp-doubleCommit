import { useState } from "react";
import { formatDateAndTime } from "../utils/formatDate";
import { showDialog } from "../utils/dialog";
import { Loader } from "./Layout/Loader";
import { useTasks } from "../contexts/useProviderTask";
import type { PartialTasksProps } from "../definitions";

export const TaskCard = ({ tasks }: PartialTasksProps) => {
  const { deleteTask, markDone, markUndone, refreshTasks } = useTasks();
  const [isLoading, setIsLoading] = useState(false);

  const handleMarkDone = async (id: number | string, title?: string) => {
    try {
      setIsLoading(true);
      await markDone(id);
      await refreshTasks();
      showDialog({ content: <div>✅ Tarea "{title}" marcada como completa.</div> });
    } catch (err) {
      showDialog({ content: <div>Error: {(err as Error).message}</div> });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkUndone = async (id: number | string, title?: string) => {
    try {
      setIsLoading(true);
      await markUndone(id);
      await refreshTasks();
      showDialog({ content: <div>🔁 Tarea "{title}" marcada como pendiente.</div> });
    } catch (err) {
      showDialog({ content: <div>Error: {(err as Error).message}</div> });
    } finally {
      setIsLoading(false);
    }
  };

const handleDelete = (id?: number, title?: string) => {
  if (!id) return;

  showDialog({
    content: (
      <article className="flex justify-center mx-auto">
        <div className="text-center max-w-sm">
          <h3 className="text-lg font-semibold text-rose-600">
            ¿Eliminar tarea?
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
            Esta acción{" "}
            <span className="font-semibold">no se puede deshacer</span>.
            Se eliminará la tarea{" "}
            <i className="font-medium text-zinc-800 dark:text-zinc-100">
              “{title}”
            </i>
            .
          </p>

          <aside className="flex gap-3 items-center justify-center mt-5">
            <button
              onClick={async () => {
                try {
                  setIsLoading(true);
                  await deleteTask(id);
                  await refreshTasks();
                  showDialog({
                    content: (
                      <div className="text-center text-green-600 dark:text-green-400">
                        🗑️ Tarea <strong>“{title}”</strong> eliminada con éxito.
                      </div>
                    ),
                  });
                } catch (err) {
                  showDialog({
                    content: (
                      <div className="text-rose-600 dark:text-rose-400">
                        Error al eliminar: {(err as Error).message}
                      </div>
                    ),
                  });
                } finally {
                  setIsLoading(false);
                  document.querySelector("dialog")?.remove();
                }
              }}
              disabled={isLoading}
              className="px-3 py-1.5 border border-rose-500 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white rounded-md transition"
            >
              {isLoading ? "Eliminando..." : "Sí, eliminar"}
            </button>

            <button
              onClick={() => document.querySelector("dialog")?.remove()}
              className="px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition"
            >
              Cancelar
            </button>
          </aside>
        </div>
      </article>
    ),
  });
};


  if (isLoading) return <Loader />;

  return (
    <div>
      <ul className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-4 gap-3">
        {tasks?.map((task) => {
          const isDone = task.task_done;

          return (
            <div
              id={`task-${task.task_id}`}
              key={task.task_id}
              className={`flex flex-col border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-5 rounded-xl relative text-zinc-800 dark:text-zinc-100 transition-all duration-300 ${
                isDone ? "opacity-60" : ""
              }`}
            >
              <h3
                className={`text-xl font-bold transition-all duration-300 w-64 ${
                  isDone ? "line-through text-zinc-400" : ""
                }`}
              >
                {task.title}
              </h3>

              <time className="text-sm text-zinc-400">
                {formatDateAndTime(task.created_at as string)}
              </time>

              <p
                className={`mt-3 transition-all duration-300 ${
                  isDone ? "line-through text-zinc-400" : ""
                }`}
              >
                {task.description}
              </p>

              <div className="absolute top-2 right-2 p-2 flex gap-3">
                {/* 🗑 Eliminar tarea */}
                <span
                  title={`Eliminar tarea ${task.title}`}
                  onClick={() => handleDelete(task.task_id, task.title)}
                  className="p-1.5 border border-zinc-200 dark:border-zinc-800/50 rounded-lg hover:bg-rose-400 group transition-colors duration-300 cursor-pointer"
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

                {/* 🔁 Marcar como hecha o deshecha */}
                {isDone ? (
                  <span
                    onClick={() => handleMarkUndone(task.task_id!, task.title)}
                    title={`Deshacer tarea ${task.title}`}
                    className="p-1.5 border border-zinc-200 dark:border-zinc-800/50 rounded-lg hover:bg-orange-300 group transition-colors duration-300 cursor-pointer"
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
                      className="lucide lucide-undo group-hover:stroke-white"
                    >
                      <path d="M3 7v6h6" />
                      <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                    </svg>
                  </span>
                ) : (
                  <span
                    onClick={() => handleMarkDone(task.task_id!, task.title)}
                    title={`Marcar tarea ${task.title} como hecha`}
                    className="p-1.5 border border-zinc-200 dark:border-zinc-800/50 rounded-lg hover:bg-lime-400 group transition-colors duration-300 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check group-hover:stroke-white"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
