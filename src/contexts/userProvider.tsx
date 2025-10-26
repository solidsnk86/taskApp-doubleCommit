/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { PartialUserProps } from "../definitions";

interface AuthContextType {
  auth: PartialUserProps | null;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  refreshUser: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PartialUserProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const checkSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://e-retro-back.vercel.app/api/profile", {
        credentials: "include",
      });
      if (res.status === 404) throw new Error("Sin sesión");
      const data = await res.json();
      
      setUser(data);
    } catch (err) {
      setIsLoading(false);
      setUser(null);
      setError(err as Error);
    } finally {
      setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const signin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("https://e-retro-back.vercel.app/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (res.status === 403) throw new Error("La contraseña es incorrecta.");
      if (res.status === 404)
        throw new Error("El correo electrónico no está registrado.");

      const data = await res.json();

      setUser(data);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signout = async () => {
    setIsLoading(true);
    try {
      await fetch("https://e-retro-back.vercel.app/api/logout", {
        method: "GET",
        credentials: "include",
      });
      
      setUser(null);
    } catch (err) {
      setError(err as Error)
      console.error("Error al cerrar sesión:", err);
    } finally {
      setIsLoading(false)
    }
  };

  const deleteUser = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://e-retro-back.vercel.app/api/delete/user/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Error al eliminar usuario");
      setUser(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    await checkSession()
  };

  return (
    <AuthContext.Provider
      value={{
        auth: user,
        signin,
        signout,
        deleteUser,
        refreshUser,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
