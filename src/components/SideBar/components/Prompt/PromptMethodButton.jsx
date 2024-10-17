import React from "react";
import styles from "./PromptMethodButton.module.css";
import { H6 } from "../../../../styles/font-styles";

function PromptMethodButton({ icon, type, onClick, isSelected }) {
    return (
        <div
            onClick={onClick}
            className={`${styles.container} ${isSelected ? styles.containerSelected : ""}`}
        >
            <img className={styles.icon} src={icon} alt="type icon" />
            <H6>{type}</H6>
        </div>
    );
}

export default PromptMethodButton;
