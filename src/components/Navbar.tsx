import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router";

/*
 * Bara de navigatie
 *
 * Ofera functionalitate pentru schimbarea paginilor,
 * si ofera un status pentru logarea utilizatorului
 * */

export default function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [isActive, setActive] = useState("Acasa");

  //clase active si inactive pentru afisarea dinamica a paginii curente
  const inactiveClass = "nav-link px-2";
  const activeClass = inactiveClass + " nav-selected";

  useEffect(() => {
    //se verifica daca exista cookie-uri in stocarea locala a utilizatorului
    //daca nu se gaseste nimic dintre cele trei variabile, utilizatoul este deconectat
    const token: string = localStorage.getItem("token") as string;
    const name: string = localStorage.getItem("name") as string;
    const user_id: string = localStorage.getItem("user_id") as string;
    if (!token || !name || !user_id) {
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      //failed
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
    } else {
      //success
      setUser(name);
    }
  }, []);

  //functie care sterge toate cookie-urile si
  //reimprospateaza pagina pentru deconectarea
  //utilizatorului
  function handleDisconnect() {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");

    window.location.reload();
  }

  const location = useLocation();
  function setActivePage() {
    setActive(location.pathname);
  }

  const [isAdmin, setIsAdmin] = useState(false);
  function getAdmin() {
    const userID = localStorage.getItem("user_id");

    if (!userID) return;

    fetch(
      `http://${import.meta.env.VITE_HOST_IP}:3001/api/users/isAdmin?userID=${userID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.is_admin == true) setIsAdmin(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getAdmin();
    setActivePage();
  }, [setActivePage]);

  return (
    <nav className="navbar navbar-expand-md fixed-top bg-body">
      <div className="container-fluid">
        <a
          className="navbar-brand"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src="../../assets/logo.png" alt="Bootstrap" height="60" />
        </a>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarToggler">
          <div className="nav navbar-nav me-auto">
            {/*
            Frontend-ul navigatiei

            Componentele <Link> muta utilizatorul de la o pagina la alta
            si modifica stilul butonului
          */}
            <Link
              to="/"
              className={`${isActive === "/" ? activeClass : inactiveClass}`}
              onClick={setActivePage}
            >
              Acasă
            </Link>

            <Link
              to="/servicii"
              className={`${isActive === "/servicii" ? activeClass : inactiveClass}`}
              onClick={setActivePage}
            >
              Servicii
            </Link>

            <Link
              to="/locatii"
              className={`${isActive === "/locatii" ? activeClass : inactiveClass}`}
              onClick={setActivePage}
            >
              Locații
            </Link>

            <Link
              to="/contact"
              className={`${isActive === "/contact" ? activeClass : inactiveClass}`}
              onClick={setActivePage}
            >
              Contact
            </Link>
          </div>
          <div className="nav-user-info">
            {user && (
              <>
                <div className="username-details">
                  <p>{`Buna, ${user}!`}</p>
                  {isAdmin && (
                    <p className="small-text">
                      <i className="bi bi-person-gear"></i> Administrator
                    </p>
                  )}
                </div>

                <Link
                  to="/manage"
                  className={`${isActive === "/manage" ? activeClass : inactiveClass} manage-div`}
                  onClick={setActivePage}
                >
                  Detalii cont
                </Link>
              </>
            )}

            <p
              className={`${!user ? "d-none" : ""} logout-hover m-0 p-3 nav-link`}
              style={{}}
              onClick={handleDisconnect}
            >
              <i className="bi bi-box-arrow-right"></i>
            </p>
            <Link
              to="/login"
              className={`${user ? "d-none" : ""} m-1 p-3 ${isActive === "/login" ? activeClass : inactiveClass}`}
              onClick={setActivePage}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
