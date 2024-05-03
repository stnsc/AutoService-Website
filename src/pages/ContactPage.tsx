import { motion, useIsPresent } from "framer-motion";
import HeroTitle from "../components/HeroTitle.tsx";

export default function ContactPage() {
  const isPresent = useIsPresent();

  function handleTicket(e) {
    e.preventDefault();
  }

  return (
    <>
      <HeroTitle
        title={"Contact"}
        description={
          "Vrei sa spui o intrebare specialistilor nostrii? Trimite un tichet aici si iti vom raspunde cat de repede posibil!"
        }
      />

      <div className="contact-center">
        <div className="contact-div">
          <h3>
            <i className="bi bi-ticket m-1"></i>Trimite un tichet
          </h3>
          <form method="post" className="contact-form" onSubmit={handleTicket}>
            <input
              type="text"
              className="form-control"
              placeholder="Subiect"
              name="subject"
            />
            <textarea
              className="form-control"
              placeholder="Mesaj"
              name="message"
            />
            <button className="btn btn-primary">Trimite!</button>
          </form>
        </div>
        <div className="contact-div">
          <h3>
            <i className="bi bi-ticket-detailed m-1"></i>Tichetele tale
          </h3>
          <div className="past-tickets-div">
            {[...Array(10)].map((i) => (
              <div className="ticket-index" key={i}>
                <h4>
                  <b>Tichetul nr. 123</b> | Mesaj...
                </h4>
                <h2>
                  <i className="bi bi-arrow-right"></i>
                </h2>
              </div>
            ))}
          </div>
        </div>
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
