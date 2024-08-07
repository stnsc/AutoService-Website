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
  const [err, setErr] = useState("");

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

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const name: string = data.name as string;
    const email: string = data.email as string;
    const password: string = data.password as string;
    const password_verify: string = data.password_verify as string;

    //logica pentru validare
    if (!name.length || !email.length || !password || !password_verify) {
      setErr("Câmpurile nu au fost completate corespunzător");
      setShowAlert(true);
      return;
    }

    if (password != password_verify) {
      setErr("Parolele nu sunt indentice.");
      setShowAlert(true);
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
      setErr("Cont creat!");
      setShowAlert(true);
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
        <h1 className="white-label">Înscriere</h1>

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
          <label htmlFor="floatingInput">Parolă</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            placeholder="pass"
            name="password_verify"
          />
          <label htmlFor="floatingInput">Reintroducere parolă</label>
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
            <option value="3">Prefer să nu raspund</option>
          </select>

          <label htmlFor="floatingInput">Sex</label>
        </div>

        <button className="btn btn-primary py-2" type="submit">
          Înscriere!
        </button>

        {showAlert && (
          <AlertComponent contents={err} dismiss={() => setShowAlert(false)} />
        )}
      </form>
    </>
  );
}
