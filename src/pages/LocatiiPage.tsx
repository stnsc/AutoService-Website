import { motion, useIsPresent } from "framer-motion";
import HeroTitle from "../components/HeroTitle.tsx";

export default function LocatiiPage() {
  const isPresent = useIsPresent();

  return (
    <>
      <HeroTitle title={"Locatii"} description={"Descriere Pagina Locatii"} />

      <div className="location-container">
        {[...Array(10)].map((x, i) => (
          <>
            <div className="location-card">
              <img
                className="location-image"
                src="../../assets/placeholder.png"
                alt="Foto Locatie"
              />
              <div className="location-body">
                <h1 className="location-name">
                  Nume Locatie asdasdasdasdasdasd
                </h1>
                <p className="location-desc">
                  Descriere Locatie {<br />} Lorem Ipsum
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
