import React from 'react';
import styles from './PromptDetailModal.module.css'
import MakeBlockPreview from "../components/MakeBlockPreview";
import ButtonSection from "./components/ButtonSection";
import TopSection from "./components/TopSection";
import {B3, H4} from "../../../../styles/font-styles";
import {useRecoilValue} from "recoil";
import {communityPromptDetailState, isLoadingCommunityState} from "../../../../recoil/community/communityRecoilState";
import {categoryBlockShapesState} from "../../../../recoil/prompt/promptRecoilState";

function PromptDetailModal({close, post}) {
    const promptBlock = useRecoilValue(communityPromptDetailState);
    const isLoading = useRecoilValue(isLoadingCommunityState);
    const categoryBlockShapesArray = useRecoilValue(categoryBlockShapesState);
    const predefinedColors = [
        "var(--block-main-color)",
        "var(--block-purple)",
        "var(--block-pink)",
        "var(--block-red)",
        "var(--block-orange)",
        "var(--block-green)",
        "var(--blokc-blue)"
    ];

    const categoryStyles = {};
    const categories = [...new Set(promptBlock.map(block => block.blockCategory))];

    categories.forEach((category, index) => {
        categoryStyles[category] = {
            color: predefinedColors[index % predefinedColors.length],
            shape: categoryBlockShapesArray[index % categoryBlockShapesArray.length][1]
        };
    });

    console.log(promptBlock);
    console.log(categoryStyles);

    const handleClose = () => {
        console.log("닫기");
        close();
    };

    return (
        <div className={styles.modalOverlay} >
            <div className={styles.container}>
                <TopSection post={post} onClose={handleClose}/>
                <div className={styles.blockSection}>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : promptBlock ? (
                        promptBlock.map((block) => (
                            <MakeBlockPreview categoryStyles={categoryStyles} block={block} key={block.blockId} size={"medium"}/>
                        ))
                    ) : (
                        <div>데이터가 없습니다.</div>
                    )}
                </div>
                <div className={styles.textSection}>
                    <div className={styles.categorySection}>
                        <H4>게시글 카테고리</H4>
                        <B3>{post.postCategory}</B3>
                    </div>
                    <div className={styles.explainSection}>
                        <H4>프롬프트 설명</H4>
                        <B3>{post.postDescription}</B3>
                    </div>
                    <div className={styles.previewSection}>
                        <H4>프롬프트 미리보기</H4>
                        <B3>{post.promptPreview}</B3>
                    </div>
                </div>
                <ButtonSection onClose={handleClose} post={post}/>
            </div>
        </div>
    );
}

export default PromptDetailModal;