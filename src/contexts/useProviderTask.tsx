/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { showDialog } from "../utils/dialog";
import type { Task } from "../definitions";

interface TaskContextType {
  tasks: Task[] | null;
  isLoading: boolean;
  error: Error | null;
  getAllTasks: () => Promise<void>;
  createTask: (task: Task) => Promise<void>;
  updateTask: (id: number, title: string, description: string) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  refreshTasks: () => Promise<void>;
  markDone: (id: number | string) => Promise<void>;
  markUndone: (id: number | string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 🔹 GET ALL TASKS
  const getAllTasks = useCallback(async () => {
    try {
      setIsloading(true);
      const res = await fetch("https://e-retro-back.vercel.app/api/tasks", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setTasks(data.tasks);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsloading(false);
    }
  }, []);

  // 🔹 CREATE TASK
  const createTask = useCallback(async (task: Task) => {
    try {
      setIsloading(true);
      const res = await fetch("https://e-retro-back.vercel.app/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(task),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      await getAllTasks(); // refresca automáticamente
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsloading(false);
    }
  }, [getAllTasks]);

  // 🔹 UPDATE TASK
  const updateTask = useCallback(async (id: number, title: string, description: string) => {
    try {
      setIsloading(true);
      const res = await fetch("https://e-retro-back.vercel.app/api/update/task/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      showDialog({ content: <div className="p-3">Se ha actualizado la tarea: <i className="text-emerald-400">{data.title}</i></div> });
      await getAllTasks();
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsloading(false);
    }
  }, [getAllTasks]);

  // 🔹 DELETE TASK
  const deleteTask = useCallback(async (id: number) => {
    try {
      setIsloading(true);
      const res = await fetch("https://e-retro-back.vercel.app/api/delete/task/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      showDialog({
        content: (
          <div className="text-center p-3">
            🗑️ Tarea <i className="text-rose-600 dark:text-rose-400">“{data.task.title}”</i> eliminada con
            éxito.
          </div>
        ),
      });
      await getAllTasks();
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsloading(false);
    }
  }, [getAllTasks]);

  // 🔹 REFRESH TASKS
  const refreshTasks = useCallback(async () => {
    await getAllTasks();
  }, [getAllTasks]);

  // 🔹 MARK DONE / UNDONE
  const markDone = useCallback(async (id: number | string) => {
    try {
      setIsloading(true);
      await fetch("https://e-retro-back.vercel.app/api/task/done/" + id, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      await getAllTasks();
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsloading(false);
    }
  }, [getAllTasks]);

  const markUndone = useCallback(async (id: number | string) => {
    try {
      setIsloading(true);
      await fetch("https://e-retro-back.vercel.app/api/task/undone/" + id, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      await getAllTasks();
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsloading(false);
    }
  }, [getAllTasks]);

  // 🔹 Solo se ejecuta una vez al montar
  useEffect(() => {
    getAllTasks();
  }, [getAllTasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        getAllTasks,
        createTask,
        updateTask,
        deleteTask,
        refreshTasks,
        markDone,
        markUndone,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTasks debe usarse dentro de un TaskProvider");
  return context;
};
