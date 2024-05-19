import { useState } from "react";
import AlertComponent from "../AlertComponent.tsx";

/*
 * Login Form
 *
 * O componenta care contine un form pentru a
 * introduce si a valida datele date de utilizator
 * pentru a autentifica
 *
 * De asemenea, sunt folosite cookie-uri pentru a tine
 * utilizatorul logat, chiar daca pagina a fost inchisa
 * */

export default function LoginForm() {
  //variabile pentru <AlertComponent>
  const [showAlert, setShowAlert] = useState(false);
  const [err, setErr] = useState(0);
  const [type, setType] = useState(0);

  const err_array = [
    "Campurile nu au fost completate corespunzator",
    "Date incorecte",
    "Logat cu succes! Pagina se va reincarca...",
  ];

  const alert_type = ["danger", "primary"];

  function handleInputChange() {
    setShowAlert(false);
  }

  //functie pentru validarea si executarea login-ului
  function handleLogin(e: {
    preventDefault: () => void;
    target: HTMLFormElement | undefined;
  }) {
    e.preventDefault();
    setType(0);

    //se preiau date din form-ul de HTML
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const email: string = data.email as string;
    const password: string = data.password as string;

    //daca form-ul nu a fost completat functia se opreste
    if (!email.length || !password.length) {
      setShowAlert(true);
      setErr(0);
      return;
    }

    //fetch request pentru a trimite datele din form in baza de date
    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //toate informatiile sunt trimise in parametrul "body"
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Date incorecte");
        }
        return response.json();
      })
      .then((data) => {
        //daca utilizatorul s-a logat cu success,
        //se adauga la cookie-uri date necesare pentru
        //logari viitoare
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("user_id", data.id);

        setShowAlert(true);
        setType(1);
        setErr(2);

        //reimprospatarea paginii
        window.location.reload();
      })
      .catch(() => {
        setShowAlert(true);
        setType(0);
        setErr(1);
      });
  }

  return (
    <>
      <form
        className="gap-login"
        method="post"
        onSubmit={handleLogin}
        onChange={handleInputChange}
      >
        <h1 className="white-label">Logare</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            name="email"
          />
          <label htmlFor="floatingInput">Adresa Email</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            placeholder="pass"
            name="password"
          />
          <label htmlFor="floatingInput">Parola</label>
        </div>
        <button className="btn btn-primary py-2" type="submit">
          Logare
        </button>

        {showAlert && (
          <AlertComponent
            variant={alert_type[type]}
            contents={err_array[err]}
            dismiss={() => setShowAlert(false)}
          />
        )}
      </form>
    </>
  );
}
