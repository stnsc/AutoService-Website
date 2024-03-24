import { Link } from "react-router-dom";
import HeroTitle from "../components/HeroTitle.tsx";

export default function NotFound() {
  return (
    <>
      <div>
        <HeroTitle title={"404"} description={"Pagina nu a fost gasita"} />
        <Link to="/" className="btn">
          Inapoi acasa
        </Link>
      </div>
    </>
  );
}
