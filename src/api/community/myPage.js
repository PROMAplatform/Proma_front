import {useSetRecoilState} from "recoil";
import {sendRequest} from "../request";
import {communityIntstance} from "../instance";
import {
    communityPromptListPageState,
    communityPromptListState,
    isLoadingCommunityState
} from "../../recoil/community/communityRecoilState";

export const useMyPageHooks = () => {
    const setCommunityPromptList = useSetRecoilState(communityPromptListState);
    const setCommunityPromptListPage = useSetRecoilState(communityPromptListPageState);
    const setIsLoadingcommunity = useSetRecoilState(isLoadingCommunityState);

    //좋아요 한 게시글 리스트
    const getLikePromptList = async (
        selectedCategory,
        sortOrder,
        currentPage,
        selectedMethod,
        size,
    ) => {
        setIsLoadingcommunity(true);
        try {
            const params = {
                category: selectedCategory,
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

            const response = await sendRequest(
                communityIntstance,
                "get",
                "/likes",
                {params},
            );

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

    //작성 한 게시글 리스트
    const getWritePromptList = async (
        selectedCategory,
        sortOrder,
        currentPage,
        selectedMethod,
        size,
    ) => {
        setIsLoadingcommunity(true);
        try {
            const params = {
                category: selectedCategory,
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

            const response = await sendRequest(
                communityIntstance,
                "get",
                "/distributed",
                {params},
            );

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

    const fixSharePost = async (postId, data) => {
        setIsLoadingcommunity(true);
        try {
            const response = await sendRequest(
                communityIntstance,
                "patch",
                `/${postId}`,
                {
                    postTitle: data.title,
                    postDescription: data.description,
                    postCategory: data.category,
                },
            );

            return response.data.responseDto;
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoadingcommunity(false);
        }
    };

    const deleteSharePost = async (postId) => {
        setIsLoadingcommunity(true);
        try {
            const response = await sendRequest(
                communityIntstance,
                "delete",
                `/${postId}`,
            );

            return response.data.responseDto;
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoadingcommunity(false);
        }
    };

    return {
        getLikePromptList,
        getWritePromptList,
        fixSharePost,
        deleteSharePost,
    };
};
