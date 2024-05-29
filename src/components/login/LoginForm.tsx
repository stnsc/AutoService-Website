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
  const [err, setErr] = useState("");

  function handleInputChange() {
    setShowAlert(false);
  }

  //functie pentru validarea si executarea login-ului
  function handleLogin(e: {
    preventDefault: () => void;
    target: HTMLFormElement | undefined;
  }) {
    e.preventDefault();

    //se preiau date din form-ul de HTML
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const email: string = data.email as string;
    const password: string = data.password as string;

    //daca form-ul nu a fost completat functia se opreste
    if (!email.length || !password.length) {
      setErr("Câmpurile nu au fost completate corespunzător");
      setShowAlert(true);
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

        setErr("Logat cu succes! Pagina se va reincărca...");
        setShowAlert(true);

        //reimprospatarea paginii
        window.location.reload();
      })
      .catch(() => {
        setErr("Date incorecte");
        setShowAlert(true);
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
          <label htmlFor="floatingInput">Adresă Email</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            placeholder="pass"
            name="password"
          />
          <label htmlFor="floatingInput">Parolă</label>
        </div>
        <button className="btn btn-primary py-2" type="submit">
          Logare
        </button>

        {showAlert && (
          <AlertComponent contents={err} dismiss={() => setShowAlert(false)} />
        )}
      </form>
    </>
  );
}
