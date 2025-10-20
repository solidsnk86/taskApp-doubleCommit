import { useEffect } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Home";
import { TasksPage } from "../../pages/TasksPage";
import { RegisterPage } from "../../pages/RegisterPage";
import { ProfilePage } from "../../pages/ProfilePage";
import { CreateTaskPage } from "../../pages/CreateTaskPage";
import { UpdatePage } from "../../pages/UpdatePage";
import { LoginPage } from "../../pages/LoginPage";
import { ProtectedRoute } from "../ProtectedRoute";
import { EditPassForm } from "../Auth/EditPassForm";

export function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    if (!document.startViewTransition) return;

    document.startViewTransition(() => {
      // el cambio de vista ya ocurrió, React Router renderiza
    });
  }, [location]);

  return (
    <Routes location={location} key={location.pathname}>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rutas protegidas */}
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <TasksPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-task"
        element={
          <ProtectedRoute>
            <CreateTaskPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <UpdatePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/edit/password"
        element={
          <ProtectedRoute>
            <EditPassForm />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
