import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState("");
  const [isActive, setActive] = useState("Acasa");

  const inactiveClass = "nav-link px-2 me-1";
  const activeClass = inactiveClass + " nav-selected";

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
          <Link
            to="/"
            className={`${isActive === "Acasa" ? activeClass : inactiveClass}`}
            onClick={() => setActive("Acasa")}
          >
            Acasa
          </Link>

          <Link
            to="/servicii"
            className={`${isActive === "Servicii" ? activeClass : inactiveClass}`}
            onClick={() => setActive("Servicii")}
          >
            Servicii
          </Link>

          <Link
            to="/locatii"
            className={`${isActive === "Locatii" ? activeClass : inactiveClass}`}
            onClick={() => setActive("Locatii")}
          >
            Locatii
          </Link>

          <Link
            to="/contact"
            className={`${isActive === "Contact" ? activeClass : inactiveClass}`}
            onClick={() => setActive("Contact")}
          >
            Contact
          </Link>
        </div>
        <span>
          <p className="m-0 p-3">{user ? `Buna, ${user}!` : "Guest"}</p>
        </span>
        <span>
          <Link
            to="/login"
            className={`${isActive === "Login" ? activeClass : inactiveClass}`}
            onClick={() => setActive("Login")}
          >
            Login
          </Link>
        </span>
      </div>
    </nav>
  );
}
