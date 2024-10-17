import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import handleSocialAuth from "../../util/handleSocialLoginAuth";
import styles from "./socialLoginPageAfter.module.css";
function SocialLoginPageAfter() {
    const { provider } = useParams();

    useEffect(() => {
        const currentUrl = window.location.href;
        const searchParams = new URL(currentUrl).searchParams;
        console.log("Current URL:", currentUrl);
        console.log("Search Params:", searchParams.toString());

        handleSocialAuth(searchParams.toString(), provider);
    }, [provider]);

    return (
        <div className={styles.container}>
            <img
                src="../../assets/logos/loginLogo.png"
                alt="Logo"
                className={styles.logo}
            />
            <h2>{provider} 로그인 처리 중...</h2>
            <p>잠시만 기다려 주세요. 곧 리디렉션됩니다.</p>
        </div>
    );
}

export default SocialLoginPageAfter;
