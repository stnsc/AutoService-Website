export default function Footer() {
  function handleChange() {
    let { checked: darkModeValue } = document.getElementById(
      "flexSwitchCheckDefault",
    );

    if (darkModeValue) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
      //setCookie("dark-mode", true);
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
      //setCookie("dark-mode", false);
    }
  }

  return (
    <>
      <div className="card footer-container fixed-bottom rounded-5">
        <div className="card-body text-center text-white bg-black rounded-5 d-flex align-items-center justify-content-between">
          <p className="card-text center m-0">
            Licență de{" "}
            <a href="https://github.com/stnsc" className="link-info">
              Stănescu Vlăduț-George
            </a>
          </p>
          <form
            method="post"
            className="form-check form-switch"
            onChange={handleChange}
          >
            <input
              className="form-check-input dark-mode-toggle"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </form>
        </div>
      </div>
    </>
  );
}
