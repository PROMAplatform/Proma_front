import React from "react";
import styles from "./PromptListName.module.css";
import { ReactComponent as WritePromptListIcon } from "../../../../../../assets/images/writePromptListIcon.svg";

function PromptListName({ name, isSelected, onSelect }) {
    return (
        <button
            className={`${styles.container} ${isSelected ? styles.active : ""}`}
            onClick={onSelect}
        >
            <WritePromptListIcon />
            <div className={styles.titleContainer}>{name}</div>
        </button>
    );
}

export default PromptListName;
