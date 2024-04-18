import { motion } from "framer-motion";

export default function ModalComponent({ children, onClose }) {
  return (
    <>
      <motion.div
        className="modal-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="modal-overlay">
          <div className="modal-content bg-primary white-label">
            {children}
            <i className="modal-close bi bi-x-lg" onClick={onClose}></i>
          </div>
        </div>
      </motion.div>
    </>
  );
}
