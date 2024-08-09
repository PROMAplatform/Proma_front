import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as Logo2 } from "../../assets/images/comlogo2.svg";
import { ReactComponent as Logo1 } from "../../assets/images/comlogo1.svg";
import ExpandableButton from "./expandableButton/ExpandableButton";
import { useSetRecoilState } from "recoil";
import { myPageState } from "../../recoil/community/myPageRecoilState";
import { communityPromptListPageState } from "../../recoil/community/communityRecoilState";

function Header() {
    const setMyPageState = useSetRecoilState(myPageState);
    const setCurrentPage = useSetRecoilState(communityPromptListPageState);
    const userName = localStorage.getItem("userName");
    const useResetMyPageState = () => {
        setMyPageState(""); // 초기값으로 설정
        setCurrentPage(0);
    };

    return (
        <div className={styles.headerContainer}>
            <div className={styles.logoContainer}>
                <Logo1 />
                <Logo2 />
            </div>
            <div className={styles.navContainer}>
                {userName ? <p>{userName} 님 반값습니다!</p> : null}
                <div className={styles.buttonClick}>
                    <Link to={"/about"}>소개</Link>
                </div>
                <div className={styles.buttonClick}>
                    <Link to={"/community"} onClick={useResetMyPageState}>
                        커뮤니티
                    </Link>
                </div>
                <div className={styles.buttonClick}>
                    <Link to={"/"}>채팅</Link>
                </div>
                <div className={styles.buttonClick}>
                    <ExpandableButton buttonText="마이페이지" />
                </div>
            </div>
        </div>
    );
}

export default Header;
