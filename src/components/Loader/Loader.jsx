import React from "react";
import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = () => (
  <div className={styles.loader}>
    <ClipLoader color="#00BFFF" size={150} aria-label="loading" />
  </div>
);

export default Loader;
