// 공통 요청 처리기
// 인증 토큰을 가져오는 함수 (여기서는 예시로 localStorage를 사용)

//TODO- 로그인 시에 promaToken이라고 저장하는 logic 필요
export const getAuthToken = () => localStorage.getItem("accessToken");

export const sendRequest = async (instance, method, url, data = {}) => {
    try {
        const response = await instance[method](url, data);
        console.log(
            `✅${instance.defaults.baseURL} -[${method}] success :`,
            response,
        );
        return response;
    } catch (error) {
        console.error(
            `❌${url}-[${method}] error_response:`,
            error.response,
            `error_status : `,
            error.response.status,
            `error_status_text: `,
            error.response.statusText,
        );
        throw error;
    }
};

// 동적 URL 생성
export const createUrl = (path, params = {}) => {
    const query = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
    return `${path}${query ? `?${query}` : ""}`;
};

// 인터셉터 적용
export const applyInterceptors = (instance) => {
    instance.interceptors.request.use(
        async (config) => {
            const token = await getAuthToken();
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            } else {
                window.location.href = `/login`;
                // enqueueSnackbar(
                //     `☺️1초 만에 로그인 가능하게 만들어뒀어요!`,
                // );
            }
            return config;
        },
        (error) => {
            console.log(error);
            return Promise.reject(error);
        },
    );
};
