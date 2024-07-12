import React from "react";
import styles from "./AddButton.module.css";
import addButtonIcon from "../../assets/images/addButtonIcon.svg";

function AddButton({ text }) {
    return (
        <div className={styles.container}>
            <img className={styles.icon} src={addButtonIcon} alt="icon" />
            <p className={[styles.text, 'text500_14'].join(' ')}>{text}</p>
        </div>
    );
}

export default AddButton;