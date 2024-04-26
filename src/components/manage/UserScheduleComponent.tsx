import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ModalComponent from "../ModalComponent.tsx";

interface Appointment {
  app_id: string;
  name: string;
  address: string;
  app_date: string;
}

export default function UserScheduleComponent() {
  const [appointments, setAppointments] = useState([]);
  const [userID, setUserID] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);
  const [appID, setAppID] = useState("");

  function getAppointments() {
    fetch(`http://localhost:3001/api/appointments/user?userID=${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => setAppointments(result))
      .catch((error) => console.error("Error fetching: " + error));
  }

  function handleDelete() {
    fetch("http://localhost:3001/api/appointments/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ appID }),
    }).then((response) => {
      getAppointments();
      return response.json();
    });
  }

  useEffect(() => {
    setUserID(localStorage.getItem("user_id") as string);
    if (userID) getAppointments();
  }, [userID]);

  return (
    <>
      <div className="appointment-container">
        {appointments.map(
          ({ app_id, name, address, app_date }: Appointment) => (
            <div className="appointment-card" key={app_id}>
              <h3>Programarea #{app_id}</h3>
              <p>
                La service-ul <b>{name}</b>
              </p>
              <p>
                Locatie: <b>{address}</b>
              </p>
              <p>
                La data de: <b>{app_date.split("T")[0]}</b>, ora{" "}
                <b>{app_date.split("T")[1].substring(0, 5)}</b>
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setModalOpen(true);
                  setAppID(app_id);
                }}
              >
                Anuleaza
              </button>
            </div>
          ),
        )}
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isModalOpen && (
          <ModalComponent onClose={() => setModalOpen(false)}>
            <h3>Esti sigur ca vrei sa anulezi aceasta programare?</h3>
            <h4>
              <i>(cu numarul {appID})</i>
            </h4>
            <div className="flex-row">
              <button
                className="btn btn-secondary m-2"
                onClick={() => {
                  handleDelete();
                  setModalOpen(false);
                }}
              >
                Da
              </button>
              <button
                className="btn btn-danger m-2"
                onClick={() => setModalOpen(false)}
              >
                Nu
              </button>
            </div>
          </ModalComponent>
        )}
      </AnimatePresence>
    </>
  );
}
