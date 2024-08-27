import React from "react";
import styles from "./SelectPromptModal.module.css";
import ShareSection from "./components/ShareSection";
import { ReactComponent as ExitIcon } from "../../../../../assets/images/exitIcon.svg";
import { B4, H3 } from "../../../../../styles/font-styles";
import { t } from "i18next";
import {useRecoilValue} from "recoil";
import {makePromptListState} from "../../../../../recoil/community/communityRecoilState";

function SelectPromptModal({ close }) {
    const promas = useRecoilValue(makePromptListState);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.modalTitle}>
                        <H3>{t(`community.promptMadeByMe`)}</H3>
                    </div>
                    <div className={styles.closeButton}>
                        <ExitIcon onClick={close} />
                    </div>
                </div>
                <div className={styles.explainContainer}>
                    {promas.length ? (
                        <B4>{t(`community.chooseToShare`)}</B4>
                    ):(
                        ""
                    )}
                </div>
                <div className={styles.listSection}>
                    <ShareSection onClose={close} />
                </div>
            </div>
        </div>
    );
}

export default SelectPromptModal;
