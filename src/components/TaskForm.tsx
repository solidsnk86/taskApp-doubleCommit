import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "./BackButton";
import { showDialog } from "../utils/dialog";

export const TaskForm = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date | string | number>();
  const [loading, setLoading] = useState(false);
  const [loadingConext, setLoadingContext] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function getResume() {
    try {
      setLoadingContext(true);
      if (!title) {
        showDialog({
          content: (
            <div className="p-5">
              ¡Ups! 😅 Para que la IA pueda ayudarte a generar una descripción
              más precisa, primero escribí un título que resuma tu tarea.
            </div>
          ),
        });
        titleInputRef!.current!.style.outline =
          "1px solid oklch(67.3% 0.182 276.935)";
        return;
      }

      const res = await fetch(
        "https://e-retro-back.vercel.app/api/ai?title=" + title,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data: { context: string } = await res.json();

      setDescription(data.context.replaceAll('"', ""));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingContext(false);
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [description]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://e-retro-back.vercel.app/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description, date: new Date(date as string).toISOString() }),
      });

      if (!res.ok) throw new Error("Error al crear la tarea");

      setLoading(false);
      navigate("/tasks");
    } catch (err) {
      setLoading(false);
      console.error("Error al guardar la tarea:", err);
    }
  };

  return (
    <div
      className="flex items-center justify-center mx-auto mt-24"
      style={{ viewTransitionName: "page" }}
    >
      <BackButton route="/tasks" />
      <div
        className="w-sm md:w-md shadow-lg bg-white dark:bg-zinc-900/50 rounded-lg bg-opacity-30 
        backdrop-blur-md border border-zinc-200 dark:border-zinc-800 p-8 mt-24 md:mt-0"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-4">
          Crear Nueva Tarea
        </h2>
        <div
          className="flex items-center gap-3 p-3 rounded-xl 
                bg-white dark:bg-zinc-900/50 
                backdrop-blur-md
                border border-zinc-100 dark:border-zinc-800 
                my-2"
        >
          <p className="text-indigo-700 dark:text-indigo-200 font-medium text-xs">
            Crea descripciones de tareas automáticas y creativas con ayuda de la
            IA ✨ a partir del título!
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="text-zinc-800 dark:text-zinc-100"
        >
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 dark:text-zinc-400"
              htmlFor="title"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              value={title}
              ref={titleInputRef}
              onChange={(e) => {
                setTitle(e.target.value);
                titleInputRef.current!.style.outline = "none";
              }}
              className="mt-1 block w-full p-2 rounded-md border border-gray-200 dark:border-zinc-800 focus:outline-none focus:ring focus:ring-indigo-400"
              placeholder="Ej: Actualizar landing del producto"
              required
            />
          </div>

          <div className=" relative">
            <label
              className="block text-gray-700 dark:text-zinc-400"
              htmlFor="description"
            >
              Descripción
            </label>
            <textarea
              id="description"
              ref={textareaRef}
              value={loadingConext ? "Procesando..." : description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full p-2 rounded-md border border-gray-200 dark:border-zinc-800 focus:outline-none focus:ring focus:ring-indigo-400 resize-none overflow-hidden"
              placeholder="Ej: Corregir el hero y optimizar el SEO de la página principal.."
              required
              rows={4}
            ></textarea>

            {/* Botón de resumen con IA */}
            <span
              onClick={getResume}
              className="border border-indigo-100 dark:border-indigo-300/80 p-1 rounded absolute bottom-2 right-2 bg-indigo-400/80 btn-animation group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={17}
                height={17}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sparkles-icon lucide-sparkles svg-animation stroke-2 stroke-amber-50"
              >
                <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                <path d="M20 2v4" />
                <path d="M22 4h-4" />
                <circle cx={4} cy={20} r={2} />
              </svg>
              <div className="opacity-0 w-48 absolute bottom-10 -right-20 bg-indigo-400 border border-indigo-300 p-1 rounded-md group-hover:opacity-100 transition-opacity duration-300">
                <small className="font-bold text-white">
                  Describe tareas más rápido con IA a partir del título!
                </small>
                <div className="absolute -bottom-4 right-[40%] translate-[-50%] border-t-transparent border-t-8 border-r-8 border-l-8 border-l-transparent border-b-8 border-indigo-400 rotate-45" />
              </div>
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 mb-4 relative">
            <label
              className="block text-gray-700 dark:text-zinc-400"
              htmlFor="date"
            >
              Fecha
            </label>
            <input
              type="datetime-local"
              id="date"
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full p-2 rounded-md border border-gray-200 dark:border-zinc-800 focus:outline-none focus:ring focus:ring-indigo-400 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full flex gap-2 items-center justify-center bg-zinc-800 dark:bg-zinc-900/60 text-white py-2 hover:opacity-80 transition duration-200 rounded-md border border-zinc-200 dark:border-zinc-800 btn-animation"
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
            {loading ? "Creando Tarea" : "Agregar tarea"}
          </button>
        </form>
      </div>
    </div>
  );
};
