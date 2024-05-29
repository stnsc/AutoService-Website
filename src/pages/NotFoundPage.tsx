import { Link } from "react-router-dom";
import HeroTitle from "../components/HeroTitle.tsx";
import { motion, useIsPresent } from "framer-motion";

export default function NotFoundPage() {
  const isPresent = useIsPresent();

  return (
    <>
      <HeroTitle title={"404"} description={"Pagina nu a fost gasită"} />
      <Link to="/" className="btn btn-primary">
        Înapoi acasa
      </Link>
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
