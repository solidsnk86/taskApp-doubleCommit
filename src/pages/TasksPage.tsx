import { useEffect } from "react";
import { Loader } from "../components/Layout/Loader";
import { TaskCard } from "../components/TaskCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/userProvider";
import { useTasks } from "../contexts/useProviderTask";

export const TasksPage = () => {
  const navigate = useNavigate();
  const { auth, isLoading: authLoading } = useAuth();
  const {
    tasks,
    getAllTasks,
    refreshTasks,
    deleteTask,
    error,
    isLoading,
  } = useTasks();

  // 🔹 Cargar tareas cuando el usuario esté autenticado
  useEffect(() => {
    if (authLoading) return;
    if (!auth) {
      navigate("/login");
      return;
    }
    getAllTasks(); // Llama a la API solo cuando el usuario esté logueado
  }, [auth, authLoading, navigate, getAllTasks]);

  // 🔹 Loader general (auth + tareas)
  if (authLoading || isLoading) return <Loader />;

  // 🔹 Error al cargar tareas
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

  // 🔹 Sin tareas
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

  // 🔹 Vista principal (lista de tareas)
  return (
    <div className="mt-24 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2.5 text-zinc-800 dark:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={28}
            height={28}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4f39f6"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-list-checks-icon lucide-list-checks"
          >
            <path d="M13 5h8" />
            <path d="M13 12h8" />
            <path d="M13 19h8" />
            <path d="m3 17 2 2 4-4" />
            <path d="m3 7 2 2 4-4" />
          </svg>
          Lista de Tareas ({tasks.length})
        </h1>
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

      {/* 🔹 Renderizado de tareas */}
      <TaskCard
        tasks={tasks}
        deleteTask={deleteTask}
        refreshTasks={refreshTasks}
      />
    </div>
  );
};
