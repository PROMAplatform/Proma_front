import React, { useState, useMemo } from "react";
import styles from "./ExpandableButton.module.css";
import { Link } from "react-router-dom";

function ExpandableButton({ buttonText }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={toggleExpand}>
                {buttonText}
            </button>
            <div className={`${styles.expandableSection} ${isExpanded ? styles.expanded : ''}`}>
                <Link to={`/mypage?data=like`}>좋아요</Link>
                <Link to={`/mypage?data=write`}>작성한글</Link>
            </div>
        </div>
    );
}

export default ExpandableButton;
