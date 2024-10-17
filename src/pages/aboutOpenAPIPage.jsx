import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./aboutOpenAPIPage.module.css";
import logIcon from "../assets/images/logIcon.svg";
import codeIcon from "../assets/images/codeIcon.svg";
import SquareButton from "../components/OpenAPI/components/SquareButton";
import PromptListModal from "../components/OpenAPI/OpenAPI/modal/PromptListModal";
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

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <p className={styles.header}>PROMA API 소개</p>
                <hr className={styles.line} />
                <p className={styles.headerContent}>
                    PROMA에서 제공하는 OPEN API, PROMA API를 소개합니다.
                </p>
            </div>
            <div className={styles.bodyContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.shortContainer}>
                        <p className={styles.contentTitle}>
                            AI 활용, PROMA로 간편하게 시작하세요
                        </p>
                        <hr className={styles.linkBlack} />
                        <p className={styles.content}>
                            AI 개발자 없이도, 사전 준비 없이도. PROMA는 간편한
                            API 키 발급으로 귀사의 AI 활용을 시작할 수 있도록
                            돕습니다. 시간을 절약하고, 효율은 높이고! 이제
                            비즈니스 혁신을 한층 더 가볍게 경험하세요!
                        </p>
                    </div>
                    <div className={styles.shortContainer}>
                        <div className={styles.contentSubTitle}>
                            <img src={codeIcon} alt="code icon" />
                            복잡한 절차 없이 손쉽게 AI 활용 가능
                        </div>
                        <p className={styles.content}>
                            직접 만든 프롬프트로 PROMA API 발급을 통해 손쉽게
                            AI를 사용할 수 있습니다. 챗봇을 만들기 위해서는
                            다양한 플로우와 설정, 그리고 복잡한 절차가
                            필요하지만 PROMA에서는 해당 절차를 훨씬 간소화한
                            절차를 제공합니다. 이는 AI 개발자 없이, 외주 없이
                            간편하게 AI를 활용할 수 있게합니다. 따라서 기업의
                            개발자 고용 비용은 낮추고 AI 활용도는 높이는 경험을
                            할 수 있습니다.
                        </p>
                    </div>
                    <div className={styles.shortContainer}>
                        <div className={styles.contentSubTitle}>
                            <img src={logIcon} alt="log icon" />
                            사용 로그를 손쉽게 확인하고 관리
                        </div>
                        <p className={styles.content}>
                            귀사에서 발급한 PROMA API에 대한 사용 로그를 손쉽게
                            확인하고 관리할 수 있도록 해당 로그를 채팅방의
                            형태로 제공합니다. 사용자의 아이디를 이름으로 가지는
                            채팅방이 생성되며 그곳에서 실시간으로 사용자들의
                            사용 기록을 살펴볼 수 있습니다.
                        </p>
                    </div>
                    <div className={styles.buttonContainer}>
                        <p className={styles.contentTitle}>
                            지금 바로 PROMA API를 만나보세요
                        </p>
                        <div className={styles.buttonList}>
                            <SquareButton
                                title="API 키 발급"
                                onClick={openModal}
                                variant="primary"
                            />
                            <SquareButton
                                title="내 API 목록"
                                onClick={() => navigate("/openapi/list")}
                                variant="primary"
                            />
                            <SquareButton
                                title="PROMA API 사용 가이드"
                                onClick={() => navigate("/openapi/docs")}
                                variant="secondary"
                            />
                        </div>
                    </div>
                </div>
                <PromptListModal isOpen={isOpenModel} onClose={closeModal} />
            </div>
        </div>
    );
}

export default AboutOpenAPIPage;
