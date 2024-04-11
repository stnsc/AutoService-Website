import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const loggedUser = localStorage.getItem("name");
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-sm fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="../../assets/logo.png" alt="Bootstrap" height="60" />
        </a>
        <div className="navbar me-auto p-2" id="navbarNav">
          <Link to="/" className="nav-link px-2 me-1">
            Acasa
          </Link>

          <Link to="/servicii" className="nav-link px-2 me-1">
            Servicii
          </Link>

          <Link to="/locatii" className="nav-link px-2 me-1">
            Locatii
          </Link>

          <Link to="/contact" className="nav-link px-2 me-1">
            Contact
          </Link>
        </div>
        <span>
          <p className="m-0">{user ? `Buna, ${user}!` : "Guest"}</p>
        </span>
        <span>
          <Link to="/login" className="nav-link px-4 me-2">
            Login
          </Link>
        </span>
      </div>
    </nav>
  );
}
