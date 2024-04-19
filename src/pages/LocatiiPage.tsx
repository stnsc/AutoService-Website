import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import HeroTitle from "../components/HeroTitle.tsx";
import { useEffect, useState } from "react";
import ModalComponent from "../components/ModalComponent.tsx";

export default function LocatiiPage() {
  const isPresent = useIsPresent();

  const [locations, setLocations] = useState([]);
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [logged, isLogged] = useState(false);
  const [dateTime, setDateTime] = useState("");

  function getLocations() {
    fetch("http://localhost:3001/api/locations")
      .then((response) => response.json())
      .then((result) => setLocations(result))
      .catch((error) => console.error("Error fetching: " + error));
  }

  function handleDateChange(e) {
    const dt = e.target.value;
    setDateTime(dt);
  }

  useEffect(() => {
    const user = localStorage.getItem("name");
    if (user) {
      isLogged(true);
    }
    console.log(logged);

    getLocations();
  }, []);

  return (
    <>
      <HeroTitle title={"Locatii"} description={"Descriere Pagina Locatii"} />

      <div className="location-container">
        {locations.map(({ id, name, description, address, image, coords }) => (
          <>
            <div className="location-card" key={id}>
              <img
                className="location-image"
                alt=""
                style={{ backgroundImage: "url(" + image + ")" }}
              />

              <div className="location-body">
                <h1 className="location-name">{name}</h1>
                <p className="location-desc">
                  {description} {<br />} {address} {<br />} {coords}
                </p>
                {logged && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="location-button btn btn-primary"
                    onClick={() => {
                      setModalOpen(true);
                      setData([name]);
                    }}
                  >
                    Inregistreaza-te!
                  </motion.button>
                )}
                {!logged && (
                  <button disabled className="location-button btn btn-primary">
                    Logheaza-te pentru a continua
                  </button>
                )}
              </div>
            </div>
          </>
        ))}
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isModalOpen && (
          <ModalComponent onClose={() => setModalOpen(false)}>
            <h2>
              Ai Selectat <span style={{ fontWeight: "bold" }}>{data[0]}</span>
            </h2>
            <div className="schedule-section">
              <h4>Data programare:</h4>
              <input
                aria-label="Date and time"
                type="datetime-local"
                value={(dateTime || "").toString()}
                onChange={handleDateChange}
              />
              <p>{dateTime}</p>
            </div>
            <div className="schedule-section">
              <h4>Detalii aditionale:</h4>
              <textarea name="body" />
            </div>
            <div className="schedule-section">
              <button className="btn btn-primary">Programeaza-te</button>
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
