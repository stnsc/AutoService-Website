import { motion, useIsPresent } from "framer-motion";
import LoginContainer from "../components/login/LoginContainer.tsx";

export default function LoginPage() {
  const isPresent = useIsPresent();

  return (
    <>
      <img
        src="../../public/assets/bg.png"
        alt="Login Background"
        className="login-bg"
      />
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
