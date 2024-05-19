import { SetStateAction, useState } from "react";
import AlertComponent from "../AlertComponent.tsx";

/*
 * Sign Up Form
 *
 * O componenta care gestioneaza
 * adaugarea unui utilizator nou in baza
 * de date "users"
 * */

export default function SignUpForm() {
  //variabile pentru componenta <AlertComponent>
  const [showAlert, setShowAlert] = useState(false);
  const [err, setErr] = useState(0);
  const [type, setType] = useState(0);
  const err_array = [
    "Campurile nu au fost completate corespunzator",
    "Parolele nu sunt indentice.",
    "Cont creat!",
  ];
  const alert_type = ["danger", "primary"];

  const [gender, setGender] = useState(0);

  //functii care preiau date din form-uri
  function handleGenderChange(e: {
    target: { value: SetStateAction<number> };
  }) {
    setGender(e.target.value);
  }

  function handleInputChange() {
    setShowAlert(false);
  }

  //functia pentru crearea utilizatorului
  function createUser(e: { preventDefault: () => void; target: never }) {
    e.preventDefault();
    setType(0);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const name: string = data.name as string;
    const email: string = data.email as string;
    const password: string = data.password as string;
    const password_verify: string = data.password_verify as string;

    //logica pentru validare
    if (!name.length || !email.length || !password || !password_verify) {
      setShowAlert(true);
      setErr(0);
      return;
    }

    if (password != password_verify) {
      setShowAlert(true);
      setErr(1);
      return;
    }

    //fetch request-ul pentru a trimite datele in baza de date "users"
    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, gender }),
    }).then((response) => {
      //la executarea cu succes, se afiseaza o alerta pentru a informa
      //confirmarea adaugarii utilizatorului
      setShowAlert(true);
      setType(1);
      setErr(2);
      return response.text();
    });
  }

  return (
    <>
      <form
        className="gap-login"
        method="post"
        onSubmit={createUser}
        onChange={handleInputChange}
      >
        <h1 className="white-label">Inscriere</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="Nume"
            name="name"
          />
          <label htmlFor="floatingInput">Nume</label>
        </div>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            placeholder="nume@email.com"
            name="email"
          />
          <label htmlFor="floatingInput">Email</label>
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

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            placeholder="pass"
            name="password_verify"
          />
          <label htmlFor="floatingInput">Reintroducere parola</label>
        </div>

        <div className="form-floating">
          <select
            className="form-select"
            id="floatingSelectGrid"
            name="gender"
            value={gender}
            onChange={handleGenderChange}
          >
            <option defaultValue="0">Alege</option>
            <option value="1">Masculin</option>
            <option value="2">Feminin</option>
            <option value="3">Prefer sa nu raspund</option>
          </select>

          <label htmlFor="floatingInput">Sex</label>
        </div>

        <button className="btn btn-primary py-2" type="submit">
          Inscriere!
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
