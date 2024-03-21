import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
);
