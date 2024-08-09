import React from "react";
import styles from "./PromptDetailModal.module.css";
import MakeBlockPreview from "../components/MakeBlockPreview";
import ButtonSection from "./components/ButtonSection";
import TopSection from "./components/TopSection";
import { B3, H4 } from "../../../../styles/font-styles";
import { useRecoilValue } from "recoil";
import {
    communityPromptDetailState,
    isLoadingCommunityState,
} from "../../../../recoil/community/communityRecoilState";

function PromptDetailModal({ close, post }) {
    const promptBlock = useRecoilValue(communityPromptDetailState);
    const isLoading = useRecoilValue(isLoadingCommunityState);

    console.log(promptBlock);

    const handleClose = () => {
        console.log("닫기");
        close();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.container}>
                <TopSection post={post} onClose={handleClose} />
                <div className={styles.blockSection}>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : promptBlock ? (
                        promptBlock.map((block) => (
                            <MakeBlockPreview
                                key={block.blockId}
                                props={block}
                            />
                        ))
                    ) : (
                        <div>데이터가 없습니다.</div>
                    )}
                </div>
                <div>
                    <H4>게시글 카테고리</H4>
                    <B3>{post.postCategory}</B3>
                </div>
                <div>
                    <H4>프롬프트 설명</H4>
                    <B3>{post.postDescription}</B3>
                </div>
                <div>
                    <H4>프롬프트 미리보기</H4>
                    <B3>{post.promptPreview}</B3>
                </div>
                <ButtonSection onClose={handleClose} postId={post.postId} />
            </div>
        </div>
    );
}

export default PromptDetailModal;
