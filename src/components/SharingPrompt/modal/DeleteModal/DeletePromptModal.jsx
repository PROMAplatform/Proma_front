import React from 'react';
import styles from './DeletePromptModal.module.css';
import {useSetRecoilState} from "recoil";
import {stateChange} from "../../../../recoil/community/communityRecoilState";
import {B3, H3} from "../../../../styles/font-styles";
import ModalButton from "../../../common/ModalButton";

function DeletePromptModal({close, onDelete, post}) {
    const setStateChange = useSetRecoilState(stateChange);
    function handleDeleteButton() {
        setStateChange(prevValue => prevValue + 1);
        onDelete();
        close();
    }

    function handleClose() {
        close();
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.container}>
                <H3>게시글을 삭제하시겠습니까?</H3>
                <B3>[{post.postTitle}] 게시글이 커뮤니티에서 삭제됩니다.</B3>
                <div className={styles.buttonSection}>
                    <ModalButton title={"취소"} variant={'secondary'} size={'small'} onClick={handleClose}/>
                    <ModalButton title={"삭제"} variant={'primary'} size={'small'} onClick={handleDeleteButton}/>
                </div>
            </div>
        </div>
    );
}

export default DeletePromptModal;
