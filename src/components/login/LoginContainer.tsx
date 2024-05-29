import LoginForm from "./LoginForm.tsx";
import SignUpForm from "./SignUpForm.tsx";
import { useState } from "react";

/*
 * Componenta pentru containerul de logare,
 * contine doar partea vizuala, si un toggle
 * pentru a schimba intre inregistrare si logare
 * */

export default function LoginContainer() {
  const [state, setState] = useState(0);

  const stateType = [<LoginForm />, <SignUpForm />];
  const extraActionStringLabel = ["Nu ai un cont?", "Ai deja un cont?"];
  const extraActionStringLink = [
    "Creează unul chiar aici.",
    "Loghează-te aici.",
  ];

  //toggle-ul pentru a schimba intre componentele <LoginForm> si <SignUpForm>
  function handleChange() {
    if (!state) setState((prevState) => prevState + 1);
    else setState((prevState) => prevState - 1);
  }

  return (
    <>
      <div className="login-container">
        <div className="login-text-container">
          <h1 className="auth-text">Autentificare</h1>
          <p className="auth-desc">Programează-te la atelierele noastre.</p>
        </div>
        <div className="form-signin login-input-container">
          {stateType[state]}
          <p className="white-label">
            {extraActionStringLabel[state]}{" "}
            <a href="#" className="link-info" onClick={handleChange}>
              {extraActionStringLink[state]}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
