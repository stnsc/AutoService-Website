import HeroTitle from "../components/HeroTitle.tsx";

import { motion, useIsPresent } from "framer-motion";

/*
 * Pagina Acasa
 * Ofera informatii generale despre Sistemul Web "Auto Service"
 * */

export default function HomePage() {
  const isPresent = useIsPresent();

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

      <div className="home-row">
        <div className="home-col">
          <div className="card">
            <img
              src="../../assets/placeholder.png"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Serviciu 1</h5>
              <p className="card-text">Descriere serviciu</p>
              <a href="#" className="btn btn-primary">
                Mai multe
              </a>
            </div>
          </div>
        </div>

        <div className="home-col">
          <div className="card">
            <img
              src="../../assets/placeholder.png"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Serviciu 2</h5>
              <p className="card-text">Descriere serviciu</p>
              <a href="#" className="btn btn-primary">
                Mai multe
              </a>
            </div>
          </div>
        </div>

        <div className="home-col">
          <div className="card">
            <img
              src="../../assets/placeholder.png"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Serviciu 3</h5>
              <p className="card-text">Descriere serviciu</p>
              <a href="#" className="btn btn-primary">
                Mai multe
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* STATISTICS COMPONENT */}

      <div className="stats-container">
        <div className="home-row">
          <div className="home-col">
            <div className="card">
              <div className="card-body">
                <h1>10+</h1>
                <p>Statistica 1</p>
              </div>
            </div>
          </div>
          <div className="home-col">
            <div className="card">
              <div className="card-body">
                <h1>20+</h1>
                <p>Statistica 2</p>
              </div>
            </div>
          </div>
          <div className="home-col">
            <div className="card">
              <div className="card-body">
                <h1>30+</h1>
                <p>Statistica 3</p>
              </div>
            </div>
          </div>
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
          <a href="#" className="btn btn-primary">
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
