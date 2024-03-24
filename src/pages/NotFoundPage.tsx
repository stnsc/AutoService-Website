import { Link } from "react-router-dom";
import HeroTitle from "../components/HeroTitle.tsx";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <>
      <motion.div
        className="notFound"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <HeroTitle title={"404"} description={"Pagina nu a fost gasita"} />
        <Link to="/" className="btn btn-primary">
          Inapoi acasa
        </Link>
      </motion.div>
    </>
  );
}
