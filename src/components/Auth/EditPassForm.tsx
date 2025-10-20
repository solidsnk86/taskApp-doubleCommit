import { useState } from "react"
import { useAuth } from "../../contexts/userProvider"
import { BackButton } from "../BackButton"

export const EditPassForm = () => {
    const { error, isLoading } = useAuth()
    const [password, setPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState(true)

    const handleSubmit = () => {}

    const handleShowPassword = () => setShowPassword((value) => !value)
    return (
        <div className="flex items-center justify-center min-h-screen">
      <BackButton />
      <div className="bg-white dark:bg-zinc-900/50 bg-opacity-30 backdrop-blur-md border-zinc-200 dark:border-zinc-700 shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-6">
          Cambio de contraseña
        </h2>
        <form onSubmit={handleSubmit} className="text-zinc-800 dark:text-zinc-200">
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
              className="mt-1 block w-full p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
              required
            />
            {showPassword ? (
              <span
                onClick={handleShowPassword}
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
                onClick={handleShowPassword}
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
              type={showPassword ? "password" : "text"}
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
              required
            />
            {showPassword ? (
              <span
                onClick={handleShowPassword}
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
                onClick={handleShowPassword}
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
            className={`w-full py-2 transition duration-200 ${
              isLoading
                ? "bg-zinc-400 cursor-not-allowed"
                : "bg-zinc-800 text-white hover:bg-zinc-700"
            }`}
          >
            {isLoading ? "Procesando..." : "Cambiar Contraseña"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-center mt-3">*{error.message}</p>
        )}
      </div>
    </div>
    )
}