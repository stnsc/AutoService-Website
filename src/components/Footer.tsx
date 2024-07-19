/*
 * Componenta Footer
 *
 * Afisata mereu la sfarsitul paginii
 * Ofera informatii precum pagina de GitHub,
 * si un toggle de Dark Mode
 * */

import { useEffect, useState } from "react";

export default function Footer() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  function handleChange(e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) {
    setDarkMode(e.target.checked);
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      <div className="footer-container fixed-bottom text-white">
        <p className="card-text center m-0">
          Licență de{" "}
          <a href="https://github.com/stnsc" className="link-info">
            Stănescu Vlăduț-George
          </a>
        </p>
        <form method="post" className="form-check form-switch dark-mode-div">
          <p>Dark Mode</p>
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
    </>
  );
}
