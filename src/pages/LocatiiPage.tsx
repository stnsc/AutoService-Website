import { motion, useIsPresent } from "framer-motion";
import HeroTitle from "../components/HeroTitle.tsx";

export default function LocatiiPage() {
  const isPresent = useIsPresent();

  return (
    <>
      <HeroTitle title={"Locatii"} description={"Descriere Pagina Locatii"} />

      <div className="row row-cols-1">
        {[...Array(10)].map((x, i) => (
          <div className="col" key={i}>
            <div className="bg-secondary p-3 rounded grid-location m-3">
              <div className="location-image">
                <img src="../../assets/placeholder.png" alt="Poza Locatie" />
              </div>
              <h1 className="location-name">Nume Locatie</h1>
              <p className="location-desc">Descriere Locatie</p>
              <button className="btn bg-primary">
                Logheaza-te pentru a continua!
              </button>
            </div>
          </div>
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
