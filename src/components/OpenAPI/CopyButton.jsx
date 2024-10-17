import React, { useState } from "react";
import styles from "./CopyButton.module.css";

function CopyButton({ category, text }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                setCopied(true);
                alert(`${category}가 복사되었습니다!`);
            })
            .catch((err) => console.errer("Failed to copy"));
    };
    return (
        <button className={styles.buttonContainer} onClick={handleCopy}>
            복사
        </button>
    );
}

export default CopyButton;
