import React from "react";

function KaKaoLogin() {
    const loginUrl = `http://43.200.222.102:8080/oauth2/authorization/kakao`;

    const handleLogin = () => {
        window.location.href = loginUrl;
    };

    return (
        <>
            <div>
                <img
                    src="https://secure-project-dev-image.s3.ap-northeast-2.amazonaws.com/secure-project-front-image/logo_fix+(1).svg"
                    alt="Login with Kakao"
                    onClick={handleLogin}
                />
            </div>
        </>
    );
}

export default KaKaoLogin;
