import { motion } from "framer-motion";
import HeroTitle from "../components/HeroTitle.tsx";

export default function ContactPage() {
  return (
    <motion.div
      className="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroTitle title={"Contact"} description={"Descriere Pagina Contact"} />
    </motion.div>
  );
}
