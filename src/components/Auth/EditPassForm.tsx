import { useState, type FormEvent } from "react";
import { useAuth } from "../../contexts/userProvider";
import { BackButton } from "../BackButton";
import { Loader } from "../Layout/Loader";
import { showDialog } from "../../utils/dialog";

export const EditPassForm = () => {
  const { error, isLoading } = useAuth();
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "https://e-retro-back.vercel.app/api/update/user/password",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ password, newPassword }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      showDialog({ content: <div className="p-3">{data.message}</div> })
      setPassword("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setMessage("")
    }
  };

  if (loading) return <Loader />;

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ viewTransitionName: "page" }}
    >
      <BackButton route="/profile/edit" />
      <div className="w-sm bg-white dark:bg-zinc-900/50 bg-opacity-30 rounded-lg backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-6">
          Cambio de contraseña
        </h2>
        <form
          onSubmit={handleSubmit}
          className="text-zinc-800 dark:text-zinc-200"
        >
          <div className="mb-6 relative">
            <label
              className="block text-gray-700 dark:text-zinc-400"
              htmlFor="password"
            >
              Contraseña actual
            </label>
            <input
              type={showPassword ? "password" : "text"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-200 dark:border-zinc-800 focus:outline-none focus:ring focus:ring-indigo-400 rounded-md"
              required
            />
            {showPassword ? (
              <span
                onClick={() => setShowPassword((value) => !value)}
                className="absolute top-9 right-3"
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
                onClick={() => setShowPassword((value) => !value)}
                className="absolute top-9 right-3"
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

          <div className="mb-6 relative">
            <label
              className="block text-gray-700 dark:text-zinc-400"
              htmlFor="password"
            >
              Contraseña nueva
            </label>
            <input
              type={showNewPassword ? "password" : "text"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-200 dark:border-zinc-800 focus:outline-none focus:ring focus:ring-indigo-400 rounded-md"
              required
            />
            {showNewPassword ? (
              <span
                onClick={() => setShowNewPassword((value) => !value)}
                className="absolute top-9 right-3"
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
                onClick={() => setShowNewPassword((value) => !value)}
                className="absolute top-9 right-3"
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
            disabled={isLoading}
            className={`w-full py-2 transition duration-200 select-none rounded-md border border-zinc-200 dark:border-zinc-800/80 ${
              isLoading
                ? "bg-zinc-400 dark:bg-zinc-600 cursor-not-allowed"
                : "bg-zinc-200 dark:bg-zinc-900/60 text-white hover:opacity-80"
            }`}
          >
            {isLoading ? "Procesando..." : "Cambiar Contraseña"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-center mt-3">*{error.message}</p>
        )}
        {message && (
          <p className="text-center mt-3 text-sm text-red-500 dark:text-red-400">
            *{message}
          </p>
        )}
      </div>
    </div>
  );
};
