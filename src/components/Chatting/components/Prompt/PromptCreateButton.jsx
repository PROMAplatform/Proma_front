import React from "react";
import styles from "./PromptCreateButton.module.css";
import { H4, H5, B7 } from "../../../../styles/font-styles";

function PromptCreateButton({icon, type, content}) {
    return (
        <div className={styles.container}>
            <div className={styles.promptCreateButton}>
                <img src={icon} className={styles.iconContainer}/>
                <H4>{type}</H4>
                <H5>PROMA</H5>
                <B7>{content}</B7>
            </div>
        </div>
    );
}

export default PromptCreateButton;