import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./aboutOpenAPIPage.module.css";
import { H2 } from "../styles/font-styles";
import { B4 } from "../styles/font-styles";
import promaAnimation from "../assets/animation/promaAnimation.json";
import SquareButton from "../components/OpenAPI/SquareButton";
import PromptListModal from "../components/OpenAPI/PromptListModal";
import Lottie from "react-lottie";

function AboutOpenAPIPage() {
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const openModal = () => {
        setIsOpenModel(true);
    };

    const closeModal = () => {
        setIsOpenModel(false);
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
            <div className={styles.contentContainer}>
                <H2>AI 활용, PROMA로 간편하게 시작하세요</H2>
                <B4>
                    AI 개발자 없이도, 사전 준비 없이도. PROMA는 간편한 API 키
                    발급으로 귀사의 AI 활용을 시작할 수 있도록 돕습니다. 시간을
                    절약하고, 효율은 높이고! 이제 비즈니스 혁신을 한층 더 가볍게
                    경험하세요!
                </B4>
                <div className={styles.buttonContainer}>
                    <SquareButton
                        title="API 키 발급하기"
                        onClick={openModal}
                        variant="primary"
                    />
                    <SquareButton
                        title="내 API 목록"
                        onClick={() => navigate("/openapi/list")}
                        variant="secondary"
                    />
                </div>
            </div>
            <div className={styles.animationContainer}>
                <Lottie
                    options={defaultOptions}
                    width={animationSize}
                    height={animationSize}
                />
            </div>
            <PromptListModal isOpen={isOpenModel} onClose={closeModal} />
        </div>
    );
}

export default AboutOpenAPIPage;
