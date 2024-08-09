import React from "react";
import { useNavigate } from "react-router-dom";
import { H1, B1 } from "../styles/font-styles";
import NavigateButton from "../components/common/NavigateButton";
import styles from "./aboutPage.module.css";
import { useTranslation } from "react-i18next";
import promaAnimation from "../assets/animation/promaAnimation.json";
import Lottie from "react-lottie";

function AboutPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const moveTOCommunity = () => {
        navigate("/community");
    };

    const moveToChatting = () => {
        navigate("/");
    };

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: promaAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className={styles.container}>
            <div className={styles.animationContainer}>
                <Lottie options={defaultOptions} width={700} height={600} />
            </div>
            <div className={styles.contentContainer}>
                <H1>{t(`introduce.introduceOne`)}</H1>
                <B1>{t(`introduce.introduceTwo`)}</B1>
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
