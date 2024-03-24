import { motion } from "framer-motion";
import HeroTitle from "../components/HeroTitle.tsx";

export default function ServiciiPage() {
  return (
    <motion.div
      className="services"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroTitle title={"Servicii"} description={"Descriere Pagina Servicii"} />
    </motion.div>
  );
}
