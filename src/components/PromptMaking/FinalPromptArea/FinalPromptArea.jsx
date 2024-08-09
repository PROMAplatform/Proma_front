import React from "react";
import styles from "./FinalPromptArea.module.css";
import { H4, H7 } from "../../../styles/font-styles";
import RefinedPromptText from "./RefinedPromptText";
import { t } from "i18next";
const FinalPromptArea = () => {
    //TODO- 프롬프트 다듬기 LLM 으로 변환
    //TODO- 태우네 서버 LLM 통신 로딩 Recoil 추가, Axios 추가 생성
    function handlePromptTrim() {
        console.log("프롬프트 다듬기 클릭");
    }
    return (
        <div className={styles.resultArea}>
            <H4>{t(`promptMaking.promptPreView`)}</H4>
            <RefinedPromptText />
            <button className={styles.refreshButton} onClick={handlePromptTrim}>
                <H7>{t(`promptMaking.trimPrompt`)}</H7>
            </button>
        </div>
    );
};

export default FinalPromptArea;
