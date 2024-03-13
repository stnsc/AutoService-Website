function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="../../public/assets/logo.png" alt="Bootstrap" height="60" />
        </a>
        <div className="navbar me-auto p-2" id="navbarNav">
          <a href="#" className="nav-link px-2 active">
            Acasa
          </a>

          <a href="#" className="nav-link px-2 me-1">
            Alta pagina
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
