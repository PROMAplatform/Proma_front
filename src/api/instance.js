import axios from "axios";
import { applyInterceptors } from "./request";

//env로 숨긴 url 주소 (backend 주소 <-> front 주소)
const BASE_URL = process.env.REACT_APP_BACKEND_SERVER_URL;
const BASE_AI_URL = process.env.REACT_APP_AI_SERVER_URL;
// 우리 서버의 기본 주소
const defaultInstance = axios.create({
    baseURL: BASE_URL,
});

const defaultAIInstance = axios.create({
    baseURL: BASE_AI_URL,
});
// 요청 인터셉터를 추가하여 요청이 전송되기 전에 실행

//규진
const promptInstance = axios.create(defaultInstance.defaults);
promptInstance.defaults.baseURL += "/prompt";

applyInterceptors(promptInstance);

//규진
const aiChatInstance = axios.create(defaultAIInstance.defaults);
aiChatInstance.defaults.baseURL += "/llm";
applyInterceptors(aiChatInstance);
//규진, 정선
const chattingInstance = axios.create(defaultInstance.defaults);
chattingInstance.defaults.baseURL += "/chatting";

applyInterceptors(chattingInstance);

//동현
const communityIntstance = axios.create(defaultInstance.defaults);
communityIntstance.defaults.baseURL += "/community";

// const authInstance = axios.create(defaultInstance.defaults);
// authInstance.defaults.baseURL += "/auth";

// // 요청 인터셉터를 추가하여 요청이 전송되기 전에 실행
// applyInterceptors(authInstance);

const openapiInstance = axios.create(defaultInstance.defaults);
openapiInstance.defaults.baseURL += "/openapi";

export {
    defaultInstance,
    promptInstance,
    aiChatInstance,
    chattingInstance,
    communityIntstance,
    openapiInstance,
};
