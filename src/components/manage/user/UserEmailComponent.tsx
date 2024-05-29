import { useEffect, useState } from "react";
import AlertComponent from "../../AlertComponent.tsx";

export default function UserEmailComponent() {
  //parametrii pentru alerte
  const [showAlert, setShowAlert] = useState(false);
  const [err, setErr] = useState("");

  const [userID, setUserID] = useState("");
  const [email, setEmail] = useState("");

  function handleEmailChange(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const newEmail = data.email as string;

    if (!newEmail) {
      setErr("Câmpurile nu au fost completate corespunzător");
      setShowAlert(true);
      return;
    }

    if (newEmail === email.email) {
      setErr("Nu poți introduce același email!");
      setShowAlert(true);
      return;
    }

    //modificarea numelui
    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/users/setEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, newEmail }),
    })
      .then((response) => {
        setErr("Numele a fost modificat cu succes! Pagina se va reîncarca...");
        setShowAlert(true);
        return response.json();
      })
      .finally(() => window.location.reload());
  }

  //useEffect pentru a primi datele utilizatorului
  useEffect(() => {
    const storedUserID = localStorage.getItem("user_id") as string;
    if (storedUserID) setUserID(storedUserID);
  }, []);
  useEffect(() => {
    if (userID) {
      setUserID(localStorage.getItem("user_id") as string);
      fetch(
        `http://${import.meta.env.VITE_HOST_IP}:3001/api/users/getEmail?userID=${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
        .then((response) => response.json())
        .then((result) => setEmail(result))
        .catch((error) => {
          console.error("Error fetching: " + error);
        });
    }
  }, [userID]);

  return (
    <>
      <form className="user-manage-div" onSubmit={handleEmailChange}>
        <div className="user-info-div">
          <h3 className="m-1">Email-ul actual:</h3>
          <p className="m-2">
            <b>{email.email}</b>
          </p>
        </div>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Schimbare Email</label>
        </div>
        <button className="btn btn-primary">Modifică</button>
        {showAlert && (
          <AlertComponent contents={err} dismiss={() => setShowAlert(false)} />
        )}
      </form>
    </>
  );
}
