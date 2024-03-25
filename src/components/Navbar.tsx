import { Form, Link } from "react-router-dom";

export default function Navbar() {
  function handleChange() {
    const { checked: darkModeValue } = document.getElementById(
      "flexSwitchCheckDefault",
    );

    if (darkModeValue) console.log("Dark Mode Activated!");
    else console.log("Dark Mode Off");
  }

  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary fixed-top">
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

          <Link to="/login" className="nav-link px-2 me-1">
            Login
          </Link>
        </div>
      </div>
      <form
        method="post"
        className="form-check form-switch me-2"
        onChange={handleChange}
      >
        <input
          className="form-check-input dark-mode-toggle"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
        />
        <label
          className="form-check-label dark-mode-label"
          htmlFor="flexSwitchCheckDefault"
        >
          Dark Mode
        </label>
      </form>
    </nav>
  );
}
