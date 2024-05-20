import { useEffect, useRef, useState } from "react";
import ModalComponent from "../ModalComponent.tsx";
import { AnimatePresence } from "framer-motion";

interface Ticket {
  ticket_id: number;
  subject: string;
  message: string;
  admin_id: number;
}
interface Chat {
  user_id: number;
  name: string;
  message: string;
  date_day: string;
  date_timestamp: string;
}

export default function AdminContactComponent() {
  const [tickets, setTickets] = useState([]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);

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
      });
  }

  useEffect(() => {
    getTickets();
  }, []);

  //functie care verifica logarea utilizatorului
  const [userID, setUserID] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setUserID(localStorage.getItem("user_id") as string);
    setName(localStorage.getItem("name") as string);
  }, [userID]);

  //functie pentru stergerea unui tichet
  const [ticketID, setTicketID] = useState(0);
  function handleTicketDeletion() {
    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/tickets/delete`, {
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

  //functie pentru a prelua toate mesajele dintr-un tichet
  const [chats, setChats] = useState([]);
  function handleChatRetrieval(ticket_id: number) {
    fetch(
      `http://${import.meta.env.VITE_HOST_IP}:3001/api/tickets/getChats?ticketID=${ticket_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setChats(result);
      })
      .catch((error) => {
        console.error("Error fetching: " + error);
      });
  }

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

    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/tickets/addChat`, {
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

  //functie pentru a prelua un tichet
  function handleTicketClaim() {
    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/tickets/claim`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ticketID, userID }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setModalOpen(false);
        getTickets();
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
      <div className="past-tickets-div">
        {tickets.map(({ ticket_id, subject, message, admin_id }: Ticket) => (
          <>
            {admin_id == null && (
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
                  setTicketID(ticket_id);
                  handleChatRetrieval(ticket_id);
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
            <div className="chat-window">
              <div className="chat-info-column">
                <h5 className="chat-ticket-number">Tichetul nr. {data[0]}</h5>
                <h5
                  className="chat-ticket-delete"
                  onClick={handleTicketDeletion}
                >
                  Sterge
                </h5>
                <h5 className="chat-ticket-claim" onClick={handleTicketClaim}>
                  Preia
                </h5>
              </div>
              <h3 className="chat-ticket-title">"{data[1]}"</h3>
              <div className="chat-box">
                <div className="chat-scroll" ref={scrollRef}>
                  {chats.length > 0 && (
                    <>
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
                    </>
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
    </>
  );
}
