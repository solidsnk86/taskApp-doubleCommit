import { useState, type FormEvent } from "react";
import { showDialog } from "../../utils/dialog";
import { BackButton } from "../BackButton";
import { useNavigate } from "react-router-dom";
import type { PartialUserProps } from "../../definitions";
import { useAuth } from "../../contexts/userProvider";

export const RegisterForm = () => {
  const { refreshUser } = useAuth()
  const navigate = useNavigate();
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch("https://e-retro-back.vercel.app/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then(async(data: PartialUserProps) => {
        setIsLoading(false);
        await refreshUser()
        navigate("/profile");
        showDialog({
          content: (
            <div className="p-4">
              <h3 className="text-lg font-semibold">¡Registro exitoso!</h3>
              <p className="mt-2 text-rose-400">Usuario: {data?.user?.user_name}</p>
              <p className="mt-1 text-rose-400">Correo: {data?.user?.user_email}</p>
            </div>
          ),
        });
      })
      .catch((err) => {
        setIsLoading(false);
        showDialog({ content: <div>{err.message}</div> });
      });
  };

  const handleShowPassword = () => {
    setShowPassword((value) => !value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ viewTransitionName: "page" }}>
      <BackButton route="/login" />
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900/50 p-8 text-zinc-800 dark:text-zinc-200 shadow-md w-80 border border-zinc-200 dark:border-zinc-800"
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
            className="mt-1 block w-full border border-gray-300  p-2"
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
            className="mt-1 block w-full border border-gray-300  p-2"
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
            className="mt-1 block w-full border border-gray-300  p-2"
            required
          />
          {showPassword ? (
            <span onClick={handleShowPassword} className="absolute top-8 right-3">
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
            <span onClick={handleShowPassword} className="absolute top-8 right-3">
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
          className="w-full bg-zinc-800 text-white p-2 hover:bg-zinc-700"
        >
          {isLoading ? "Procesando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
};
