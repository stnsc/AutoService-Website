import HeroTitle from "../components/HeroTitle.tsx";

import { motion, useIsPresent } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/*
 * Pagina Acasa
 * Ofera informatii generale despre Sistemul Web "Auto Service"
 * */

export default function HomePage() {
  const isPresent = useIsPresent();
  const navigate = useNavigate();

  //statistics fetching
  const [users, setUsers] = useState(0);
  const [appointments, setAppointments] = useState(0);
  const [tickets, setTickets] = useState(0);

  function statsUsers() {
    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/stats/users`)
      .then((response) => response.json())
      .then((result) => setUsers(result))
      .catch((error) => console.error("Error fetching: " + error));
  }

  function statsAppointments() {
    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/stats/appointments`)
      .then((response) => response.json())
      .then((result) => setAppointments(result))
      .catch((error) => console.error("Error fetching: " + error));
  }

  function statsTickets() {
    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/stats/tickets`)
      .then((response) => response.json())
      .then((result) => setTickets(result))
      .catch((error) => console.error("Error fetching: " + error));
  }

  useEffect(() => {
    statsUsers();
    statsAppointments();
    statsTickets();
  }, []);

  return (
    <>
      {/* HERO COMPONENT */}

      <HeroTitle
        title={"Spune adio problemelor mașinii tale."}
        description={
          "La service-ul nostru auto, punem accent pe calitate, siguranță și profesionalism în fiecare intervenție. Echipa noastră de mecanici experimentați și bine pregătiți este aici pentru a asigura că mașina ta primește tratamentul pe care-l merită."
        }
      />

      {/* SERVICES COMPONENT */}

      <h2 className="home-subtitle">Câteva servicii pe care le oferim:</h2>

      <div className="services-div">
        <motion.div
          className="card"
          whileHover={{ y: -5, scale: 1.05 }}
          transition={{ type: "ease" }}
        >
          <div
            className="card-img-top"
            style={{
              backgroundImage: `url(https://i.imgur.com/vRRBRqz.png)`,
              width: `100%`,
              height: `10rem`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="card-body">
            <h2 className="card-title">Revizii Periodice și Întreținere</h2>
            <a
              className="btn btn-primary"
              onClick={() => {
                navigate("/servicii");
              }}
            >
              Mai multe
            </a>
          </div>
        </motion.div>

        <motion.div
          className="card"
          whileHover={{ y: -5, scale: 1.05 }}
          transition={{ type: "ease" }}
        >
          <div
            className="card-img-top"
            style={{
              backgroundImage: `url(https://i.imgur.com/lgyQQ3V.jpeg)`,
              width: `100%`,
              height: `10rem`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="card-body">
            <h2 className="card-title">Diagnoză Computerizată</h2>
            <a
              className="btn btn-primary"
              onClick={() => {
                navigate("/servicii");
              }}
            >
              Mai multe
            </a>
          </div>
        </motion.div>

        <motion.div
          className="card"
          whileHover={{ y: -5, scale: 1.05 }}
          transition={{ type: "ease" }}
        >
          <div
            className="card-img-top"
            style={{
              backgroundImage: `url("https://i.imgur.com/OHTlrH0.png")`,
              width: `100%`,
              height: `10rem`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="card-body">
            <h2 className="card-title">Anvelope și Jante</h2>
            <a
              className="btn btn-primary"
              onClick={() => {
                navigate("/servicii");
              }}
            >
              Mai multe
            </a>
          </div>
        </motion.div>
      </div>

      {/* STATISTICS COMPONENT */}

      <div className="stats-container">
        <h2 className="home-subtitle">Statistici despre firma noastră:</h2>
        <div className="home-row">
          <motion.div
            className="home-col"
            whileHover={{ x: -10, scale: 1.1 }}
            transition={{ type: "ease" }}
          >
            <div className="card">
              <div className="card-body">
                <h1>{users.max}+</h1>
                <p>Conturi de utilizatori</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="home-col"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "ease" }}
          >
            <div className="card">
              <div className="card-body">
                <h1>{appointments.max}+</h1>
                <p>De programari realizate</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="home-col"
            whileHover={{ x: 10, scale: 1.1 }}
            transition={{ type: "ease" }}
          >
            <div className="card">
              <div className="card-body">
                <h1>{tickets.max}+</h1>
                <p>Tichete deschise</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CONTACT COMPONENT */}

      <div className="card contact-container">
        <div className="card-header">Contact</div>
        <div className="card-body">
          <h5 className="card-title">Ne pasă de mașina ta</h5>
          <p className="card-text">
            Vom lua toate măsurile necesare pentru a-ți face experiența cu noi
            cât mai plăcută și eficientă.
          </p>
          <a
            className="btn btn-primary"
            onClick={() => {
              navigate("/contact");
            }}
          >
            Contactează-ne
          </a>
        </div>
      </div>

      {/*
        Metoda pentru a adauga tranzitii intre pagini
        clasa "screen-wipe" ofera instructiunile pentru animatie,
        iar proprietatile date in <motion.div> ofera modul in care
        parametrii sunt modificati
      */}
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
