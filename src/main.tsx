import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Layout/Header.tsx";
import { AuthProvider } from "./contexts/userProvider.tsx";
import { AnimatedRoutes } from "./components/Layout/AnimatedLayot.tsx";
import { TaskProvider } from "./contexts/useProviderTask.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Header />
          <AnimatedRoutes />
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
