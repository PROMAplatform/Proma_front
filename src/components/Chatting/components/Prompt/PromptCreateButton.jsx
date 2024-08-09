import React from "react";
import styles from "./PromptCreateButton.module.css";
import promptMakingIcon from "../../../../assets/images/promptMakingIcon.svg";
import { H4, H5 } from "../../../../styles/font-styles";
import { t } from "i18next";

function PromptCreateButton({ icon, type, onClick }) {
    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.promptCreateButton}>
                <img
                    src={icon}
                    alt="type icon"
                    className={styles.iconContainer}
                />
                <H4>{type}</H4>
                <div className={styles.contentContainer}>
                    <H5>{t(`main.toGo`)}</H5>
                    <img
                        src={promptMakingIcon}
                        alt="make prompt"
                        className={styles.iconContainer}
                    />
                </div>
            </div>
        </div>
    );
}

export default PromptCreateButton;
