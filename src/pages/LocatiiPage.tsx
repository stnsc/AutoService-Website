import { motion } from "framer-motion";
import HeroTitle from "../components/HeroTitle.tsx";

export default function LocatiiPage() {
  return (
    <motion.div
      className="location"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroTitle title={"Locatii"} description={"Descriere Pagina Locatii"} />
    </motion.div>
  );
}
