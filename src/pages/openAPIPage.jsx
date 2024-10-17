import React, { useEffect, useState } from "react";
import SquareButton from "../components/OpenAPI/components/SquareButton";
import styles from "./openAPIPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import PromaAPIInfo from "../components/OpenAPI/OpenAPI/PromaAPIInfo";
import PromaAPIList from "../components/OpenAPI/OpenAPI/PromaAPIList";
import { useRecoilValue } from "recoil";
import { promptListState } from "../recoil/prompt/promptRecoilState";
import PromptDetailTable from "../components/OpenAPI/OpenAPI/PromptDetailTable";

function OpenAPIPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentPrompt, setCurrentPrompt] = useState(null);
    const promptList = useRecoilValue(promptListState);
    const accessToken = location.state?.accessToken ?? null;
    const secretKey = location.state?.secretKey ?? null;
    const promptId = location.state?.promptId ?? null;

    const handleMainClick = () => {
        navigate("/openapi");
    };

    const handleDocsClick = () => {
        navigate("/openapi/docs");
    };

    useEffect(() => {
        if (promptId) {
            setCurrentPrompt(promptList.find((p) => p.promptId === promptId));
        }
    }, [promptId, promptList]);

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                {accessToken && secretKey ? (
                    <>
                        <p className={styles.header}>PROMA API 발급 완료</p>
                        <hr className={styles.line} />
                        <p className={styles.headerContent}>
                            발급한 PROMA API에 대한 내용을 확인하세요!
                        </p>
                    </>
                ) : (
                    <>
                        <p className={styles.header}>PROMA API 목록</p>
                        <hr className={styles.line} />
                        <p className={styles.headerContent}>
                            지금까지 발급한 PROMA API 목록을 전체 조회합니다.
                        </p>
                    </>
                )}
            </div>
            {accessToken && secretKey && currentPrompt ? (
                <div className={styles.contentContainer}>
                    <PromptDetailTable prompt={currentPrompt} />
                    <PromaAPIInfo
                        accessToken={accessToken}
                        secretKey={secretKey}
                    />
                    <div className={styles.buttonContainer}>
                        <SquareButton
                            title="메인으로"
                            variant="primary"
                            onClick={handleMainClick}
                        />
                        <SquareButton
                            title="PROMA API 사용 가이드"
                            variant="secondary"
                            onClick={handleDocsClick}
                        />
                    </div>
                </div>
            ) : (
                <div className={styles.contentContainer}>
                    <PromaAPIList />
                    <div className={styles.buttonContainer}>
                        <SquareButton
                            title="메인으로"
                            variant="primary"
                            onClick={handleMainClick}
                        />
                        <SquareButton
                            title="PROMA API 사용 가이드"
                            variant="secondary"
                            onClick={handleDocsClick}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default OpenAPIPage;
