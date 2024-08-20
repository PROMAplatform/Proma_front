import React from "react";
import styles from "./PromptPreview.module.css";
import blockIcon from "../../../../assets/images/blockIcon.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentPromptState } from "../../../../recoil/prompt/promptRecoilState";
import clearIcon from "../../../../assets/images/exitIcon.svg";
import { B5 } from "../../../../styles/font-styles";
import { t } from "i18next";

function PromptPreview() {
    const currentPrompt = useRecoilValue(currentPromptState);
    const setCurrentPrompt = useSetRecoilState(currentPromptState);
    function onDeleteHandler() {
        setCurrentPrompt(null);
    }
    return (
        <div className={styles.container} data-tour="currentPrompt">
            <div className={styles.iconContainer}>
                <img src={blockIcon} alt="block" />
            </div>
            {currentPrompt ? (
                <>
                    <B5 color="gray6" className={styles.text}>
                        '{currentPrompt.name}'{" "}
                        {t(`input.currentPromptIntroduce`)}
                    </B5>
                    <img src={clearIcon} alt="x" className={styles.clearIcon} onClick={onDeleteHandler}/>
                </>
            ) : (
                <B5 color="gray6" className={styles.text}>
                    {t(`main.promptClickIntend`)}
                </B5>
            )}
        </div>
    );
}

export default PromptPreview;
