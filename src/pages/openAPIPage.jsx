import React from "react";
import SquareButton from "../components/OpenAPI/SquareButton";
import styles from "./openAPIPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import OpenAPIInfo from "../components/OpenAPI/OpenAPIInfo";
import UseGuide from "../components/OpenAPI/UseGuide";
import OpenAPIList from "../components/OpenAPI/OpenAPIList";
import APISpecification from "../components/OpenAPI/OpenAPIDocs/APISpecification";
import { H3 } from "../styles/font-styles";

function OpenAPIPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const accessToken = location.state?.accessToken ?? null;
    const secretKey = location.state?.secretKey ?? null;

    const handleMainClick = () => {
        navigate("/openapi");
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {accessToken && secretKey ? (
                    <H3>PROMA API 발급 완료</H3>
                ) : (
                    <H3>PROMA API 목록</H3>
                )}
            </div>
            {accessToken && secretKey ? (
                <div className={styles.contentContainer}>
                    <p>
                        PROMA API 키가 발급되었습니다! 아래의 사용 안내를
                        참고해주세요.
                    </p>
                    <OpenAPIInfo
                        accessToken={accessToken}
                        secretKey={secretKey}
                    />
                    <UseGuide />
                    <APISpecification />
                    <SquareButton
                        title="메인으로"
                        variant="primary"
                        onClick={handleMainClick}
                    />
                </div>
            ) : (
                <div className={styles.contentContainer}>
                    <p>현재까지 발급한 PROMA API 키에 대한 정보입니다.</p>
                    <OpenAPIList />
                    <UseGuide />
                    <APISpecification />
                    <SquareButton
                        title="메인으로"
                        variant="primary"
                        onClick={handleMainClick}
                    />
                </div>
            )}
        </div>
    );
}

export default OpenAPIPage;
