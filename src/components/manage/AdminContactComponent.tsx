import { useEffect, useState } from "react";
import ModalComponent from "../ModalComponent.tsx";
import { AnimatePresence } from "framer-motion";
import ChatBox from "../ChatBox.tsx";

interface Ticket {
  ticket_id: number;
  subject: string;
  message: string;
  admin_id: number;
}

export default function AdminContactComponent() {
  const [tickets, setTickets] = useState([]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);

  //variabile pentru afisarea progresului de preluare a datelor din baza de date
  const [loading, showLoading] = useState(true);

  function getTickets() {
    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/tickets/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP Error. Status: ${response.status}`);
        return response.json();
      })
      .then((result) => setTickets(result))
      .catch((error) => {
        console.error("Error fetching: " + error);
      })
      .finally(() => {
        showLoading(false);
      });
  }

  useEffect(() => {
    getTickets();
  }, []);

  //functie care verifica logarea utilizatorului
  const [userID, setUserID] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    setUserID(Number(localStorage.getItem("user_id")));
    setName(localStorage.getItem("name") as string);
  }, [userID]);

  return (
    <>
      <div className="past-tickets-div">
        <div className="information-warning">
          <h4>
            <i className="bi bi-exclamation-diamond"></i> In cazul in care nu se
            afiseaza nimic, toate tichetele au fost preluate de alti
            administratori!
          </h4>
        </div>
        {loading && (
          <div className="information-fetch">
            <h1>
              <i className="bi bi-arrow-clockwise"></i>
            </h1>
            <h2>Se incarca...</h2>
          </div>
        )}
        {tickets.map(({ ticket_id, subject, message, admin_id }: Ticket) => (
          <>
            {admin_id == null && (
              <div
                className="ticket-index"
                key={ticket_id}
                onClick={() => {
                  setModalOpen(true);
                  setData([ticket_id, subject]);
                }}
              >
                <div className="ticket-details">
                  <h4>
                    <b>Tichetul nr. {ticket_id}</b> | "{subject}"
                  </h4>
                  <p>{message}...</p>
                  <h5 className="not-claimed">
                    <i className="bi bi-exclamation-diamond"></i> Acest tichet
                    nu a fost preluat!
                  </h5>
                </div>
                <div className="ticket-arrow">
                  <h2>
                    <i className="bi bi-arrow-right"></i>
                  </h2>
                </div>
              </div>
            )}
            {admin_id == userID && (
              <div
                className="ticket-index"
                key={ticket_id}
                onClick={() => {
                  setModalOpen(true);
                  setData([ticket_id, subject]);
                }}
              >
                <div className="ticket-details">
                  <h4>
                    <b>Tichetul nr. {ticket_id}</b> | "{subject}"
                  </h4>
                  <p>{message}...</p>
                  <h5 className="claimed">
                    <i className="bi bi-exclamation-diamond"></i> Acest tichet a
                    fost preluat de tine!
                  </h5>
                </div>
                <div className="ticket-arrow">
                  <h2>
                    <i className="bi bi-arrow-right"></i>
                  </h2>
                </div>
              </div>
            )}
          </>
        ))}
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isModalOpen && (
          <ModalComponent onClose={() => setModalOpen(false)}>
            <ChatBox
              title={data[1]}
              dismiss={() => {
                setModalOpen(false);
                getTickets();
              }}
              ticket_id={data[0]}
              logged_user_id={userID}
              name={name}
              is_admin={true}
            />
          </ModalComponent>
        )}
      </AnimatePresence>
    </>
  );
}
