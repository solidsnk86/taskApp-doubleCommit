import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { showDialog } from "../../utils/dialog";
import { Loader } from "../Layout/Loader";
import { useAuth } from "../../contexts/userProvider";
import { convertToBase64 } from "../../utils/convertToBase64";

export const UpdateForm = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { auth, refreshUser } = useAuth();

  const user = {
    name: auth?.user?.user_name || "",
    email: auth?.user?.user_email || "",
    avatar: auth?.user?.user_avatar || ""
  }

  // Estados inicializados con los datos del contexto
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userAvatar, setUserAvatar] = useState(user.avatar);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Manejar la selección de archivo
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      showDialog({
        content: (
          <div className="p-5">
            <p>Por favor selecciona un archivo de imagen válido.</p>
          </div>
        ),
      });
      return;
    }

    // Validar tamaño (máximo 10MB) <- está descrito tambien el backend como limit: "10mb" en los middlewares de express json
    if (file.size > 10 * 1024 * 1024) {
      showDialog({
        content: (
          <div className="p-5">
            <p>La imagen no debe superar los 10MB.</p>
          </div>
        ),
      });
      return;
    }

    try {
      setIsUploadingImage(true);
      const base64 = await convertToBase64(file);
      setUserAvatar(base64);
      showDialog({
        content: (
          <div className="p-5">
            <p>Imagen cargada correctamente.</p>
          </div>
        ),
      });
    } catch (error) {
      showDialog({
        content: (
          <div className="p-5">
            <p>Error al cargar la imagen: {String(error)}</p>
          </div>
        ),
      });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://e-retro-back.vercel.app/api/update/user",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: userName,
            email: userEmail,
            avatar: userAvatar,
          }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        setIsLoading(false);
        showDialog({
          content: (
            <div className="p-5">
              <p>{result.message || "Perfil actualizado correctamente."}</p>
            </div>
          ),
        });
        await refreshUser();
        setTimeout(() => navigate("/profile"), 800);
      } else {
        showDialog({
          content: (
            <div className="p-5">
              <p>
                Error: {result.message || "No se pudo actualizar el perfil."}
              </p>
            </div>
          ),
        });
      }
    } catch (error) {
      showDialog({
        content: (
          <div className="p-5">
            <p>Error al actualizar: {String(error)}</p>
          </div>
        ),
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <section className="max-w-2xl flex mx-auto justify-center" style={{ viewTransitionName: "page" }}>
      <div className="w-full p-6 bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-lg my-24 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-100 text-center">
          Editar Perfil
        </h1>

        <form onSubmit={handleUpdate} className="flex flex-col gap-5">
          {/* Avatar preview */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={
                  userAvatar ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Avatar Preview"
                className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover"
              />
              {isUploadingImage && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
            </div>

            {/* Botón para cargar imagen */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingImage}
              className="flex items-center btn-animation rounded-md gap-2 px-4 py-2 bg-blue-600 border border-blue-500 text-white shadow-sm hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed active:outline outline-blue-500 outline-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 svg-animation"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {isUploadingImage ? "Cargando..." : "Cargar Foto"}
            </button>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
              Tamaño máximo: 10MB • Formatos: JPG, PNG, GIF, WebP
            </p>

            {/* URL del avatar (opcional) */}
            <div className="w-full">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                O pega una URL de imagen
              </label>
              <input
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={userAvatar.startsWith("data:") ? "" : userAvatar}
                onChange={(e) => setUserAvatar(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Nombre de usuario
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="Tu email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div 
          onClick={() => navigate("/profile/edit/password")}
          className="flex items-center gap-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-lock-icon lucide-lock stroke-2 stroke-amber-500"
            >
              <rect width={18} height={11} x={3} y={11} rx={2} ry={2} />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>

            <p className="hover:underline text-blue-500">Actualizar contraseña</p>
          </div>
          {/* Botones */}
          <aside className="flex justify-center gap-3 mt-4">
            <button
              type="submit"
              className="flex btn-animation items-center rounded-md gap-2 px-5 py-2.5 border text-ambe border-zinc-200 dark:border-zinc-800 dark:text-white text-zinc-800 shadow-sm hover:text-white hover:bg-green-700 transition"
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
                className="lucide lucide-save-icon lucide-save svg-animation"
              >
                <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
                <path d="M7 3v4a1 1 0 0 0 1 1h7" />
              </svg>
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="flex items-center rounded-md gap-2 px-5 py-2.5 bg-zinc-800 text-white shadow-sm hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-move-left-icon lucide-move-left strok group-hover:-translate-x-1 transition-transform"
              >
                <path d="M6 8L2 12L6 16" />
                <path d="M2 12H22" />
              </svg>
              Volver
            </button>
          </aside>
        </form>
      </div>
    </section>
  );
};
