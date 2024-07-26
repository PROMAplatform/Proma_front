import React from 'react';
import styles from './PromptDetailModal.module.css'
import useModal from "../../../../hooks/useModal";
import MakeBlockPreview from "../components/MakeBlockPreview";
import ButtonSection from "./components/ButtonSection";
import TopSection from "./components/TopSection";

function PromptDetailModal({postId, post, isOpen, onClose}) {

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

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.container}>
                <TopSection post={post} onClose={onClose}/>
                <div className={styles.blockSection}>
                    {promptBlock.map((block) => (
                        <MakeBlockPreview key={block.blockId} props={block}/>))}
                </div>
                <div>
                    <h4>프롬프트 카테고리</h4>
                    <b3>{post.prompt_category}</b3>
                </div>
                <div>
                    <h4>프롬프트 설명</h4>
                    <b3>{post.postDescription}</b3>
                </div>
                <div>
                    <h4>프롬프트 미리보기</h4>
                    <b3>{post.promptPreview}</b3>
                </div>
                <ButtonSection onClose={onClose} postId={postId}/>
            </div>
        </div>
    );
}

export default PromptDetailModal;