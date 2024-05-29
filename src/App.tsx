import * as React from "react";
import { useLocation, useRoutes } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import ServiciiPage from "./pages/ServiciiPage.tsx";
import LocatiiPage from "./pages/LocatiiPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import { AnimatePresence } from "framer-motion";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import ManagePage from "./pages/ManagePage.tsx";

export default function App() {
  //Rutele pentru a schimba intre pagini
  const element = useRoutes([
    // elementul "/" duce la pagina principala daca link-ul nu ofera parametrii
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
    //elementul "*" duce la pagina 404 daca nu gaseste un link specificat mai sus
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  const location = useLocation();

  if (!element) return null;

  return (
    //Componenta <AnimatePresence> ofera animatii intre pagini
    <AnimatePresence mode="wait" initial={false}>
      {React.cloneElement(element, { key: location.pathname })};
    </AnimatePresence>
  );
}
