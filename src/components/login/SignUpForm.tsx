import { SetStateAction, useState } from "react";
import AlertComponent from "../AlertComponent.tsx";

export default function SignUpForm() {
  const [gender, setGender] = useState(0);
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(0);

  const err_array = [
    "Nu ai completat toate campurile",
    "Parolele nu sunt indentice.",
  ];

  function handleGenderChange(e: {
    target: { value: SetStateAction<number> };
  }) {
    setGender(e.target.value);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setShow(false);
  }

  function createUser(e: { preventDefault: () => void; target: never }) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const name: string = data.name as string;
    const email: string = data.email as string;
    const password: string = data.password as string;
    const password_verify: string = data.password_verify as string;

    //validation logic
    console.log(name.length);

    if (!name.length || !email.length || !password || !password_verify) {
      setShow(true);
      setErr(0);
      return;
    }

    if (password != password_verify) {
      setShow(true);
      setErr(1);
    }

    fetch("http://localhost:3001/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, gender }),
    }).then((response) => {
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

        <AlertComponent
          variant={"danger"}
          heading={"Eroare"}
          contents={err_array[err]}
          show_bool={show}
        />
      </form>
    </>
  );
}
