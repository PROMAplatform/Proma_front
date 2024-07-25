import React from 'react';
import styles from './SelectPromptModal.module.css'
import ShareSection from "./components/ShareSection";
import useModal from "../../../../hooks/useModal";

function SelectPromptModal({isOpen, onClose}) {
    const { isModalOpen, handleOverlayClick } = useModal(isOpen, onClose);
    if (!isModalOpen) return null; // 훅에서 반환된 isModalOpen 사용

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.container}>
                <div className={styles.titleContainer}>내 프롬프트 리스트</div>
                <button onClick={onClose}>닫기</button>
                <div className={styles.explainContainer}>공유할 프롬프트를 선택하세요.</div>
                <ShareSection onClose={onClose}/>
            </div>
        </div>
    );
}

export default SelectPromptModal;