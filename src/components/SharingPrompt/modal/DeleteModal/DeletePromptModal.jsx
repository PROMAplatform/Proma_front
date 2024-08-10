import React from 'react';
import styles from './DeletePromptModal.module.css';
import {useSetRecoilState} from "recoil";
import {stateChange} from "../../../../recoil/community/communityRecoilState";
import {B3, H3} from "../../../../styles/font-styles";
import ModalButton from "../../../common/ModalButton";
import {t} from "i18next";

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
                <H3>{t(`community.deleteMent`)}</H3>
                <B3>[{post.postTitle}] {t(`community.deleteText`)}</B3>
                <div className={styles.buttonSection}>
                    <ModalButton title={t(`community.cancel`)} variant={'secondary'} size={'small'} onClick={handleClose}/>
                    <ModalButton title={t(`sideBar.delete`)} variant={'primary'} size={'small'} onClick={handleDeleteButton}/>
                </div>
            </div>
        </div>
    );
}

export default DeletePromptModal;
