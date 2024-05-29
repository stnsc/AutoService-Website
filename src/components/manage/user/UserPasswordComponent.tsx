import AlertComponent from "../../AlertComponent.tsx";
import { useEffect, useState } from "react";

export default function UserPasswordComponent() {
  //parametrii pentru alerte
  const [showAlert, setShowAlert] = useState(false);
  const [err, setErr] = useState("");

  const [userID, setUserID] = useState("");

  function handlePasswordChange(e: {
    preventDefault: () => void;
    target: HTMLFormElement | undefined;
  }) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const newPassword = data.password as string;
    const newPasswordVerify = data.password_verify as string;

    if (!newPassword || !newPasswordVerify) {
      setErr("Câmpurile nu au fost completate corespunzător");
      setShowAlert(true);
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
        setErr("Parola a fost modificată cu succes!");
        setShowAlert(true);
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
        <h3 className="m-1">Parolă:</h3>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="********"
          />
          <label htmlFor="floatingInput">Parolă noua:</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="password_verify"
            placeholder="********"
          />
          <label htmlFor="floatingInput">Reintroducere parolă noua:</label>
        </div>
        <button className="btn btn-primary">Modifică</button>
        {showAlert && (
          <AlertComponent contents={err} dismiss={() => setShowAlert(false)} />
        )}
      </form>
    </>
  );
}
