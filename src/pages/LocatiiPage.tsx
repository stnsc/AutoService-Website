import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import HeroTitle from "../components/HeroTitle.tsx";
import { useEffect, useState } from "react";
import ModalComponent from "../components/ModalComponent.tsx";
import AlertComponent from "../components/AlertComponent.tsx";

/*
 * Pagina Locatii
 *
 * Ofera toate locatiile inregistrate in baza de date "locations" si
 * o functie de programare daca utilizatorul este logat
 * */

interface Location {
  location_id: string;
  name: string;
  description: string;
  address: string;
  image: string;
  coords: string;
}

export default function LocatiiPage() {
  const isPresent = useIsPresent();

  //variabile initializate
  const [locations, setLocations] = useState([]);
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [logged, isLogged] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const [details, setDetails] = useState("");
  const [userID, setUserID] = useState("");

  //sectiunea pentru a afisa alterte
  const [showAlert, setShowAlert] = useState(false);
  const [err, setErr] = useState("");

  //fetch request pentru a arata toate locatiile in
  //baza de date "locations"
  function getLocations() {
    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/locations`)
      .then((response) => response.json())
      .then((result) => setLocations(result))
      .catch((error) => console.error("Error fetching: " + error));
  }

  //functii care preiau datele din text-box-uri
  function handleDateChange(e) {
    const dt = e.target.value;
    setDateTime(dt);
  }

  function handleDetailsChange(e) {
    const dt = e.target.value;
    setDetails(dt);
  }

  //functie pentru a adauga o programare
  function handleSubmit() {
    if (!dateTime || !details) {
      setErr("Câmpurile nu sunt completate.");
      setShowAlert(true);
      return;
    }

    //fetch request pentru a trimte datele date de utilizator
    fetch(
      `http://${import.meta.env.VITE_HOST_IP}:3001/api/appointments/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //parametrii sunt dati intr-un format json
        body: JSON.stringify({
          locationID: data[1],
          userID,
          dateTime,
          details,
        }),
      },
    )
      .then(async (response) => {
        switch (response.status) {
          //daca request-ul s-a executat cu success
          case 200:
            setErr("Programare adaugată cu succes!");
            break;
          //daca request-ul nu s-a executat
          case 500:
            setErr("Data a fost deja programată");
            break;
        }

        return response.text();
      })
      .catch((error) => {
        console.error(error.text);
      });

    setShowAlert(true);
  }

  //functie care verifica logarea utilizatorului
  useEffect(() => {
    const user = localStorage.getItem("name");
    if (user) {
      isLogged(true);
      setUserID(localStorage.getItem("user_id") as string);
    }

    getLocations();
  }, []);

  return (
    <>
      <HeroTitle title={"Locatii"} description={"Descriere Pagina Locatii"} />

      <div className="location-container">
        {
          // functie de map care afiseaza toate locatiile intr-un format visibil
          locations.map(
            ({
              location_id,
              name,
              description,
              address,
              image,
              coords,
            }: Location) => (
              <div className="card" key={location_id}>
                <div
                  className="card-img-top"
                  style={{ backgroundImage: "url(" + image + ")" }}
                />

                <div className="location-body">
                  <h1 className="location-name">{name}</h1>
                  <p className="location-desc">
                    {description} {<br />} {address}
                  </p>
                  <div className="button-layout">
                    <a
                      href={"https://www.google.com/maps/place/" + coords}
                      target="_blank"
                      className="btn btn-secondary"
                    >
                      Vezi pe Google Maps
                    </a>
                    {
                      //buton pentru a deschide un pop-up cu detalii aditionale pentru
                      //programare daca utilizatorul este logat
                      logged && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="location-button btn btn-primary"
                          onClick={() => {
                            setModalOpen(true);
                            setData([name, location_id]);
                          }}
                        >
                          Înregistrează-te!
                        </motion.button>
                      )
                    }
                    {!logged && (
                      <button
                        disabled
                        className="location-button btn btn-primary"
                      >
                        Loghează-te pentru a continua
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ),
          )
        }
      </div>

      {/*
        Pop-up ul pentru adaugarea informatiilor precum
        data programarii si detalii aditionale
      */}
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isModalOpen && (
          <ModalComponent onClose={() => setModalOpen(false)}>
            <h2>
              Ai Selectat <span style={{ fontWeight: "bold" }}>{data[0]}</span>
            </h2>
            <div className="schedule-section">
              <h4>Dată programare:</h4>
              <input
                aria-label="Date and time"
                type="datetime-local"
                value={(dateTime || "").toString()}
                onChange={handleDateChange}
              />
            </div>
            <div className="schedule-section">
              <h4>Detalii adiționale:</h4>
              <textarea name="body" onChange={handleDetailsChange} />
            </div>
            <div className="schedule-section">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Programează-te
              </button>
            </div>
            {
              //compomenta care poate fi inchisa pentru aratarea
              //unor alterte
              showAlert && (
                <AlertComponent
                  contents={err}
                  dismiss={() => setShowAlert(false)}
                />
              )
            }
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
