import React from "react";
import { useRecoilValue } from "recoil";
import {
  categoryColorsState,
  refinedPromptPartsState,
} from "../../recoil/prompt/promptRecoilState";
import styles from "./FinalPromptArea.module.css";
const FinalPromptArea = () => {
  const refinedPromptParts = useRecoilValue(refinedPromptPartsState);
  const categoryColors = useRecoilValue(categoryColorsState);

  return (
    <div className={styles.resultArea}>
      <h3 className={styles.resultTitle}>최종 프롬프트</h3>
      <div className={styles.resultContent}>
        {Object.entries(refinedPromptParts).map(
          ([category, text]) =>
            text && (
              <span
                key={category}
                style={{
                  border: `1px solid ${categoryColors[category]}`,
                  marginBottom: "5px",
                }}
              >
                {text}
              </span>
            )
        )}
      </div>
    </div>
  );
};

export default FinalPromptArea;
