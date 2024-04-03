import { motion, useIsPresent } from "framer-motion";
import LoginBackground from "../components/login/LoginBackground.tsx";
import LoginContainer from "../components/login/LoginContainer.tsx";

export default function LoginPage() {
  const isPresent = useIsPresent();

  return (
    <>
      <LoginBackground />
      <LoginContainer />
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
