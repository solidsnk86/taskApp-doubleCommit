import { useState, type FormEvent } from "react";
import { showDialog } from "../../utils/dialog";
import { BackButton } from "../BackButton";
import { useNavigate } from "react-router-dom";
import type { PartialUserProps } from "../../definitions";
import { useAuth } from "../../contexts/userProvider";
import { getLocation } from "../../utils/getLocation";

export const RegisterForm = () => {
  const { refreshUser } = useAuth();
  const navigate = useNavigate();
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const { ip, city, country } = await getLocation()
      const response = await fetch(
        "https://e-retro-back.vercel.app/api/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name, email, password, ip, city, country }),
        }
      );
      const data: PartialUserProps = await response.json();

      if (!response.ok) {
        showDialog({ content: <div className="p-5">{data.message}</div> });
        return;
      }
      setIsLoading(false)
      showDialog({
        content: (
          <div className="p-5">
            <h3 className="text-lg font-semibold text-center">¡Registro exitoso!</h3>
            <p className="mt-2 text-rose-400">{data?.message}</p>
          </div>
        ),
      });
      await refreshUser()
      navigate("/profile")
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((value) => !value);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ viewTransitionName: "page" }}
    >
      <BackButton route="/login" />
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900/50 p-8 text-zinc-800 dark:text-zinc-200 w-[342px] rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800"
      >
        <h2 className="text-lg font-bold mb-4 text-zinc-800 dark:text-white">
          Registro
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-zinc-400">
            Nombre de usuario
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md dark:border-zinc-800 p-2 outline-none focus:ring focus:ring-indigo-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-zinc-400">
            Correo electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md dark:border-zinc-800 p-2 outline-none focus:ring focus:ring-indigo-400"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-zinc-400">
            Contraseña
          </label>
          <input
            type={showPassword ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 dark:border-zinc-800 outline-none focus:ring focus:ring-indigo-400"
            required
          />
          {showPassword ? (
            <span
              onClick={handleShowPassword}
              className="absolute top-8 right-3"
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
                className="lucide lucide-eye-closed-icon lucide-eye-closed"
              >
                <path d="m15 18-.722-3.25" />
                <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                <path d="m20 15-1.726-2.05" />
                <path d="m4 15 1.726-2.05" />
                <path d="m9 18 .722-3.25" />
              </svg>
            </span>
          ) : (
            <span
              onClick={handleShowPassword}
              className="absolute top-8 right-3"
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
                className="lucide lucide-eye-icon lucide-eye"
              >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx={12} cy={12} r={3} />
              </svg>
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-zinc-200 dark:bg-zinc-900 font-semibold text-zinc-800 dark:text-white p-2 rounded-md border border-zinc-300 dark:border-zinc-800/80 hover:opacity-80 hover:shadow"
        >
          {isLoading ? "Procesando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
};
