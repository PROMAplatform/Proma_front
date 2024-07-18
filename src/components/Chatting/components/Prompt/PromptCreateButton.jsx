import React from "react";
import styles from "./PromptCreateButton.module.css";

function PromptCreateButton({icon, type, content}) {
    return (
        <div className={styles.container}>
            <div className={styles.promptCreateButton}>
                <img src={icon} className={styles.iconContainer}/>
                <p className={[styles.typeText, "h4"].join(" ")}>{type}</p>
                <p className={[styles.promaText, "h5"].join(" ")}>PROMA</p>
                <p className={[styles.contentText, "b7"].join(" ")}>{content}</p>
            </div>
        </div>
    );
}

export default PromptCreateButton;