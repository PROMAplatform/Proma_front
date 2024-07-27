import React from "react";
import styles from "./PromptPreview.module.css";
import blockIcon from "../../../../assets/images/blockIcon.svg";

function PromptPreview() {
    return (
        <div className={styles.container} >
            <div className={styles.iconContainer}>
                <img src={blockIcon} alt="block" />
            </div>
            <p className={[styles.text, "b6"].join(" ")}>질문하기 전, 사용하실 프롬프트를 채팅창으로 드래그하세요!</p>
            {/* 프롬프트 추가시 표시하는 조건문 추가 */}
        </div>
    );
}

export default PromptPreview;