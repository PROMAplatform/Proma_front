import React from "react";
import styles from "./AddButton.module.css";
import addButtonIcon from "../../../assets/images/addButtonIcon.svg";
import { B6 } from "../../../styles/font-styles";

function AddButton({ text }) {
    return (
        <div className={styles.container} >
            <img className={styles.icon} src={addButtonIcon} alt="icon" />
            <B6 color="logoPurple2">{text}</B6>
        </div>
    );
}

export default AddButton;