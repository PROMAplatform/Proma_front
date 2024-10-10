import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigateButton from "../components/common/NavigateButton";
import styles from "./aboutPage.module.css";
import { useTranslation } from "react-i18next";
import promaAnimation from "../assets/animation/promaAnimation.json";
import Lottie from "react-lottie";

function AboutPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const moveTOCommunity = () => {
        navigate("/community");
    };

    const moveToChatting = () => {
        navigate("/main");
    };

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: promaAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const animationSize = windowWidth <= 768 ? 300 : 450;

    return (
        <div className={styles.container}>
            <div className={styles.animationContainer}>
                <Lottie
                    options={defaultOptions}
                    width={animationSize}
                    height={animationSize}
                />
            </div>
            <div className={styles.contentContainer}>
                <h1>{t(`introduce.introduceOne`)}</h1>
                <p>{t(`introduce.introduceTwo`)}</p>
                <div className={styles.buttonContainer}>
                    <NavigateButton
                        title="community"
                        variant="primary"
                        onClick={moveTOCommunity}
                    />
                    <NavigateButton
                        title="chatting"
                        variant="secondary"
                        onClick={moveToChatting}
                    />
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
