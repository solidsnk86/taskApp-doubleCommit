import { useState } from "react";
import type { PartialTasksProps } from "../definitions";
import { formatDateAndTime } from "../utils/formatDate";
import { showDialog } from "../utils/dialog";
import { Loader } from "./Layout/Loader";

export const TaskCard = ({ tareas, deleteTask, refreshTasks }: PartialTasksProps) => {
  const [, setDoneTasks] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleTaskIsDone = async (id: number | string) => {
    setIsLoading(true)
    await fetch("https://e-retro-back.vercel.app/api/task/done/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then(async(data) => {
        setIsLoading(false)
        setDoneTasks(data.task.hecha);
        if (refreshTasks) await refreshTasks()  
        showDialog({ content: <div>{data.message}</div> });
      })
      .catch((err) => {showDialog({ content: <div>{err.message}</div> }); setIsLoading(false)});
  };

  const markTaskUndone = async (id: number | string) => {
    setIsLoading(true)
    await fetch("https://e-retro-back.vercel.app/api/task/undone/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then(async(data) => {
        setIsLoading(false)
        setDoneTasks(data.task.hecha);
        if (refreshTasks) await refreshTasks()
        showDialog({ content: <div>{data.message}</div> });
      })
      .catch((err) => {showDialog({ content: <div>{err.message}</div> }); setIsLoading(false)});
  };

  if (isLoading) return <Loader />

  return (
    <div>
      <ul className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-4 gap-3">
        {tareas?.map((task) => {
          const isDone = task.hecha;

          return (
            <div
              id={`task-${task.tarea_id}`}
              key={task.tarea_id}
              className={`flex flex-col border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-5 rounded-xl relative text-zinc-800 dark:text-zinc-100 transition-all duration-300 ${
                isDone ? "opacity-60" : ""
              }`}
            >
              <h3
                className={`text-xl font-bold transition-all duration-300 w-64 ${
                  isDone ? "line-through text-zinc-400" : ""
                }`}
              >
                {task.titulo}
              </h3>

              <time className="text-sm text-zinc-400">
                {formatDateAndTime(task.creado_el)}
              </time>

              <p
                className={`mt-3 transition-all duration-300 ${
                  isDone ? "line-through text-zinc-400" : ""
                }`}
              >
                {task.descripcion}
              </p>

              <div className="absolute top-2 right-2 p-2 flex gap-3">
                <span
                  title={`Eliminar tarea ${task.tarea_id}`}
                  onClick={() => deleteTask && deleteTask(task.tarea_id)}
                  className="p-1.5 border border-zinc-200 dark:border-zinc-800/50 rounded-lg hover:bg-rose-400 group transition-colors duration-300"
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
                    className="lucide lucide-trash-icon lucide-trash group-hover:text-zinc-100"
                  >
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    <path d="M3 6h18" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </span>

                {isDone ? (
                  <span
                    onClick={() => markTaskUndone(task.tarea_id)}
                    title={`Deshacer tarea ${task.titulo} como hecha. ❌`}
                    className={`p-1.5 border border-zinc-200 dark:border-zinc-800/50 rounded-lg hover:bg-orange-300 group transition-colors duration-300 group ${
                      isDone ? "bg-orange-400 text-white" : ""
                    }`}
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
                      className="lucide lucide-undo-icon lucide-undo"
                    >
                      <path d="M3 7v6h6" />
                      <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                    </svg>
                  </span>
                ) : (
                  <span
                    onClick={() => handleTaskIsDone(task.tarea_id)}
                    title={`Marcar tarea ${task.titulo} como hecha. ✔`}
                    className={`p-1.5 border border-zinc-200 dark:border-zinc-800/50 rounded-lg hover:bg-lime-400 group transition-colors duration-300 group ${
                      isDone ? "bg-green-400 text-white" : ""
                    }`}
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
                      className="lucide lucide-check-icon lucide-check group-hover:stroke-white"
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
