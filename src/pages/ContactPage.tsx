import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import HeroTitle from "../components/HeroTitle.tsx";
import { useEffect, useRef, useState } from "react";
import ModalComponent from "../components/ModalComponent.tsx";

interface Ticket {
  ticket_id: number;
  subject: string;
  message: string;
}

interface Chat {
  user_id: number;
  name: string;
  message: string;
  date_day: string;
  date_timestamp: string;
}

export default function ContactPage() {
  const isPresent = useIsPresent();

  const [tickets, setTickets] = useState([]);

  const [userID, setUserID] = useState();
  const [name, setName] = useState("");
  const [logged, isLogged] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);

  function truncate(str: string) {
    return str.substring(0, 20);
  }
  function getTickets() {
    fetch(`http://localhost:3001/api/tickets/user?userID=${userID}`, {
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

    fetch("http://localhost:3001/api/tickets/add", {
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

  //functie pentru stergerea unui tichet
  const [ticketID, setTicketID] = useState();
  function handleTicketDeletion() {
    fetch("http://localhost:3001/api/tickets/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ticketID }),
    }).then((response) => {
      getTickets();
      return response.json();
    });

    setModalOpen(false);
  }

  //functie care verifica logarea utilizatorului
  useEffect(() => {
    setUserID(localStorage.getItem("user_id") as string);
    setName(localStorage.getItem("name") as string);
    if (userID) {
      isLogged(true);
      getTickets();
    }
  }, [userID]);

  //functii pentru trimiterea unui mesaj
  const [inputValue, setInputValue] = useState("");
  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleInputSend() {
    const data = JSON.stringify({
      ticketID,
      userID,
      name,
      inputValue,
    });
    setInputValue("");

    fetch("http://localhost:3001/api/tickets/addChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    }).then((response) => {
      handleChatRetrieval(ticketID);
      return response.json();
    });
  }

  //functie pentru a prelua toate mesajele dintr-un tichet
  const [chats, setChats] = useState([]);
  function handleChatRetrieval(ticket_id: number) {
    fetch(`http://localhost:3001/api/tickets/getChats?ticketID=${ticket_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setChats(result);
        console.log(chats);
      })
      .catch((error) => {
        console.error("Error fetching: " + error);
      });
  }

  //auto scroll
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats]);

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
                    setTicketID(ticket_id);
                    handleChatRetrieval(ticket_id);
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
            <div className="chat-window">
              <div className="chat-info-column">
                <h5 className="chat-ticket-number">Tichetul nr. {data[0]}</h5>
                <h5
                  className="chat-ticket-delete"
                  onClick={handleTicketDeletion}
                >
                  Sterge
                </h5>
              </div>
              <h3 className="chat-ticket-title">"{data[1]}"</h3>
              <div className="chat-box">
                <div className="chat-scroll" ref={scrollRef}>
                  {chats.map(
                    ({
                      user_id,
                      name,
                      message,
                      date_day,
                      date_timestamp,
                    }: Chat) => (
                      <>
                        {user_id == userID && (
                          <div className="right-side">
                            <div className="right-message">
                              <h5 className="name">{name}</h5>
                              <p>{message}</p>
                              <p className="date-timestamp">
                                {date_day}, {date_timestamp}
                              </p>
                            </div>
                          </div>
                        )}
                        {user_id != userID && (
                          <div className="left-side">
                            <div className="left-message">
                              <h5 className="name">{name}</h5>
                              <p>{message}</p>
                              <p className="date-timestamp">
                                {date_day}, {date_timestamp}
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    ),
                  )}
                </div>
                <div className="chat-input">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <i
                    className="bi bi-arrow-right chat-send"
                    onClick={handleInputSend}
                  ></i>
                </div>
              </div>
            </div>
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
