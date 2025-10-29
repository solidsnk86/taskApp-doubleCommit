import { useState } from "react";
import { formatDateAndTime } from "../utils/formatDate";
import { showDialog } from "../utils/dialog";
import { Loader } from "./Layout/Loader";
import { useTasks } from "../contexts/useProviderTask";
import type { PartialTasksProps } from "../definitions";
import { SaveButton } from "./buttons/SaveButton";
import { CancelButton } from "./buttons/CancelButton";
import { DoneButton } from "./buttons/DoneButton";
import { UndoneButton } from "./buttons/UndoneButton";
import { OptionsButton } from "./buttons/OptionsButton";
import { EditButton } from "./buttons/EditButton";
import { DeleteButton } from "./buttons/DeleteButton";

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
  const [showOtions, setShowOptions] = useState<number | null>(null);

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

  const handleShowOptions = (id: number) => setShowOptions(id);

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
              style={{ outline: editMode === task.task_id ? "1px solid oklch(67.3% 0.182 276.935)" : "", borderRadius: "6px", outlineOffset: "2px" }}
              className={`text-xl font-bold transition-all duration-300 w-64 p-0.5 ${
                isDone ? "line-through text-zinc-400" : ""
              }`}
            >
              {task.title}
            </h3>

            <time className="text-sm text-zinc-400 pl-0.5" contentEditable="false">
              {formatDateAndTime(task.created_at as string)}
            </time>
            {task.task_updated ? (
              <time contentEditable="false" className="text-sm text-zinc-400 pl-0.5">
                Actualizada el {formatDateAndTime(task.updated_at as string)}
              </time>
            ) : null}

            <p
              contentEditable={editMode === task.task_id}
              style={{ outline: editMode === task.task_id ? "1px solid oklch(67.3% 0.182 276.935)" : "", borderRadius: "6px", outlineOffset: "2px" }}
              className={`mt-3 transition-all duration-300 p-0.5 ${
                isDone ? "line-through text-zinc-400" : ""
              }`}
            >
              {task.description}
            </p>

            <div className="absolute top-2 right-2 cursor-pointer w-fit text-zinc-600 dark:text-zinc-400">
              <OptionsButton
                id={task.task_id!}
                show={showOtions}
                handler={() => handleShowOptions(task.task_id as number)}
                setter={setShowOptions}
              />
            </div>
            {showOtions === task.task_id && (
              <div className="absolute top-0 right-11 p-2 flex gap-3 backdrop-blur-sm rounded-l-md text-zinc-600 dark:text-zinc-400">
                <EditButton
                  title={task.title!}
                  handler={() => handleEdit(task.task_id!)}
                />

                {/* 🗑 Eliminar tarea */}
                <DeleteButton
                  title={task.title!}
                  handler={() => handleDelete(task.task_id!, task.title)}
                />

                {/* 🔁 Marcar como hecha o pendiente */}
                {isDone ? (
                  <UndoneButton
                    title={task.title!}
                    handler={() => handleMarkUndone(task.task_id!, task.title)}
                  />
                ) : (
                  <DoneButton
                    title={task.title!}
                    handler={() => handleMarkDone(task.task_id!, task.title)}
                  />
                )}
              </div>
            )}
            {editMode === task.task_id && (
              <div className="flex gap-2 items-center mt-2 select-none">
                <SaveButton
                  handler={() => handleUpdate(task.task_id as number)}
                  className="px-2 py-1"
                />
                <CancelButton
                  handler={() => setEditMode(null)}
                  className="px-2 py-1"
                />
              </div>
            )}
          </div>
        );
      })}
    </ul>
  );
};
