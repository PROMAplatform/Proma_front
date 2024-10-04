import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo2 } from "../../assets/images/comlogo2.svg";
import { ReactComponent as Logo1 } from "../../assets/images/comlogo1.svg";
import ExpandableButton from "./expandableButton/ExpandableButton";
import { useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { Home, Users, MessageSquare, LogIn, Menu } from "lucide-react";
import { myPageState } from "../../recoil/community/myPageRecoilState";
import { communityPromptListPageState } from "../../recoil/community/communityRecoilState";
import styles from "./Header.module.css";
import koreaFlag from "../../assets/images/koreaFlag.jpg";
import usaFlag from "../../assets/images/usaFlag.svg";

function Header() {
    const setMyPageState = useSetRecoilState(myPageState);
    const setCurrentPage = useSetRecoilState(communityPromptListPageState);
    const userName = localStorage.getItem("userName");
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [menuOpen, setMenuOpen] = useState(false);
    const [language, setLanguage] = useState(i18n.language);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const useResetMyPageState = () => {
        setMyPageState("");
        setCurrentPage(0);
    };

    const toggleLanguage = () => {
        const newLang = language === 'ko' ? 'en' : 'ko';
        setLanguage(newLang);
        i18n.changeLanguage(newLang).then(() => {
            window.location.reload();
        });
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogoClick = () => {
        navigate("/");
    };

    const showText = windowWidth > 640;
    const isMobile = windowWidth <= 480;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const NavItems = () => (
        <>
            <Link to="/" className={styles.navItem}>
                <Home size={20} />
                {showText && <span>{t(`header.introduce`)}</span>}
            </Link>
            <Link to="/main" className={styles.navItem}>
                <MessageSquare size={20} />
                {showText && <span>{t(`header.chatting`)}</span>}
            </Link>
            <Link to="/community" className={styles.navItem} onClick={useResetMyPageState}>
                <Users size={20} />
                {showText && <span>{t(`header.community`)}</span>}
            </Link>
            {userName ? (
                <div className={styles.navItem}>
                    {showText && <ExpandableButton buttonText={t(`header.mypage`)} />}
                </div>
            ) : (
                <div className={styles.navItem} onClick={handleLogin}>
                    <LogIn size={20} />
                    {showText && <span>{t(`header.login`)}</span>}
                </div>
            )}
        </>
    );

    const LanguageSelector = () => (
        <div className={styles.languageSelector}>
            <img 
                src={language === 'ko' ? koreaFlag : usaFlag} 
                alt={language === 'ko' ? "Korean flag" : "USA flag"}
                className={styles.flagImage}
            />
            <label className={styles.switch}>
                <input 
                    type="checkbox" 
                    checked={language === 'en'}
                    onChange={toggleLanguage}
                />
                <span className={styles.slider}></span>
            </label>
        </div>
    );

    return (
        <div className={styles.headerContainer}>
            <div
                className={`${styles.logoContainer} ${isMobile ? styles.centerLogo : ""}`}
                onClick={handleLogoClick}
            >
                <Logo1 />
                <Logo2 />
            </div>

            {isMobile ? (
                <>
                    <button className={styles.menuButton} onClick={toggleMenu}>
                        <Menu size={24} />
                    </button>
                    {menuOpen && (
                        <div className={styles.mobileMenu}>
                            <NavItems />
                            <LanguageSelector />
                        </div>
                    )}
                </>
            ) : (
                <div className={styles.navContainer}>
                    <LanguageSelector />
                    {userName && showText && (
                        <p className={styles.welcomeMessage}>
                            {userName}
                            {t(`header.welcomeComment`)}
                        </p>
                    )}
                    <NavItems />
                </div>
            )}
        </div>
    );
}

export default Header;
