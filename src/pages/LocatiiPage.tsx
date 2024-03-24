import { motion, useIsPresent } from "framer-motion";
import HeroTitle from "../components/HeroTitle.tsx";

export default function LocatiiPage() {
  const isPresent = useIsPresent();

  return (
    <>
      <HeroTitle title={"Locatii"} description={"Descriere Pagina Locatii"} />

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
