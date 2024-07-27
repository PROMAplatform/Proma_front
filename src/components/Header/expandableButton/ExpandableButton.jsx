import React, { useState } from "react";
import styles from "./ExpandableButton.module.css";
import { Link } from "react-router-dom";
import {useRecoilState} from "recoil";
import {myPageState} from "../../../recoil/community/myPageRecoilState";

function ExpandableButton({ buttonText }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [,setIsMyPageState] = useRecoilState(myPageState);

    const handleMouseEnter = () => {
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        setIsExpanded(false);
    };

    const handleClick = (type) => {
        setIsMyPageState(type);
    };

    return (
        <div
            className={styles.container}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className={styles.button}>
                {buttonText}
            </button>
            <div className={`${styles.expandableSection} ${isExpanded ? styles.expanded : ''}`}>
                <Link to={`/mypage`} onClick={() => handleClick("like")}>좋아요</Link>
                <Link to={`/mypage`} onClick={() => handleClick("write")}>작성한글</Link>
            </div>
        </div>
    );
}

export default ExpandableButton;
