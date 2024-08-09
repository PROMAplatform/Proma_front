import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import handleSocialAuth from "../../util/handleSocialLoginAuth";

function SocialLoginPageAfter() {
    const { provider } = useParams();

    useEffect(() => {
        const currentUrl = window.location.href;
        const searchParams = new URL(currentUrl).searchParams;
        console.log("Current URL:", currentUrl);
        console.log("Search Params:", searchParams.toString());

        handleSocialAuth(searchParams.toString(), provider);
    }, [provider]);

    return <div>{provider} 로그인 처리 중...</div>;
}

export default SocialLoginPageAfter;
