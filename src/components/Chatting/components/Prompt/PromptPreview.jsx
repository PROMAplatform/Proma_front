import React from "react";
import styles from "./PromptPreview.module.css";
import blockIcon from "../../../../assets/images/blockIcon.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentPromptState } from "../../../../recoil/prompt/promptRecoilState";

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
                        '{currentPrompt.name}' 프롬프트 적용중
                    </p>
                    <button onClick={onDeleteHandler}> X </button>
                </>
            ) : (
                <p className={[styles.text, "b6"].join(" ")}>
                    질문하기 전, 사용하실 프롬프트를 클릭하세요!
                </p>
            )}
        </div>
    );
}

export default PromptPreview;
