import { useState } from "react";
import { formatDateAndTime } from "../utils/formatDate";
import { showDialog } from "../utils/dialog";
import { Loader } from "./Layout/Loader";
import { useTasks } from "../contexts/useProviderTask";
import type { PartialTasksProps } from "../definitions";

export const TaskCard = ({ tasks }: PartialTasksProps) => {
  const {
    updateTask,
    deleteTask,
    markDone,
    markUndone,
    refreshTasks,
    isLoading,
  } = useTasks();
  const [editMode, setEditMode] = useState<number | null>(null);
  const [showOtions, setShowOptions] = useState<boolean>(false);

  const handleMarkDone = async (id: number | string, title?: string) => {
    try {
      await markDone(id);
      await refreshTasks();
      showDialog({
        content: <div>✅ Tarea "{title}" marcada como completa.</div>,
      });
    } catch (err) {
      showDialog({ content: <div>Error: {(err as Error).message}</div> });
    }
  };

  const handleMarkUndone = async (id: number | string, title?: string) => {
    try {
      await markUndone(id);
      await refreshTasks();
      showDialog({
        content: <div>🔁 Tarea "{title}" marcada como pendiente.</div>,
      });
    } catch (err) {
      showDialog({ content: <div>Error: {(err as Error).message}</div> });
    }
  };

  const handleEdit = (id: number) => {
    setEditMode(id);
  };

  const handleUpdate = async (id: number) => {
    const selectedTask = document.getElementById(`task-${id}`);
    const title = selectedTask?.querySelector("h3")?.innerText;
    const description = selectedTask?.querySelector("p")?.innerText;

    await updateTask(id, title as string, description as string);
    await refreshTasks();
    setEditMode(null);
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
              <span className="font-semibold">no se puede deshacer</span>. Se
              eliminará la tarea{" "}
              <i className="font-medium text-zinc-800 dark:text-zinc-100">
                “{title}”
              </i>
              .
            </p>

            <aside className="flex gap-3 items-center justify-center mt-5">
              <button
                onClick={async () => {
                  try {
                    await deleteTask(id);
                    await refreshTasks();
                  } catch (err) {
                    showDialog({
                      content: (
                        <div className="text-rose-600 dark:text-rose-400">
                          Error al eliminar: {(err as Error).message}
                        </div>
                      ),
                    });
                  } finally {
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

  const handleShowOptions = () => setShowOptions((value) => !value);

  if (isLoading) return <Loader />;

  return (
    <ul className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-4 gap-3">
      {tasks?.map((task) => {
        const isDone = task.task_done;

        return (
          <div
            id={`task-${task.task_id}`}
            key={task.task_id}
            className={`flex flex-col gap-0.5 border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-5 rounded-xl relative text-zinc-800 dark:text-zinc-100 transition-all duration-300 ${
              isDone ? "opacity-60" : ""
            }`}
          >
            <h3
              contentEditable={editMode === task.task_id}
              className={`text-xl font-bold transition-all duration-300 w-64 ${
                isDone ? "line-through text-zinc-400" : ""
              }`}
            >
              {task.title}
            </h3>

            <time className="text-sm text-zinc-400" contentEditable="false">
              {formatDateAndTime(task.created_at as string)}
            </time>
            {task.task_updated ? (
              <small contentEditable="false" className="text-xs text-zinc-400">
                Tarea actualizada el{" "}
                {formatDateAndTime(task.updated_at as string)}
              </small>
            ) : null}

            <p
              contentEditable={editMode === task.task_id}
              className={`mt-3 transition-all duration-300 ${
                isDone ? "line-through text-zinc-400" : ""
              }`}
            >
              {task.description}
            </p>

            <div
              className="absolute top-2 right-2 cursor-pointer w-fit"
              onClick={handleShowOptions}
            >
              <span className="flex p-1.5 border border-zinc-200 dark:border-zinc-800/50 rounded-lg hover:bg-indigo-400/80 group transition-colors duration-300 cursor-pointer">
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
                  {!showOtions ? (
                    <>
                      <circle cx={12} cy={12} r={1} />
                      <circle cx={12} cy={5} r={1} />
                      <circle cx={12} cy={19} r={1} />
                    </>
                  ) : (
                    <>
                      <path d="M3 5v14" />
                      <path d="M21 12H7" />
                      <path d="m15 18 6-6-6-6" />
                    </>
                  )}
                </svg>
              </span>
            </div>
            {showOtions && (
              <div className="absolute top-0 right-11 p-2 flex gap-3 backdrop-blur-lg rounded-l-md">
                <span
                  title={`Editar tarea ${task.title}`}
                  onClick={() => handleEdit(task.task_id as number)}
                  className="p-1.5 border border-zinc-200 dark:border-zinc-800/50 rounded-lg hover:bg-indigo-400 group transition-colors duration-300 cursor-pointer"
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
                    className="lucide lucide-pencil-icon lucide-pencil"
                  >
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </span>

                {/* 🗑 Eliminar tarea */}
                <span
                  title={`Eliminar tarea ${task.title}`}
                  onClick={() => handleDelete(task.task_id, task.title)}
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

                {/* 🔁 Marcar como hecha o pendiente */}
                {isDone ? (
                  <span
                    onClick={() => handleMarkUndone(task.task_id!, task.title)}
                    title={`Deshacer tarea ${task.title}`}
                    className="p-1.5 border border-zinc-200 dark:border-zinc-800/50 rounded-lg hover:bg-orange-300/80 group transition-colors duration-300 cursor-pointer"
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
                    className="p-1.5 btn-animation border border-zinc-200 dark:border-zinc-800/50 rounded-lg hover:bg-lime-400/80 group transition-colors duration-300 cursor-pointer"
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
                      className="lucide lucide-check group-hover:stroke-white svg-animation"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                )}
              </div>
            )}
            {editMode === task.task_id && (
              <div className="flex gap-2 items-center mt-2 select-none">
                <button
                  className="px-2 btn-animation py-1 font-semibold bg-indigo-500 text-white text-sm rounded-md hover:brightness-110 flex gap-1 items-center"
                  onClick={() => handleUpdate(task.task_id as number)}
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
                    className="lucide lucide-save-icon lucide-save svg-animation"
                  >
                    <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                    <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
                    <path d="M7 3v4a1 1 0 0 0 1 1h7" />
                  </svg>
                  Guardar
                </button>
                <button
                  onClick={() => setEditMode(null)}
                  className="rounded-md gap-2 px-2 py-1 bg-zinc-800 text-white shadow-sm hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600 transition"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        );
      })}
    </ul>
  );
};
