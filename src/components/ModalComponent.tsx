import { motion } from "framer-motion";

/*
 * Componenta modulara pentru functia de pop-up
 *
 * Parametrul {children} incapsuleaza tot codul HTML pentru a fi afisat in Pop-ul,
 * iar metoda {onClose} inchide fereastra
 *
 * De asemenea, folosim libraria "framer-motion" pentru animatiile componentei
 * */

export default function ModalComponent({ children, onClose }) {
  return (
    <>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal-content bg-primary white-label"
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.7 }}
          transition={{
            ease: [0.825, 0.15, 0.265, 0.81],
            duration: 0.5,
          }}
        >
          {children}
          <i className="modal-close bi bi-x-lg" onClick={onClose}></i>
        </motion.div>
      </motion.div>
    </>
  );
}
