import React from 'react';
import styles from "./ButtonSection.module.css";
import DeletePromptModal from "../../DeleteModal/DeletePromptModal";
import {useRecoilState, useRecoilValue} from "recoil";
import {myPageState} from "../../../../../recoil/community/myPageRecoilState";
import PostFixOrShare from "../../FixAndShareModal/PostFixOrShare";
import {useModalStack} from "../../../../../hooks/useModalStack";
import {useCommunityHooks} from "../../../../../api/community/community";
import {useMyPageHooks} from "../../../../../api/community/myPage";
import {stateChange} from "../../../../../recoil/community/communityRecoilState";
import ModalButton from "../../../../common/ModalButton";

function ButtonSection({post, onClose}) {
    const isMyPageState = useRecoilValue(myPageState);
    const [,setStateChange] = useRecoilState(stateChange);
    const modalStack = useModalStack();
    const {scrapPrompt} = useCommunityHooks();
    const {deleteSharePost, fixSharePost} = useMyPageHooks();

    const handleDeleteModal = () => {
        modalStack.push({
            key: 'promptDeleteModal',
            Component: DeletePromptModal,
            componentProps: { onDelete : handleDelete, post : post },
            backdropTransparent: true,
        });
    };

    const handleEditModal = () => {
        modalStack.push({
            key: 'promptFixOrShareModal',
            Component: PostFixOrShare,
            componentProps: { onApi : handleFix ,state : "fix"},
            backdropTransparent: true,
        });
    };

    function handleScrap() {
        scrapPrompt(post.postId);
        setStateChange(prevValue => prevValue + 1);

        onClose();
        console.log("프로젝트 게시글 스크랩 : ", post.postId);
    }

    function handleDelete() {
        deleteSharePost(post.postId);
        setStateChange(prevValue => prevValue + 1);

        onClose();
        console.log("프로젝트 게시글 삭제 : ", post.postId);
    }

    function handleFix(data) {
        fixSharePost(post.postId, data);
        setStateChange(prevValue => prevValue + 1);

        console.log({
            "postTitle" : data.title,
            "postDescription" : data.description,
            "post_category" : data.category,
        });

        onClose();
        console.log("프로젝트 게시글 수정 : ", post.postId);
    }

    return (
        <div className={styles.buttonLocation}>
            {isMyPageState === "write" &&
                <div className={styles.buttonSection}>
                    <ModalButton title={"수정하기"} variant={'primary'} onClick={handleEditModal}/>
                    <ModalButton title={"삭제하기"} variant={'secondary'} onClick={handleDeleteModal}/>
                </div>
            }
            {(isMyPageState === "" || isMyPageState === "like") &&
                <ModalButton title={"스크랩하기"} variant={'primary'} onClick={handleScrap}/>
            }
        </div>
    );
}

export default ButtonSection;