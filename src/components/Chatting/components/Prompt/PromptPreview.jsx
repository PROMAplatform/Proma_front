import React from "react";
import styles from "./PromptPreview.module.css";
import blockIcon from "../../../../assets/images/blockIcon.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentPromptState } from "../../../../recoil/prompt/promptRecoilState";
import { t } from "i18next";

function PromptPreview() {
    const currentPrompt = useRecoilValue(currentPromptState);
    const setCurrentPrompt = useSetRecoilState(currentPromptState);
    function onDeleteHandler() {
        setCurrentPrompt(null);
    }
    return (
        <div className={styles.container}>
            <div className={styles.iconContainer}>
                <img src={blockIcon} alt="block" />
            </div>
            {currentPrompt ? (
                <>
                    <p className={[styles.text, "b6"].join(" ")}>
                        '{currentPrompt.name}'{" "}
                        {t(`input.currentPromptIntroduce`)}
                    </p>
                    <button onClick={onDeleteHandler}> X </button>
                </>
            ) : (
                <p className={[styles.text, "b6"].join(" ")}>
                    {t(`main.promptClickIntend`)}
                </p>
            )}
        </div>
    );
}

export default PromptPreview;
