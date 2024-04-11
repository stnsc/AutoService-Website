import { motion, useIsPresent } from "framer-motion";
import HeroTitle from "../components/HeroTitle.tsx";
import { useEffect, useState } from "react";

export default function LocatiiPage() {
  const isPresent = useIsPresent();

  const [locations, setLocations] = useState([]);

  function getLocations() {
    fetch("http://localhost:3001/api/locations")
      .then((response) => response.json())
      .then((result) => setLocations(result))
      .catch((error) => console.error("Error fetching: " + error));
  }

  useEffect(() => {
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
                <button className="location-button btn btn-primary">
                  Inregistreaza-te!
                </button>
              </div>
            </div>
          </>
        ))}
      </div>

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
