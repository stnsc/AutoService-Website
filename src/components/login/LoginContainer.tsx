import LoginForm from "./LoginForm.tsx";
import SignUpForm from "./SignUpForm.tsx";
import { useState } from "react";

export default function LoginContainer() {
  const [state, setState] = useState(0);

  const stateType = [<LoginForm />, <SignUpForm />];
  const extraActionStringLabel = ["Nu ai un cont?", "Ai deja un cont?"];
  const extraActionStringLink = [
    "Creeaza unul chiar aici.",
    "Logheaza-te aici.",
  ];

  function handleChange() {
    if (!state) setState((prevState) => prevState + 1);
    else setState((prevState) => prevState - 1);
  }

  return (
    <>
      <div className="login-container">
        <div className="login-text-container">
          <h1 className="auth-text">Autentificare</h1>
          <p className="auth-desc">Programeaza-te la atelierele noastre.</p>
        </div>
        <div className="form-signin login-input-container">
          <form className="gap-login">
            {stateType[state]}
            <p className="white-label">
              {extraActionStringLabel[state]}{" "}
              <a href="#" className="link-info" onClick={handleChange}>
                {extraActionStringLink[state]}
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
