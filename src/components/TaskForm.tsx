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
    <div className="flex items-center justify-center min-h-screen" style={{ viewTransitionName: "page" }}>
      <BackButton route="/tasks" />
      <div className="bg-white dark:bg-zinc-900/50 bg-opacity-30 backdrop-blur-md border-zinc-200 dark:border-zinc-700 shadow-lg p-8 w-full max-w-md text-zinc-800 dark:text-zinc-100">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
          Crear Nueva Tarea
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-zinc-400" htmlFor="title">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-200 dark:border-zinc-800 focus:outline-none focus:ring focus:ring-gray-400"
              placeholder="Ej: Comprar server"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 dark:text-zinc-400" htmlFor="description">
              Descripción
            </label>
            <textarea
              id="description"
              ref={textareaRef}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-200 dark:border-zinc-800 focus:outline-none focus:ring focus:ring-gray-400 resize-none overflow-hidden"
              placeholder="Ej: Comprar dominio en Hostinguer"
              required
              rows={4}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-800 text-white py-2 hover:bg-zinc-700 transition duration-200"
          >
            Agregar tarea
          </button>
        </form>
      </div>
    </div>
  );
};
