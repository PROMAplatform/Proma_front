import React from "react";
import styles from "./Toggle.module.css";

function Toggle({ isChatting, setIsChatting }) {
  return (
    <div className={styles.container}>
      <div className={styles.toggleContainer}>
      <span className="h4">PROMA prompt</span>
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
