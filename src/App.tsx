import Home from "./pages/Home.tsx";

import { Route, Routes } from "react-router";
import Servicii from "./pages/Servicii.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Locatii from "./pages/Locatii.tsx";
import Login from "./pages/Login.tsx";
import Contact from "./pages/Contact.tsx";

export default function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/servicii" element={<Servicii />}></Route>
          <Route path="/locatii" element={<Locatii />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}
