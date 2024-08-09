import React, {useState} from "react";
import styles from "./ExpandableButton.module.css";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { myPageState } from "../../../recoil/community/myPageRecoilState";
import { communityPromptListPageState } from "../../../recoil/community/communityRecoilState";

function ExpandableButton({ buttonText }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [, setIsMyPageState] = useRecoilState(myPageState);
    const [, setCurrentPage] = useRecoilState(communityPromptListPageState);

    const handleMouseEnter = () => {
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        setIsExpanded(false);
    };

    const handleMouseLeaveExpanding = () => {
        setIsExpanded(false);
    };

    const handleClick = (type) => {
        setIsMyPageState(type);
        setCurrentPage(0);
    };

    return (
        <>
            <div
                className={styles.container}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className={styles.button}>
                    {buttonText}
                </div>
                <div
                    onMouseLeave={handleMouseLeaveExpanding}
                    className={`${styles.expandableSection} ${isExpanded ? styles.expanded : ''}`}
                >
                    <Link to={`/mypage`} onClick={() => handleClick("like")}>좋아요</Link>
                    <Link to={`/mypage`} onClick={() => handleClick("write")}>작성한글</Link>
                </div>
            </div>
        </>
    );
}

export default ExpandableButton;
