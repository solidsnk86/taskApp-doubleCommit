import { useState } from "react";
import type { PartialTasksProps } from "../definitions";
import { formatDateAndTime } from "../utils/formatDate";

export const TaskCard = ({ tareas, deleteTask }: PartialTasksProps) => {
  const [doneTasks, setDoneTasks] = useState<Record<string | number, boolean>>({});

  const handleTaskIsDone = (id: number | string) => {
    setDoneTasks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <ul className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-4 gap-3">
        {tareas?.map((task) => {
          const isDone = doneTasks[task.tarea_id];

          return (
            <div
              id={`task-${task.tarea_id}`}
              key={task.tarea_id}
              className={`flex flex-col border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-5 rounded-xl relative text-zinc-800 dark:text-zinc-100 transition-all duration-300 ${
                isDone ? "opacity-60" : ""
              }`}
            >
              <h3
                className={`text-xl font-bold transition-all duration-300 ${
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

                <span
                  onClick={() => handleTaskIsDone(task.tarea_id)}
                  title={`Marcar tarea ${task.titulo} como hecha.`}
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
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
