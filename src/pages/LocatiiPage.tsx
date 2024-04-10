import { motion, useIsPresent } from "framer-motion";
import HeroTitle from "../components/HeroTitle.tsx";

export default function LocatiiPage() {
  const isPresent = useIsPresent();

  return (
    <>
      <HeroTitle title={"Locatii"} description={"Descriere Pagina Locatii"} />

      <div className="row location-container">
        {[...Array(10)].map((x, i) => (
          <>
            <div className="location-div">
              <img
                className="location-picture"
                src="../../assets/placeholder.png"
                alt="Foto Locatie"
              />
              <h1 className="location-name">Nume Locatie</h1>
              <p className="location-desc">
                Descriere Locatie {<br />} Lorem Ipsum
              </p>
              <button className="btn btn-primary">Inregistreaza-te!</button>
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
