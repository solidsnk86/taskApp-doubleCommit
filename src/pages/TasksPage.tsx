import { useEffect, useState } from "react";
import { Loader } from "../components/Layout/Loader";
import { TaskCard } from "../components/TaskCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/userProvider";
import { useTasks } from "../contexts/useProviderTask";
import type { Task } from "../definitions";

export const TasksPage = () => {
  const navigate = useNavigate();
  const { auth, isLoading: authLoading } = useAuth();
  const { tasks, getAllTasks, refreshTasks, deleteTask, error, isLoading } =
    useTasks();
  const [orderBy, setOrderBy] = useState<string | "desc" | "asc" | "done">("desc");

  // Cargar tareas cuando el usuario esté autenticado
  useEffect(() => {
    if (authLoading) return;
    if (!auth) {
      navigate("/login");
      return;
    }
    getAllTasks(); // Llama a la API solo cuando el usuario esté logueado
  }, [auth, authLoading, navigate, getAllTasks]);

  // Loader general (auth + tareas)
  if (authLoading || isLoading) return <Loader />;

  // Error al cargar tareas
  if (error && (!tasks || tasks.length === 0)) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="bg-red-50 dark:bg-red-950/30 p-6 rounded-xl shadow-md text-center">
          <h1 className="text-xl font-semibold text-red-700 dark:text-red-300">
            Error al cargar las tareas
          </h1>
          <p className="text-sm text-red-500 dark:text-red-400 mt-2">
            {error.message || "No se pudo obtener la lista de tareas."}
          </p>
          <button
            onClick={() => navigate("/create-task")}
            className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition rounded-md"
          >
            Crear nueva tarea
          </button>
        </div>
      </div>
    );
  }

  // Sin tareas
  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col text-center">
          <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200">
            No hay tareas creadas aún 🤔
          </h1>
          <small className="text-zinc-800 dark:text-zinc-400">
            Ninguna tarea a completar
          </small>
          <button
            onClick={() => navigate("/create-task")}
            className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition rounded-md"
          >
            ¡Crea tu primera meta!
          </button>
        </div>
      </div>
    );
  }

  const sortTaskUndone = () => {
    return [...tasks].filter((task) => task.task_done === false);
  };

  const sortTaskDone = (tasks: Task[]) => {
    return [...tasks].filter((task) => task.task_done === true);
  };

  const sortTaskByDate = (tasks: Task[]) => {
    return [...tasks].sort((a, b) => {
      const timeA = new Date(a.created_at as string).getTime();
      const timeB = new Date(b.created_at as string).getTime();
      if (orderBy === "desc") return timeB - timeA;
      return timeA - timeB;
    });
  };

  const handleSortTasks = () => {
    if (orderBy === "done") return sortTaskDone;
    if (orderBy === "undone") return sortTaskUndone;
    return sortTaskByDate;
  };

  const handleSelectOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value);
  };

  // Vista principal (lista de tareas)
  return (
    <div className="mt-24 p-4 space-y-3">
      <h1 className="text-2xl font-bold flex items-center gap-2.5 text-zinc-800 dark:text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4939f6"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-list-todo-icon lucide-list-todo"
        >
          <path d="M13 5h8" />
          <path d="M13 12h8" />
          <path d="M13 19h8" />
          <path d="m3 17 2 2 4-4" />
          <rect x={3} y={4} width={6} height={6} rx={1} />
        </svg>
        Lista de Tareas ({tasks.length})
      </h1>
      <div className="flex justify-between items-center px-1.5">
        <label className="flex gap-2 items-center text-zinc-800 dark:text-white">
          Ordenar por:
          <select
            onChange={handleSelectOrder}
            className="px-2.5 py-2 rounded-md bg-white dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-100 border border-zinc-200"
          >
            <option value="desc">Fecha Descendente</option>
            <option value="asc">Fecha Ascendente</option>
            <option value="done">Tareas Listas</option>
            <option value="undone">Tareas Pendientes</option>
          </select>
        </label>
        <button
          onClick={() => navigate("/create-task")}
          className="flex gap-2 items-center px-4 py-2 bg-indigo-600 border border-indigo-500 text-white hover:bg-indigo-700 transition rounded-md"
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
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          <span className="hidden md:flex">Nueva Tarea</span>
        </button>
      </div>

      {/* Renderizado de tareas */}
      <TaskCard
        tasks={tasks}
        deleteTask={deleteTask}
        refreshTasks={refreshTasks}
        sortTasks={handleSortTasks()}
      />
    </div>
  );
};
