import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { 
    User, 
    ChevronDown, 
    ThumbsUp, 
    PenTool, 
    LogOut 
} from "lucide-react";
import { myPageState } from "../../../recoil/community/myPageRecoilState";
import { communityPromptListPageState } from "../../../recoil/community/communityRecoilState";
import styles from "./ExpandableButton.module.css";

function ExpandableButton({ buttonText }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();
    const setMyPageState = useSetRecoilState(myPageState);
    const setCurrentPage = useSetRecoilState(communityPromptListPageState);
    const { t } = useTranslation();

    const handleMouseEnter = useCallback(() => {
        setIsExpanded(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsExpanded(false);
    }, []);

    const handleClick = useCallback((type) => {
        setMyPageState(type);
        setCurrentPage(0);
    }, [setMyPageState, setCurrentPage]);

    const handleLogout = useCallback(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userName");
        navigate("/login");
    }, [navigate]);

    return (
        <div
            className={styles.container}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className={styles.button} aria-haspopup="true" aria-expanded={isExpanded}>
                <User size={18} />
                {buttonText}
                <ChevronDown size={18} className={isExpanded ? styles.rotated : ''} />
            </button>
            {isExpanded && (
                <div className={styles.expandableSection} role="menu">
                    <Link to="/mypage" onClick={() => handleClick("like")} role="menuitem" className={styles.menuItem}>
                        <ThumbsUp size={18} />
                        {t("header.isLike")}
                    </Link>
                    <Link to="/mypage" onClick={() => handleClick("write")} role="menuitem" className={styles.menuItem}>
                        <PenTool size={18} />
                        {t("header.writtenByYou")}
                    </Link>
                    <button onClick={handleLogout} className={`${styles.menuItem} ${styles.logoutButton}`} role="menuitem">
                        <LogOut size={18} />
                        {t("header.logout")}
                    </button>
                </div>
            )}
        </div>
    );
}

export default React.memo(ExpandableButton);
