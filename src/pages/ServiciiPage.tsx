import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import HeroTitle from "../components/HeroTitle.tsx";
import { useEffect, useState } from "react";
import ModalComponent from "../components/ModalComponent.tsx";

interface Service {
  service_id: number;
  title: string;
  image: string;
  detail_1: string;
  detail_2: string;
  detail_3: string;
}

export default function ServiciiPage() {
  const isPresent = useIsPresent();

  const [services, setServices] = useState([]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);

  function getServices() {
    fetch(`http://${import.meta.env.VITE_HOST_IP}:3001/api/services`)
      .then((response) => response.json())
      .then((result) => setServices(result))
      .catch((error) => console.error("Error fetching: " + error));
  }

  useEffect(() => {
    getServices();
  }, []);

  return (
    <>
      <HeroTitle
        title={"Servicii"}
        description={
          "Toate modalitățile noastre disponibile pentru a îți îmbunătății mașina"
        }
      />
      <div className="services-div">
        {
          //functie care arata toate serviciile din baza de date
          services.map(
            ({
              service_id,
              title,
              image,
              detail_1,
              detail_2,
              detail_3,
            }: Service) => (
              <motion.div
                className="card"
                key={service_id}
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ type: "ease" }}
              >
                <div
                  className="card-img-top"
                  style={{
                    backgroundImage: "url(" + image + ")",
                    width: `100%`,
                    height: `10rem`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="card-body">
                  <h4 className="card-title">{title}</h4>
                  <a
                    className="btn btn-primary"
                    onClick={() => {
                      setModalOpen(true);
                      setData([image, title, detail_1, detail_2, detail_3]);
                    }}
                  >
                    Detalii...
                  </a>
                </div>
              </motion.div>
            ),
          )
        }
      </div>

      {/* Pop-up pentru a arata detaliile serviciului */}

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isModalOpen && (
          <ModalComponent onClose={() => setModalOpen(false)}>
            <div className="service-modal">
              <div className="image-container">
                <img src={data[0]} alt="" />
                <h2>{data[1]}</h2>
              </div>
              <div className="details-container">
                <ul>
                  <li>{data[2]}</li>
                  <li>{data[3]}</li>
                  <li>{data[4]}</li>
                </ul>
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
