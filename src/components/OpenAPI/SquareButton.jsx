import React from "react";
import styles from "./SquareButton.module.css";
import { B4 } from "../../styles/font-styles";

function SquareButton({ title, onClick, variant }) {
    return (
        <button
            className={`${styles.squareContainer} ${variant === "primary" ? styles.primary : styles.secondary}`}
            onClick={onClick}
        >
            <B4 color={`${variant} === "primary" ? "white" : "blockMainColor"`}>
                {title}
            </B4>
        </button>
    );
}

export default SquareButton;
