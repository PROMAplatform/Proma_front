import { sendRequest, applyInterceptors } from "../request";
import { openapiListState } from "../../recoil/openapi/openapiState";
import { useSetRecoilState } from "recoil";
import { openapiInstance } from "../instance";

export const useOpenAPIHook = () => {
    const setOpenapiListState = useSetRecoilState(openapiListState);
    const makeOpenAPI = async (promptId) => {
        applyInterceptors(openapiInstance);
        try {
            const response = await sendRequest(
                openapiInstance,
                "post",
                `/signup/${promptId}`,
                {},
            );
            if (response.data.success) {
                console.log(response.data.responseDto);
                return response.data.responseDto;
            }
        } catch (error) {
            console.error("Failed", error);
        }
    };

    const fetchOpenAPIList = async () => {
        applyInterceptors(openapiInstance);
        const response = await sendRequest(openapiInstance, "get", `/list`);
        setOpenapiListState(response.data.responseDto.apiList);
    };
    return { makeOpenAPI, fetchOpenAPIList };
};
