import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

/*
 * Bara de navigatie
 *
 * Ofera functionalitate pentru schimbarea paginilor,
 * si ofera un status pentru logarea utilizatorului
 * */

export default function Navbar() {
  const [user, setUser] = useState("");
  const [isActive, setActive] = useState("Acasa");

  //clase active si inactive pentru afisarea dinamica a paginii curente
  const inactiveClass = "nav-link px-2 me-1";
  const activeClass = inactiveClass + " nav-selected";

  useEffect(() => {
    //se verifica daca exista cookie-uri in stocarea locala a utilizatorului
    //daca nu se gaseste nimic dintre cele trei variabile, utilizatoul este deconectat
    const token: string = localStorage.getItem("token") as string;
    const name: string = localStorage.getItem("name") as string;
    const user_id: string = localStorage.getItem("user_id") as string;
    if (!token || !name || !user_id) {
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      return;
    }

    // validarea expirarii token-ului de autentificare
    /*
     * utilizatorul dupa logare va primii sub forma de cookie
     * o cheie criptata care va fi valabila pentru 24 de ore
     *
     * daca utilizatorul se logheaza peste 24 de ore dupa
     * generarea cheii, atunci acesta va fi deconectat
     * */
    const decodedToken = jwtDecode(token);

    const currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      //failed
      setUser("");
    } else {
      //success
      setUser(name);
    }
  }, [user, setUser]);

  //functie care sterge toate cookie-urile si
  //reimprospateaza pagina pentru deconectarea
  //utilizatorului
  function handleDisconnect() {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");

    window.location.reload();
  }

  return (
    <nav className="navbar navbar-expand-sm fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="../../assets/logo.png" alt="Bootstrap" height="60" />
        </a>
        <div className="navbar me-auto p-2" id="navbarNav">
          {/*
            Frontend-ul navigatiei

            Componentele <Link> muta utilizatorul de la o pagina la alta
            si modifica stilul butonului
          */}
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
          <Link
            to="/manage"
            className={`${isActive === "Details" ? activeClass : inactiveClass} m-0 p-3`}
            onClick={() => setActive("Details")}
          >
            Detalii cont
          </Link>
          <p
            className={`${!user ? "d-none" : ""} logout-hover m-0 p-3 nav-link`}
            style={{}}
            onClick={handleDisconnect}
          >
            Deconectare
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
