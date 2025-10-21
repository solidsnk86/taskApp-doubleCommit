import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "./BackButton";
import { Loader } from "./Layout/Loader";

export const TaskForm = () => {
  const [titulo, setTitulo] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [descripcion]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://e-retro-back.vercel.app/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ titulo, descripcion }),
      });

      if (!res.ok) throw new Error("Error al crear la tarea");

      setLoading(false);
      navigate("/tasks");
    } catch (err) {
      setLoading(false);
      console.error("Error al guardar la tarea:", err);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ viewTransitionName: "page" }}
    >
      <BackButton route="/tasks" />
      <div className="bg-white dark:bg-zinc-900/50 bg-opacity-30 rounded-lg backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-lg p-8 w-full max-w-md text-zinc-800 dark:text-zinc-100">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
          Crear Nueva Tarea
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-zinc-400"
              htmlFor="title"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="mt-1 block w-full p-2 rounded-md border border-gray-200 dark:border-zinc-800 focus:outline-none focus:ring focus:ring-indigo-400"
              placeholder="Ej: Comprar server"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-zinc-400"
              htmlFor="description"
            >
              Descripción
            </label>
            <textarea
              id="description"
              ref={textareaRef}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="mt-1 block w-full p-2 rounded-md border border-gray-200 dark:border-zinc-800 focus:outline-none focus:ring focus:ring-indigo-400 resize-none overflow-hidden"
              placeholder="Ej: Comprar dominio en Hostinguer"
              required
              rows={4}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full flex gap-2 items-center justify-center bg-zinc-900/60 text-white py-2 hover:opacity-80 transition duration-200 rounded-md border border-zinc-200 dark:border-zinc-800 btn-task"
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
              className="stroke-1 stroke-lime-300 svg-animation"
            >
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
            </svg>
            Agregar tarea
          </button>
        </form>
      </div>
    </div>
  );
};
