import React from 'react';
import styles from './DeletePromptModal.module.css';
import useModal from "../../../../hooks/useModal";

function DeletePromptModal({isOpen, onClose, onDelete}) {
    function handleDeleteButton() {
        onDelete();
        onClose();
    }

    const { isModalOpen, handleOverlayClick } = useModal(isOpen, onClose);
    if (!isModalOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.container}>
                <div>프로젝트 게시글을 삭제하시겠습니까?</div>
                <div>[프롬프트 이름] 프롬프트가 커뮤니티에서 삭제됩니다. 내 프롬프트에서 ...</div>
                <div>
                    <button onClick={handleOverlayClick}>취소</button>
                    <button onClick={handleDeleteButton}>삭제</button>
                </div>
            </div>
        </div>
    );
}

export default DeletePromptModal;