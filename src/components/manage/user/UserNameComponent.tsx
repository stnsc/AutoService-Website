import { useEffect, useState } from "react";
import AlertComponent from "../../AlertComponent.tsx";

export default function UserNameComponent() {
  //parametrii pentru alerte
  const [showAlert, setShowAlert] = useState(false);
  const [err, setErr] = useState(0);
  const [type, setType] = useState(0);

  const err_array = [
    "Campurile nu au fost completate corespunzator",
    "Nu poti introduce acelasi nume!",
    "Numele a fost modificat cu succes! Pagina se va reincarca...",
  ];

  const alert_type = ["danger", "primary"];

  const [userID, setUserID] = useState("");
  const [username, setUsername] = useState("");

  function handleNameChange(e) {
    e.preventDefault();

    //validare
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const name = data.name as string;

    if (!name) {
      setShowAlert(true);
      setErr(0);
      setType(0);
      return;
    }

    console.log(`name: ${name} | username: ${username.name}`);

    if (name === username.name) {
      setShowAlert(true);
      setErr(1);
      setType(0);
      return;
    }

    //modificarea numelui
    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/users/setUsername`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, name }),
    })
      .then((response) => {
        setShowAlert(true);
        setErr(2);
        setType(1);
        localStorage.setItem("name", name);
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
      fetch(
        `http://${import.meta.env.VITE_HOST_IP}:3001/api/users/getUsername?userID=${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
        .then((response) => response.json())
        .then((result) => setUsername(result))
        .catch((error) => {
          console.error("Error fetching: " + error);
        });
    }
  }, [userID]);

  return (
    <>
      <form className="user-manage-div" onSubmit={handleNameChange}>
        <div className="user-info-div">
          <h3 className="m-1">Numele actual:</h3>
          <p className="m-2">
            <b>{username.name}</b>
          </p>
        </div>
        <div className="form-floating">
          <input
            type="name"
            className="form-control"
            name="name"
            placeholder="Popescu Ion"
          />
          <label htmlFor="floatingInput">Schimbare nume</label>
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
