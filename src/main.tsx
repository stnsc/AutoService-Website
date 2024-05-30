import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
import "./mobile-style.css";
import "./bootstrap-override.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import App from "./App.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";

/*
* Singurul modul care este vazut de pagina de HTML
* Componenta App este incapsulata de bara de navigatie si footer-ul
* care sunt prezente tot timpul
* Ofera suport pentru schimari de pagina cu <BrowserRouter>
si suport pentru cookie-uri <CookiesProvider>
*
* */

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <Navbar />
        <App />
        <Footer />
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
);
