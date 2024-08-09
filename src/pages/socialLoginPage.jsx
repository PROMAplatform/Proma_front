import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginLogo from "../assets/logos/loginLogo.png";
import socialLoginLogo from "../assets/images/socialLogin.png";
import kakaoSocialLogin from "../assets/images/kakaoSocialLogin.png";
import googleSocialLogin from "../assets/images/googleSocialLogin.png";
import naverSocialLogin from "../assets/images/naverSocialLogin.png";
import styles from "./socialLoginPage.module.css";
function SocialLoginPage() {
    const navigate = useNavigate();
    const defaultURL = process.env.REACT_APP_BACKEND_SERVER_URL;

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.type === "SOCIAL_LOGIN_SUCCESS") {
                // 토큰 저장
                localStorage.setItem(
                    "accessToken",
                    event.data.data.accessToken,
                );
                localStorage.setItem(
                    "refreshToken",
                    event.data.data.refreshToken,
                );

                // 메인 페이지로 이동
                navigate("/");
            } else if (event.data.type === "SOCIAL_LOGIN_ERROR") {
                console.error("소셜 로그인 실패:", event.data.error);
                // 에러 처리 (예: 사용자에게 에러 메시지 표시)
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [navigate]);

    const handleSocialLogin = (provider) => {
        const width = 500;
        const height = 600;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        window.open(
            `${defaultURL}/oauth2/authorization/${provider}`,
            "SocialLogin",
            `width=${width},height=${height},left=${left},top=${top}`,
        );
    };

    return (
        <div className={styles.container}>
            <img className={styles.logo} alt="로그인 로고" src={loginLogo} />
            <img alt="소셜 로그인" src={socialLoginLogo} />
            <img
                className={styles.login}
                alt="구글 로그인"
                src={googleSocialLogin}
                onClick={() => handleSocialLogin("google")}
            />
            <img
                className={styles.login}
                alt="카카오 로그인"
                src={kakaoSocialLogin}
                onClick={() => handleSocialLogin("kakao")}
            />

            <img
                className={styles.login}
                alt="네이버 로그인"
                src={naverSocialLogin}
                onClick={() => handleSocialLogin("naver")}
            />
        </div>
    );
}

export default SocialLoginPage;
