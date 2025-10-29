import { useNavigate } from "react-router-dom";
import { showDialog } from "../../utils/dialog";
import { useEffect } from "react";
import { useAuth } from "../../contexts/userProvider";
import { UserAvatarsGroup } from "../UsersAvatarsGoup";

export const Home = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const users = [
    {
      id: "1",
      name: "Cecilia Olejarczyk",
      avatar: "https://avatars.githubusercontent.com/u/104603137?v=4",
      github: "https://github.com/CeciliaOlejar",
    },
    {
      id: "2",
      name: "Franco Morales",
      avatar: "https://avatars.githubusercontent.com/u/134340520?v=4",
      github: "https://github.com/Xeneixxe",
    },
    {
      id: "3",
      name: "Gabriel Calcagni",
      avatar: "https://avatars.githubusercontent.com/u/93176365?v=4",
      github: "https://github.com/solidsnk86",
    },
  ];

  useEffect(() => {
    if (auth?.user) {
      const executed = JSON.parse(localStorage.getItem("executed") || "false");
      if (executed === true) return;

      localStorage.setItem("executed", JSON.stringify(true));

      const worker = new Worker(
        new URL("../workers/timerWorker.ts", import.meta.url)
      );

      worker.postMessage(1000);
      worker.onmessage = (event: MessageEvent<number>) => {
        const timer = event.data;
        if (typeof timer !== "number") return;

        if (timer === 3) {
          showDialog({
            content: (
              <div className="p-4 text-center space-y-2">
                <h2 className="text-xl font-semibold text-violet-600">
                  Bienvenido de nuevo 👋 {auth.user?.user_name}
                </h2>
                <p className="text-gray-700 text-pretty">
                  Estas son tus tareas diarias, esas mismas que parecen
                  rutinarias…
                </p>
                <p className="text-gray-500 italic">
                  Para qué vamos a ser tan optimistas!?
                </p>
              </div>
            ),
          });

          setTimeout(() => worker.terminate(), 500);
        }
      };
    }
  }, [auth]);

  return (
    <div className="flex flex-col items-center justify-center mt-20 sm:mt-24 lg:mt-28 px-4 text-center">
      {/* Mensaje motivacional */}
      <p className="welcome-p w-fit mx-auto text-zinc-100 italic text-[0.75rem] sm:text-sm md:text-base px-3 py-1 mb-5 bg-gradient-to-br from-[#57B4FF] via-[#8D70FE] to-[#BD34FE] border border-zinc-400/50 rounded-full">
        “Una tarea a la vez, un paso más cerca del éxito.”
      </p>

      {/* Título principal */}
      <h1 className="welcome-h1 text-3xl sm:text-4xl md:text-5xl xl:text-[3.3rem] font-extrabold bg-clip-text bg-gradient-to-t from-blue-400 to-blue-600 text-transparent leading-snug md:leading-tight">
        Bienvenido a tu Gestor de Tareas
      </h1>

      {/* Subtítulo */}
      <p className="text-base sm:text-lg md:text-xl text-gray-400 mt-3 max-w-xl mx-auto">
        Organiza tu día con facilidad, prioriza lo importante y alcanza tus
        objetivos sin estrés con ayuda de la IA.
      </p>

      {/* Botón principal */}
      <div className="mt-10">
        <button
          onClick={() => navigate("/tasks")}
          className="welcome-btn px-5 py-2 md:px-6 md:py-3 bg-blue-600 text-white font-semibold text-base sm:text-lg hover:bg-blue-700 transition transform hover:scale-105 hover:shadow-blue-600/50 shadow-2xl rounded-md border border-blue-500 hover:border-blue-600"
        >
          Comenzar ahora
        </button>
      </div>

      {/* Sección de usuarios */}
      <div className="flex flex-col items-center mt-14 space-y-3">
        <h4 className="font-semibold text-zinc-800 dark:text-zinc-100 text-sm sm:text-base md:text-lg">
          Usuarios que ya usan esta app
        </h4>
        <UserAvatarsGroup users={users} size={50} />
      </div>
    </div>
  );
};
