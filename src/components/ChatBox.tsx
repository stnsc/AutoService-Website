import { SetStateAction, useEffect, useRef, useState } from "react";

interface Chat {
  user_id: number;
  name: string;
  message: string;
  date_day: string;
  date_timestamp: string;
}

interface Data {
  title: string;
  dismiss: () => void;
  ticket_id: number;
  logged_user_id: number;
  name: string;
  is_admin: boolean;
}

export default function ChatBox({
  title,
  ticket_id,
  dismiss,
  logged_user_id,
  name,
  is_admin,
}: Data) {
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

  useEffect(() => {
    handleChatRetrieval(ticket_id);
  }, [ticket_id]);

  //functii pentru trimiterea unui mesaj
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(e: { target: { value: SetStateAction<string> } }) {
    setInputValue(e.target.value);
  }

  function handleInputSend() {
    const data = JSON.stringify({
      ticket_id,
      logged_user_id,
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
      handleChatRetrieval(ticket_id);
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
      body: JSON.stringify({ ticket_id, logged_user_id }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dismiss();
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
    <div className="chat-window">
      <div className="chat-info-column">
        <h5 className="chat-ticket-number">Tichetul nr. {ticket_id}</h5>
        {is_admin && (
          <h5 className="chat-ticket-claim" onClick={handleTicketClaim}>
            Preia
          </h5>
        )}
      </div>
      <h3 className="chat-ticket-title">"{title}"</h3>
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
                    {user_id == logged_user_id && (
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
                    {user_id != logged_user_id && (
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
          <input type="text" value={inputValue} onChange={handleInputChange} />
          <i
            className="bi bi-arrow-right chat-send"
            onClick={handleInputSend}
          ></i>
        </div>
      </div>
    </div>
  );
}
