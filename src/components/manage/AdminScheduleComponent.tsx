import { useEffect, useState } from "react";
import ModalComponent from "../ModalComponent.tsx";
import { AnimatePresence } from "framer-motion";

interface Appointment {
  app_id: string;
  user_id: string;
  username: string;
  name: string;
  address: string;
  app_date: string;
  app_notes: string;
}

export default function AdminScheduleComponent() {
  const [appointments, setAppointments] = useState([]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [appID, setAppID] = useState("");

  const [error, showError] = useState(false);
  const [loading, showLoading] = useState(true);

  function getAppointments() {
    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/appointments/getAll`)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP Error. Status: ${response.status}`);
        return response.json();
      })
      .then((result) => setAppointments(result))
      .catch((error) => {
        console.error("Error fetching: " + error);
        showError(true);
      })
      .finally(() => {
        showLoading(false);
      });
  }

  function handleDelete() {
    fetch(
      `http://${import.meta.env.VITE_HOST_IP}:3001/api/appointments/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appID }),
      },
    ).then((response) => {
      getAppointments();
      return response.json();
    });
  }

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <>
      <div className="appointment-container">
        {loading && (
          <div className="information-fetch">
            <h1>
              <i className="bi bi-arrow-clockwise"></i>
            </h1>
            <h2>Se încarca...</h2>
          </div>
        )}
        {error && (
          <div className="information-fetch">
            <h1>
              <i className="bi bi-exclamation-diamond"></i>
            </h1>

            <h2>Nu s-au găsit rezultate</h2>
          </div>
        )}
        {appointments.map(
          ({
            app_id,
            user_id,
            username,
            name,
            address,
            app_date,
            app_notes,
          }: Appointment) => (
            <>
              <div className="appointment-card" key={app_id}>
                <h4>
                  Programare de la utilizatorul #{user_id}, cu numele {username}
                </h4>
                <p>
                  La service-ul <b>{name}</b>, locat la <b>{address}</b>
                </p>
                La data de: <b>{app_date.split("T")[0]}</b>, ora{" "}
                <b>{app_date.split("T")[1].substring(0, 5)}</b>
                <p>Note date de utilizator: </p>
                <p>{app_notes}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setModalOpen(true);
                    setAppID(app_id);
                  }}
                >
                  Șterge programarea
                </button>
              </div>
            </>
          ),
        )}
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isModalOpen && (
          <ModalComponent onClose={() => setModalOpen(false)}>
            <h3>Ești sigur că vrei să ștergi această programare?</h3>
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
