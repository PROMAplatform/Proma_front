import React from "react";
import styles from "./SelectPromptModal.module.css";
import ShareSection from "./components/ShareSection";
import {ReactComponent as ExitIcon} from "../../../../assets/images/exitIcon.svg";
import {B4, H3} from "../../../../styles/font-styles";

function SelectPromptModal({ close }) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.modalTitle}>
                        <H3>내 프롬프트 리스트</H3>
                    </div>
                    <div className={styles.closeButton}>
                        <ExitIcon onClick={close}/>
                    </div>
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
