import React, { useEffect, useState } from "react";
import AlertComponent from "../AlertComponent.tsx";

export default function LoginForm() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
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
    setShow(false);
  }

  function handleLogin(e) {
    e.preventDefault();
    setType(0);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const email: string = data.email as string;
    const password: string = data.password as string;

    if (!email.length || !password.length) {
      setShow(true);
      setErr(0);
    }

    let userFound = false;

    users.forEach((user) => {
      //this is kinda dumb with the trim()'s, need to fix db data type issue
      if (user.email === email && user.password.trim() === password.trim()) {
        userFound = true;
      }
    });

    setShow(true);
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

        <AlertComponent
          variant={alert_type[type]}
          contents={err_array[err]}
          show_bool={show}
        />
      </form>
    </>
  );
}
