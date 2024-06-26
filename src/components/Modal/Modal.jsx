import React, { useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = ({ largeImageURL, onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;
