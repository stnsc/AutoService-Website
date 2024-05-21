import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import HeroTitle from "../components/HeroTitle.tsx";
import { useEffect, useState } from "react";
import ModalComponent from "../components/ModalComponent.tsx";
import ChatBox from "../components/ChatBox.tsx";

interface Ticket {
  ticket_id: number;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const isPresent = useIsPresent();

  const [tickets, setTickets] = useState([]);

  const [userID, setUserID] = useState(0);
  const [name, setName] = useState("");
  const [logged, isLogged] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);

  function truncate(str: string) {
    return str.substring(0, 20);
  }
  function getTickets() {
    fetch(
      `http://${import.meta.env.VITE_HOST_IP}:3001/api/tickets/user?userID=${userID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP Error. Status: ${response.status}`);
        return response.json();
      })
      .then((result) => setTickets(result))
      .catch((error) => {
        console.error("Error fetching: " + error);
      });
  }

  function handleTicket(e) {
    e.preventDefault();

    //primirea datelor din componenta <form>
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const subject: string = data.subject as string;
    const message: string = data.message as string;

    if (!subject.length || !message.length) {
      return;
    }

    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/tickets/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, subject, message }),
    })
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => getTickets());

    console.log(data, userID);
  }

  //functie care verifica logarea utilizatorului
  useEffect(() => {
    setUserID(Number(localStorage.getItem("user_id")));
    setName(localStorage.getItem("name") as string);
    if (userID) {
      isLogged(true);
      getTickets();
    }
  }, [userID]);

  return (
    <>
      <HeroTitle
        title={"Contact"}
        description={
          "Vrei sa spui o intrebare specialistilor nostrii? Trimite un tichet aici si iti vom raspunde cat de repede posibil!"
        }
      />

      {/*se afiseaza o eroare in cazul in care utilizatorul nu este logat*/}
      {!logged && (
        <div className="contact-center">
          <div className="contact-div">
            <h1 className="contact-error">
              <h3>
                <i className="bi bi-exclamation-diamond"></i> Nu esti logat!
              </h3>
              <h5>
                Pagina de contact foloseste un sistem de tichete personalizat
                care necesita utilizatorul sa foloseasca un cont!
              </h5>
            </h1>
          </div>
        </div>
      )}

      {logged && (
        <div className="contact-center">
          {/* inscrierea unui tichet */}
          <div className="contact-div">
            <h3>
              <i className="bi bi-ticket m-1"></i>Trimite un tichet
            </h3>
            <form
              method="post"
              className="contact-form"
              onSubmit={handleTicket}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Subiect"
                name="subject"
              />
              <textarea
                className="form-control"
                placeholder="Mesaj"
                name="message"
              />
              <button className="btn btn-primary" type="submit">
                Trimite!
              </button>
            </form>
          </div>

          {/* afisarea tichetelor utilizatorului */}
          <div className="contact-div">
            <h3>
              <i className="bi bi-ticket-detailed m-1"></i>Tichetele tale
            </h3>
            <div className="past-tickets-div">
              {tickets.map(({ ticket_id, subject, message }: Ticket) => (
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
                    <p>{truncate(message)}...</p>
                  </div>
                  <div className="ticket-arrow">
                    <h2>
                      <i className="bi bi-arrow-right"></i>
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isModalOpen && (
          <ModalComponent onClose={() => setModalOpen(false)}>
            <ChatBox
              ticket_id={data[0]}
              title={data[1]}
              logged_user_id={userID}
              name={name}
              is_admin={false}
              dismiss={() => console.log()}
            />
          </ModalComponent>
        )}
      </AnimatePresence>
      <motion.div
        className="screen-wipe"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
      />
    </>
  );
}
