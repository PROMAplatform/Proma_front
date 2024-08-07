import {useSetRecoilState} from "recoil";
import {createUrl, sendRequest} from "../request";
import {communityIntstance} from "../instance";
import {
    communityPromptListPageState,
    communityPromptListState
} from "../../recoil/community/communityRecoilState";

export const useMyPageHooks = () => {
    const setCommunityPromptList = useSetRecoilState(communityPromptListState);
    const setCommunityPromptListPage = useSetRecoilState(communityPromptListPageState);

    //좋아요 한 게시글 리스트
    const getLikePromptList = async (selectedCategory, sortOrder, currentPage) => {
        try {
            const params = {
                userId: 1,
                category:selectedCategory,
                search: "",
                page: currentPage,
                size: 9,
            };

            // sortOrder에 따라 정렬 기준 추가
            if (sortOrder === "latest") {
                params.latest = "desc";
                params.like = "";
            } else if (sortOrder === "like") {
                params.like = "desc";
                params.latest = "";
            }

            const response = await sendRequest(communityIntstance, "get", "/my-like",{ params });

            const { responseDto } = response.data;
            const { selectPrompt, pageInfo } = responseDto;

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
        }
    };

    //작성 한 게시글 리스트
    const getWritePromptList = async (selectedCategory, sortOrder, currentPage) => {
        try {
            const params = {
                userId: 1,
                category:selectedCategory,
                search: "",
                page: currentPage,
                size: 9,
            };

            // sortOrder에 따라 정렬 기준 추가
            if (sortOrder === "latest") {
                params.latest = "desc";
                params.like = "";
            } else if (sortOrder === "like") {
                params.like = "desc";
                params.latest = "";
            }

            const response = await sendRequest(communityIntstance, "get", "/my-distribute",{ params });

            const { responseDto } = response.data;
            const { selectPrompt, pageInfo } = responseDto;

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
        }
    };

    const fixSharePost = async (postId, data) => {
        try {
            const params = {
                userId: 1,
            }

            const url = createUrl(`/my-distribute/patch/${postId}`, params);

            const response = await sendRequest(
                communityIntstance,
                "patch",
                url,
                {
                    "postTitle" : data.title,
                    "postDescription" : data.description,
                    "postCategory" : data.category,
                });

            return response.data.responseDto;
        }catch (error) {
            console.error("Error:", error);
        }
    };

    const deleteSharePost = async (postId) => {
        try {
            const params = {
                userId: 1,
            }

            const url = createUrl(`/my-distribute/delete/${postId}`, params);

            const response = await sendRequest(communityIntstance, "delete", url);

            return response.data.responseDto;
        } catch (error) {
            console.error("Error:", error);
        }
    };

    //ToDo - get user name

    //ToDo - user out


    return {
        getLikePromptList,
        getWritePromptList,
        fixSharePost,
        deleteSharePost,
    };
}