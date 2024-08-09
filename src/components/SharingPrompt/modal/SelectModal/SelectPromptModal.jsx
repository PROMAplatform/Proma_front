import React from "react";
import styles from "./SelectPromptModal.module.css";
import ShareSection from "./components/ShareSection";
import { B4, H3 } from "../../../../styles/font-styles";

function SelectPromptModal({ close }) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <H3>내 프롬프트 리스트</H3>
                    <button onClick={close}>닫기</button>
                </div>
                <div className={styles.explainContainer}>
                    <B4>공유할 프롬프트를 선택하세요.</B4>
                </div>
                <div className={styles.listSection}>
                    <ShareSection onClose={close} />
                </div>
            </div>
        </div>
    );
}

export default SelectPromptModal;
