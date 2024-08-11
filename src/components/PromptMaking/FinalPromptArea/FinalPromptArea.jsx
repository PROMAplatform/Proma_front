import React from "react";
import styles from "./FinalPromptArea.module.css";
import { H4 } from "../../../styles/font-styles";
import RefinedPromptText from "./RefinedPromptText";
import { t } from "i18next";
// import { useRecoilValue } from "recoil";
// import { refinedPromptPartsState } from "../../../recoil/prompt/promptRecoilState";

const FinalPromptArea = () => {
    // const refinedPromptParts = useRecoilValue(refinedPromptPartsState);
    // // function handlePromptTrim() {
    // //     console.log("프롬프트 다듬기 클릭", refinedPromptParts);
    // // }

    return (
        <div className={styles.resultArea} data-tour="promptPreview">
            <H4>{t(`promptMaking.promptPreView`)}</H4>
            <RefinedPromptText />
            {/* <button className={styles.refreshButton} onClick={handlePromptTrim}>
                <H7>{t(`promptMaking.trimPrompt`)}</H7>
            </button> */}
        </div>
    );
};

export default FinalPromptArea;
