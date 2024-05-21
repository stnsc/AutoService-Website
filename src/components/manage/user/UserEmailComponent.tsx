import { useEffect, useState } from "react";
import AlertComponent from "../../AlertComponent.tsx";

export default function UserEmailComponent() {
  //parametrii pentru alerte
  const [showAlert, setShowAlert] = useState(false);
  const [err, setErr] = useState(0);
  const [type, setType] = useState(0);

  const err_array = [
    "Campurile nu au fost completate corespunzator",
    "Nu poti introduce acelasi email!",
    "Numele a fost modificat cu succes! Pagina se va reincarca...",
  ];

  const alert_type = ["danger", "primary"];

  const [userID, setUserID] = useState("");
  const [email, setEmail] = useState("");

  function handleEmailChange(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const newEmail = data.email as string;

    if (!newEmail) {
      setShowAlert(true);
      setErr(0);
      setType(0);
      return;
    }

    if (newEmail === email.email) {
      setShowAlert(true);
      setErr(1);
      setType(0);
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
        setShowAlert(true);
        setErr(2);
        setType(1);
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
        <button className="btn btn-primary">Modifica</button>
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