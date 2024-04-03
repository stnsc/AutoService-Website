import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="../../public/assets/logo.png" alt="Bootstrap" height="60" />
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
          <Link to="/login" className="nav-link px-4 me-2">
            Login
          </Link>
        </span>
      </div>
    </nav>
  );
}
