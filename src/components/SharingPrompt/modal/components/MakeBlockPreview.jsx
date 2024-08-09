import React from "react";
import styles from "./MakeBlockPreview.module.css";

function MakeBlockPreview({ props }) {
    const categoryStyles = {
        화자: styles.speakerCategory,
        청자: styles.listenerCategory,
        지시: styles.instructionCategory,
        형식: styles.formatCategory,
        필수: styles.requiredCategory,
        제외: styles.excludedCategory,
    };

    return (
        <div className={styles.blockSection}>
            {props.blockCategory && (
                <div className={`${categoryStyles[props.blockCategory]}`}>
                    {props.blockCategory}
                </div>
            )}
            <div className={styles.titleSection}>{props.blockTitle}</div>
        </div>
    );
}

export default MakeBlockPreview;
