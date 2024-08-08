import React from "react";
import styles from "./PromptMethodButton.module.css";
import { H5 } from "../../../../styles/font-styles";

function PromptMethodButton({ icon, type, onClick, isSelected }) {
  return (
    <div
      onClick={onClick}
      className={`${styles.container} ${isSelected ? styles.containerSelected : ""}`}
    >
      <img className={styles.icon} src={icon} alt="type icon" />
      <H5>{type}</H5>
    </div>
  );
}

export default PromptMethodButton;
