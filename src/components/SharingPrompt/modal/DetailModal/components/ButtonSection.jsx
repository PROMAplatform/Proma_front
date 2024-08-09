import React from "react";
import styles from "./ButtonSection.module.css";
import DeletePromptModal from "../../DeleteModal/DeletePromptModal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { myPageState } from "../../../../../recoil/community/myPageRecoilState";
import PostFixOrShare from "../../FixAndShareModal/PostFixOrShare";
import { useModalStack } from "../../../../../hooks/useModalStack";
import { useCommunityHooks } from "../../../../../api/community/community";
import { useMyPageHooks } from "../../../../../api/community/myPage";
import { stateChange } from "../../../../../recoil/community/communityRecoilState";

function ButtonSection({ postId, onClose }) {
    const isMyPageState = useRecoilValue(myPageState);
    const setStateChange = useSetRecoilState(stateChange);
    const modalStack = useModalStack();
    const { scrapPrompt } = useCommunityHooks();
    const { deleteSharePost, fixSharePost } = useMyPageHooks();

    const handleDeleteModal = () => {
        modalStack.push({
            key: "promptDeleteModal",
            Component: DeletePromptModal,
            componentProps: { onDelete: handleDelete },
            backdropTransparent: true,
        });
    };

    const handleEditModal = () => {
        modalStack.push({
            key: "promptFixOrShareModal",
            Component: PostFixOrShare,
            componentProps: { onApi: handleFix, state: "fix" },
            backdropTransparent: true,
        });
    };

    function handleScrap() {
        scrapPrompt(postId);
        setStateChange((prevValue) => prevValue + 1);

        onClose();
        console.log("프로젝트 게시글 스크랩 : ", postId);
    }

    function handleDelete() {
        deleteSharePost(postId);
        setStateChange((prevValue) => prevValue + 1);

        onClose();
        console.log("프로젝트 게시글 삭제 : ", postId);
    }

    function handleFix(data) {
        fixSharePost(postId, data);
        setStateChange((prevValue) => prevValue + 1);

        console.log({
            postTitle: data.title,
            postDescription: data.description,
            post_category: data.category,
        });

        onClose();
        console.log("프로젝트 게시글 수정 : ", postId);
    }

    return (
        <div>
            {isMyPageState === "write" && (
                <div className={styles.buttonSection}>
                    <button onClick={handleEditModal}>수정하기</button>
                    <button onClick={handleDeleteModal}>삭제하기</button>
                </div>
            )}
            {(isMyPageState === "" || isMyPageState === "like") && (
                <button onClick={handleScrap}>스크랩하기</button>
            )}
        </div>
    );
}

export default ButtonSection;
