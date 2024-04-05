import { useEffect, useState } from "react";
import AlertComponent from "../AlertComponent.tsx";

export default function LoginForm() {
  const [users, setUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [err, setErr] = useState(0);
  const [type, setType] = useState(0);

  const err_array = [
    "Campurile nu au fost completate corespunzator",
    "Date incorecte",
    "Logat cu succes!",
  ];

  const alert_type = ["danger", "primary"];

  function getUsers() {
    fetch("http://localhost:3001/api/users")
      .then((response) => response.json())
      .then((result) => setUsers(result))
      .catch((error) => console.error("Error fetching: " + error));
  }

  useEffect(() => {
    getUsers();
  }, []);

  function handleInputChange() {
    setShowAlert(false);
  }

  function handleLogin(e: {
    preventDefault: () => void;
    target: HTMLFormElement | undefined;
  }) {
    e.preventDefault();
    setType(0);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const email: string = data.email as string;
    const password: string = data.password as string;

    if (!email.length || !password.length) {
      setShowAlert(true);
      setErr(0);
    }

    let userFound = false;

    users.forEach(({ email: email1, password: password1 }) => {
      if (email1 === email && password1 === password) {
        userFound = true;
      }
    });

    setShowAlert(true);
    if (!userFound) {
      setErr(1);
    } else {
      setType(1);
      setErr(2);
    }
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
