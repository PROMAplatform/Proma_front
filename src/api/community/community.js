import {useSetRecoilState} from "recoil";
import {sendRequest} from "../request";
import {communityIntstance, promptInstance, publicIntstance} from "../instance";
import {
    communityPromptListState,
    communityPromptDetailState,
    makePromptListState,
    makePromptDetailState,
    communityPromptListPageState,
    isLoadingCommunityState,
} from "../../recoil/community/communityRecoilState";

export const useCommunityHooks = () => {
    const setCommunityPromptList = useSetRecoilState(communityPromptListState);
    const setCommunityPromptDetail = useSetRecoilState(communityPromptDetailState);
    const setMakePromptList = useSetRecoilState(makePromptListState);
    const setMakePromptDetail = useSetRecoilState(makePromptDetailState);
    const setCommunityPromptListPage = useSetRecoilState(communityPromptListPageState);
    const setIsLoadingcommunity = useSetRecoilState(isLoadingCommunityState);

    //공유된 프롬프트 리스트 조회
    const getCommunityPromptList = async (
        selectedCategory,
        sortOrder,
        searchQuery,
        currentPage,
        selectedMethod,
        size,
    ) => {
        setIsLoadingcommunity(true);
        try {
            const params = {
                category: selectedCategory,
                search: searchQuery,
                page: currentPage,
                size: size,
                method: selectedMethod,
            };

            // sortOrder에 따라 정렬 기준 추가
            if (sortOrder === "latest") {
                // params.latest = "desc";
                params.like = "";
            } else if (sortOrder === "like") {
                params.like = "desc";
                //params.latest = "";
            }

            const response = await sendRequest(communityIntstance, "get", "", {
                params,
            });

            const {responseDto} = response.data;
            const {selectPrompt, pageInfo} = responseDto;

            setCommunityPromptList(selectPrompt);
            setCommunityPromptListPage({
                currentPage: pageInfo.currentPage || 0,
                totalPages: pageInfo.totalPages || 0,
                pageSize: 9,
                totalItems: pageInfo.totalItems || 0,
                currentItems: pageInfo.currentItems,
            });
        } catch (error) {
            setCommunityPromptList([]);
            setCommunityPromptListPage(null);
            console.error("Error:", error);
        } finally {
            setIsLoadingcommunity(false);
        }
    };

    const getCommunityPreviewPromptList = async (
        selectedCategory,
        sortOrder,
        searchQuery,
        currentPage,
        selectedMethod,
        size,
    ) => {
        setIsLoadingcommunity(true);
        try {
            const params = {
                category: selectedCategory,
                search: searchQuery,
                page: currentPage,
                size: size,
                method: selectedMethod,
            };

            // sortOrder에 따라 정렬 기준 추가
            if (sortOrder === "latest") {
                //params.latest = "desc";
                params.like = "";
            } else if (sortOrder === "like") {
                params.like = "desc";
                //params.latest = "";
            }

            const response = await sendRequest(publicIntstance, "get", "/posts", {
                params
            });

            const {responseDto} = response.data;
            const {selectPrompt, pageInfo} = responseDto;

            setCommunityPromptList(selectPrompt);
            setCommunityPromptListPage({
                currentPage: pageInfo.currentPage || 0,
                totalPages: pageInfo.totalPages || 0,
                pageSize: 9,
                totalItems: pageInfo.totalItems || 0,
                currentItems: pageInfo.currentItems,
            });
        } catch (error) {
            setCommunityPromptList([]);
            console.error("Error:", error);
        } finally {
            setIsLoadingcommunity(false);
        }
    };

    //공유된 프롬프트 게시글 상세보기(블록)
    const getCommunityPromptDetail = async (postId) => {
        setIsLoadingcommunity(true);
        try {
            const response = await sendRequest(
                publicIntstance,
                "get",
                `/posts/${postId}`,
            );
            setCommunityPromptDetail(
                response.data.responseDto.selectPromptAtom,
            );
        } catch (error) {
            setCommunityPromptDetail([]);
            console.error("error : ", error);
        } finally {
            setIsLoadingcommunity(false);
        }
    };

    //공유된 프롬프트 스크랩
    const scrapPrompt = async (postId) => {
        setIsLoadingcommunity(true);
        try {
            const response = await sendRequest(communityIntstance, "post", `/${postId}`);

            return response.data.responseDto;
        } catch (error) {
            console.error("error : ", error);
        } finally {
            setIsLoadingcommunity(false);
        }
    };

    //공유된 프롬프트 좋아요 버튼
    const likePost = async (postId) => {
        setIsLoadingcommunity(true);
        try {
            const response = await sendRequest(communityIntstance, "post", `/${postId}/likes`);

            return response.data.responseDto;
        } catch (error) {
            console.error("error : ", error);
        } finally {
            setIsLoadingcommunity(false);
        }
    };

    //내가 작성한 프롬프트 리스트 id, title
    const getMakePromptList = async () => {
        setIsLoadingcommunity(true);
        try {
            const response = await sendRequest(
                promptInstance,
                "get",
                "/titles",
            );

            setMakePromptList(response.data.responseDto.promptList);
        } catch (error) {
            console.error("error : ", error);
        } finally {
            setIsLoadingcommunity(false);
        }
    };

    //내 프롬프트 상세조회
    const getPromptDetail = async (promptId) => {
        setIsLoadingcommunity(true);
        try {
            const response = await sendRequest(
                promptInstance,
                "get",
                `/${promptId}`,
            );
            setMakePromptDetail({
                pomptId: response.data.responseDto.promptId,
                promptMethod: response.data.responseDto.promptMethod,
                promptTitle: response.data.responseDto.promptTitle,
                promptCategory: response.data.responseDto.promptCategory,
                promptDescription: response.data.responseDto.promptDescription,
                promptPreview: response.data.responseDto.promptPreview,
                listPromptAtom: response.data.responseDto.listPromptAtom,
            });
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoadingcommunity(false);
        }
    };

    //프롬프트 공유
    const sharePrompt = async (promptId, data) => {
        setIsLoadingcommunity(true);
        try {
            const response = await sendRequest(
                promptInstance,
                "post",
                `/${promptId}`,
                {
                    postTitle: data.title,
                    postDescription: data.description,
                    postCategory: data.category,
                },
            );
            return response.data.responseDto;
        } catch (error) {
            console.log("error : ", error);
        } finally {
            setIsLoadingcommunity(false);
        }
    };

    return {
        getCommunityPromptList,
        getCommunityPreviewPromptList,
        getCommunityPromptDetail,
        scrapPrompt,
        likePost,
        getMakePromptList,
        getPromptDetail,
        sharePrompt,
    };
};
