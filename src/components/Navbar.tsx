import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [user, setUser] = useState("");
  const [isActive, setActive] = useState("Acasa");

  console.log("user: " + user);

  const inactiveClass = "nav-link px-2 me-1";
  const activeClass = inactiveClass + " nav-selected";

  useEffect(() => {
    const token: string = localStorage.getItem("token") as string;
    if (!token) {
      localStorage.removeItem("name");
      return;
    }

    const decodedToken = jwtDecode(token);

    const currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      //failed
      setUser("");
    } else {
      //success
      setUser(localStorage.getItem("name") as string);
    }
  }, [user, setUser]);

  function handleDisconnect() {
    localStorage.removeItem("name");
    localStorage.removeItem("token");

    window.location.reload();
  }

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
        <div className="nav-user-info">
          <p className="m-0 p-3">{user ? `Buna, ${user}!` : "Guest"}</p>
          <p
            className={`${!user ? "d-none" : ""} logout-hover m-0 p-3`}
            style={{}}
            onClick={handleDisconnect}
          >
            Log out
          </p>
          <Link
            to="/login"
            className={`${user ? "d-none" : ""} m-0 p-3 ${isActive === "Login" ? activeClass : inactiveClass}`}
            onClick={() => setActive("Login")}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
