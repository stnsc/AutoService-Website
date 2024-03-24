import { motion } from "framer-motion";
import HeroTitle from "../components/HeroTitle.tsx";

export default function LoginPage() {
  return (
    <motion.div
      className="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroTitle title={"Login"} description={"Descriere Pagina Login"} />;
    </motion.div>
  );
}
