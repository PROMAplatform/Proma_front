import React from 'react';
import styles from './PromptDetailModal.module.css'
import useModal from "../../../../hooks/useModal";
import MakeBlockPreview from "../components/MakeBlockPreview";
import ButtonSection from "./components/ButtonSection";

function PromptDetailModal({promptId, prompt, isOpen, onClose}) {

    const promptBlock = [
        {
            blockId: 1,
            blockTitle: "선생님",
            blockCategory: "화자"
        },
        {
            blockId: 2,
            blockTitle: "박민기",
            blockCategory: "청자"
        },
    ];

    const { isModalOpen, handleOverlayClick } = useModal(isOpen, onClose);
    if (!isModalOpen) return null;


    //ToDo - 좋아요 버튼 구현
    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div>
                        {prompt.promptType} {prompt.postTitle} {prompt.userName} {prompt.likeCount}
                    </div>
                    <button onClick={onClose}>닫기</button>
                </div>
                <div className={styles.blockSection}>
                    {promptBlock.map((block) => (
                        <MakeBlockPreview key={block.blockId} props={block}/>))}
                </div>
                <div>
                    <h4>프롬프트 카테고리</h4>
                    <b3>{prompt.prompt_category}</b3>
                </div>
                <div>
                    <h4>프롬프트 설명</h4>
                    <b3>{prompt.postDescription}</b3>
                </div>
                <div>
                    <h4>프롬프트 미리보기</h4>
                    <b3>{prompt.promptPreview}</b3>
                </div>
                <ButtonSection onClose={onClose}/>
            </div>
        </div>
    );
}

export default PromptDetailModal;