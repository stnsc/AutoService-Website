/*
 * Componenta Footer
 *
 * Afisata mereu la sfarsitul paginii
 * Ofera informatii precum pagina de GitHub,
 * si un toggle de Dark Mode
 * */

import { useEffect, useState } from "react";

export default function Footer() {
  const [darkMode, setDarkMode] = useState(true);

  function handleChange(e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) {
    setDarkMode(e.target.checked);
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      <div className="card footer-container fixed-bottom rounded-5">
        <div className="card-body text-center text-white rounded-5 d-flex align-items-center justify-content-between">
          <p className="card-text center m-0">
            Licență de{" "}
            <a href="https://github.com/stnsc" className="link-info">
              Stănescu Vlăduț-George
            </a>
          </p>
          <form method="post" className="form-check form-switch">
            <input
              className="form-check-input dark-mode-toggle"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onChange={handleChange}
              checked={darkMode}
            />
          </form>
        </div>
      </div>
    </>
  );
}
