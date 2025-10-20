import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Layout/Header.tsx";
import { AuthProvider } from "./contexts/userProvider.tsx";
import { AnimatedRoutes } from "./components/Layout/AnimatedLayot.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <AnimatedRoutes />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
