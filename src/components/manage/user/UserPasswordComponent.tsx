import AlertComponent from "../../AlertComponent.tsx";
import { useEffect, useState } from "react";

export default function UserPasswordComponent() {
  //parametrii pentru alerte
  const [showAlert, setShowAlert] = useState(false);
  const [err, setErr] = useState(0);
  const [type, setType] = useState(0);

  const err_array = [
    "Campurile nu au fost completate corespunzator",
    "Nu poti introduce acelasi email!",
    "Parola a fost modificata cu succes!",
  ];

  const alert_type = ["danger", "primary"];

  const [userID, setUserID] = useState("");

  function handlePasswordChange(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const newPassword = data.password as string;
    const newPasswordVerify = data.password_verify as string;

    if (!newPassword || !newPasswordVerify) {
      setShowAlert(true);
      setErr(0);
      setType(0);
      return;
    }

    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/users/setPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, newPassword }),
    })
      .then((response) => {
        setShowAlert(true);
        setErr(2);
        setType(1);
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    const storedUserID = localStorage.getItem("user_id") as string;
    if (storedUserID) setUserID(storedUserID);
  }, []);

  return (
    <>
      <form className="user-manage-div" onSubmit={handlePasswordChange}>
        <h3 className="m-1">Parola:</h3>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="********"
          />
          <label htmlFor="floatingInput">Parola noua</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="password_verify"
            placeholder="********"
          />
          <label htmlFor="floatingInput">Reintroducere parola noua</label>
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
