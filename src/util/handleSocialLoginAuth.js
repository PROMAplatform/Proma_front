import { sendRequest } from "../api/request";
import { defaultInstance } from "../api/instance";

const extractCodeFromUrl = (search) => {
    const urlParams = new URLSearchParams(search);
    return urlParams.get("code");
};

const handleSocialAuth = async (search, socialProvider) => {
    try {
        const code = extractCodeFromUrl(search);

        if (!code) {
            throw new Error("인증 코드를 찾을 수 없습니다.");
        }
        console.log("Extracted code:", code);

        const response = await sendRequest(
            defaultInstance,
            "post",
            `/oauth/user/social/${socialProvider}?code=${code}`,
        );

        if (response.data.success) {
            console.log(`${socialProvider} 로그인 성공:`, response.data);

            // 원래 창으로 메시지 전송
            if (window.opener) {
                window.opener.postMessage(
                    {
                        type: "SOCIAL_LOGIN_SUCCESS",
                        data: {
                            accessToken: response.data.responseDto.accessToken,
                            refreshToken:
                                response.data.responseDto.refreshToken,
                        },
                    },
                    "*",
                );

                // 현재 창 닫기
                window.close();
            } else {
                console.error("opener window not found");
            }
        } else {
            throw new Error("서버 응답 오류");
        }
    } catch (error) {
        console.error(`${socialProvider} 인증 처리 중 오류 발생:`, error);
        if (window.opener) {
            window.opener.postMessage(
                {
                    type: "SOCIAL_LOGIN_ERROR",
                    error: error.message,
                },
                "*",
            );
            // window.close();
        }
    }
};

export default handleSocialAuth;
