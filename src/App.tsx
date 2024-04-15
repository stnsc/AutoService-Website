import * as React from "react";
import { useLocation, useRoutes } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import ServiciiPage from "./pages/ServiciiPage.tsx";
import LocatiiPage from "./pages/LocatiiPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import { AnimatePresence } from "framer-motion";
import DatabaseDebugPage from "./pages/DatabaseDebugPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import ManagePage from "./pages/ManagePage.tsx";

export default function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/servicii",
      element: <ServiciiPage />,
    },
    {
      path: "/locatii",
      element: <LocatiiPage />,
    },
    {
      path: "/contact",
      element: <ContactPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/manage",
      element: <ManagePage />,
    },
    {
      path: "/db",
      element: <DatabaseDebugPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  const location = useLocation();

  if (!element) return null;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {React.cloneElement(element, { key: location.pathname })};
    </AnimatePresence>
  );
}
