import React from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo2 } from "../../assets/images/comlogo2.svg";
import { ReactComponent as Logo1 } from "../../assets/images/comlogo1.svg";
import ExpandableButton from "./expandableButton/ExpandableButton";
import { useSetRecoilState } from "recoil";
import { myPageState } from "../../recoil/community/myPageRecoilState";
import { communityPromptListPageState } from "../../recoil/community/communityRecoilState";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

function Header() {
    const setMyPageState = useSetRecoilState(myPageState);
    const setCurrentPage = useSetRecoilState(communityPromptListPageState);
    const userName = localStorage.getItem("userName");
    const navigate = useNavigate();

    const useResetMyPageState = () => {
        setMyPageState(""); // 초기값으로 설정
        setCurrentPage(0);
    };
    const { i18n } = useTranslation();
    let language = localStorage.getItem("language") || "en"; // 기본값을 'en'으로 설정

    const languageStyle = (lng) => ({
        color: language === lng ? "red" : "inherit",
        cursor: "pointer",
    });

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng).then(() => {
            // 언어 변경이 완료된 후 페이지 새로고침
            window.location.reload();
        });
    };

    const handleLogin = () => {
        navigate("/login");
    };
    const handleLogoClick = () => {
        navigate("/");
    };
    return (
        <div className={styles.headerContainer}>
            <div className={styles.logoContainer} onClick={handleLogoClick}>
                <Logo1 />
                <Logo2 />
            </div>
            <div className={styles.navContainer}>
                <p
                    style={languageStyle("ko")}
                    onClick={() => changeLanguage("ko")}
                >
                    한국어
                </p>
                <p> / </p>
                <p
                    style={languageStyle("en")}
                    onClick={() => changeLanguage("en")}
                >
                    English
                </p>

                {userName ? (
                    <p>
                        {userName}
                        {t(`header.welcomeComment`)}
                    </p>
                ) : null}
                <div className={styles.buttonClick}>
                    <Link to={"/"}> {t(`header.introduce`)}</Link>
                </div>
                <div className={styles.buttonClick}>
                    <Link to={"/community"} onClick={useResetMyPageState}>
                        {t(`header.community`)}
                    </Link>
                </div>
                <div className={styles.buttonClick}>
                    <Link to={"/main"}>{t(`header.chatting`)}</Link>
                </div>
                {userName ? (
                    <div className={styles.buttonClick}>
                        <ExpandableButton buttonText={t(`header.mypage`)} />
                    </div>
                ) : (
                    <p
                        onClick={handleLogin}
                        style={{ color: "blue", cursor: "pointer" }}
                    >
                        {t(`header.login`)}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Header;
