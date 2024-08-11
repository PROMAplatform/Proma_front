import React from "react";
import { B5 } from "../../../styles/font-styles";
import { useRecoilValue } from "recoil";
import {
    categoryColorsState,
    refinedPromptPartsState,
} from "../../../recoil/prompt/promptRecoilState";
import styles from "./FinalPromptArea.module.css";
const RefinedPromptText = () => {
    const refinedPromptParts = useRecoilValue(refinedPromptPartsState);
    const categoryColors = useRecoilValue(categoryColorsState);

    const combinedText = Object.entries(refinedPromptParts)
        .filter(([category, text]) => text)
        .map(([category, text]) => (
            <>
                <p
                    key={category}
                    style={{
                        display: "block",
                        borderBottom: `2px solid ${categoryColors[category]}`,
                        lineHeight: "130%",
                        wordBreak: "break-all",
                    }}
                >
                    {category} : {text}
                </p>
            </>
        ));

    return (
        <div className={styles.resultContent}>
            <B5 color="black">{combinedText}</B5>
        </div>
    );
};

export default RefinedPromptText;
