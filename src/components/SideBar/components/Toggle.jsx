import React from "react";
import { H4 } from "../../../styles/font-styles";
import styles from "./Toggle.module.css";

function Toggle({ isChatting, setIsChatting }) {
  return (
    <div className={styles.container}>
      <div className={styles.toggleContainer}>
      <H4>PROMA prompt</H4>
      <label className={styles.toggleSwitch}>
        <input
          className={styles.checkBox}
          type="checkbox"
          checked={isChatting}
          onChange={() => setIsChatting(!isChatting)}
        />
        <span className={styles.toggleSlider}></span>
      </label>
      </div>
    </div>
  );
}

export default Toggle;
