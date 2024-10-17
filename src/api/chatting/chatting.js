import { useSetRecoilState } from "recoil";
import {
    chattingRoomListState,
    currentRoomIdState,
    messageState,
} from "../../recoil/chatting/chattingRecoilState";
import { sendRequest } from "../request";
import { aiChatInstance, chattingInstance, promptInstance } from "../instance";
import { promptListState } from "../../recoil/prompt/promptRecoilState";

// import { getUserIdInLocalStorage } from "../../util/localStorageUtil";

export const useChattingRoomHooks = () => {
    const setChattingRoomList = useSetRecoilState(chattingRoomListState);
    const setCurrentRoomId = useSetRecoilState(currentRoomIdState);
    const setPromptList = useSetRecoilState(promptListState);
    const setMessages = useSetRecoilState(messageState);
    const mockUserId = "?userId=1";
    // const mockChattingRoomList = [
    //   {
    //     roomId: 1,
    //     emoji: "🏎",
    //     promptTitle: "채팅방1",
    //     promptCategory: "Task/Research",
    //   },
    //   {
    //     roomId: 2,
    //     emoji: "🚓",
    //     promptTitle: "채팅방22",
    //     promptCategory: "Task/Research",
    //   },
    // ];

    // 임의의 채팅 메시지 데이터
    // const mockChattingList = [
    //   {
    //     messageId: 1,
    //     promptId: 1,
    //     chatroomId: 1,
    //     messageQuestion: "Hello?",
    //     messageAnswer: "Hi there!",
    //     messageFile: [],
    //     messageCreateAt: new Date().toISOString(),
    //   },
    //   {
    //     messageId: 2,
    //     promptId: 1,
    //     chatroomId: 1,
    //     messageQuestion: "Hi?",
    //     messageAnswer: "Hi there!",
    //     messageFile: [],
    //     messageCreateAt: new Date().toISOString(),
    //   },
    // ];

    //채팅방 리스트 가져오기
    const getChattingRoomList = async () => {
        const response = await sendRequest(
            chattingInstance,
            "get",
            ``,
            //roomId,
        );
        if (response.data.success) {
            await setChattingRoomList(response.data.responseDto.selectChatroom);
        }
    };

    const getChattingList = async (roomId) => {
        const response = await sendRequest(
            chattingInstance,
            "get",
            `/${roomId}`,
        );
        if (response.data.success) {
            setMessages(response.data.responseDto.selectChatting);
        }
    };
    //채팅방 생성
    const createChattingRoom = async (roomTitle, emoji) => {
        try {
            const response = await sendRequest(chattingInstance, "post", ``, {
                roomTitle: roomTitle,
                emoji: emoji,
            });
            if (response.data.success) {
                console.log("성공");
                setCurrentRoomId(response.data.responseDto.roomId);
                console.log(response.data.responseDto.roomId);
                return response.data.responseDto.roomId;
            }
        } catch (error) {
            console.error("Failed to create chatting room:", error);
        }
    };

    //채팅방 이모지 수정
    const patchChattingRoomEmoji = async (chatroomId, emoji) => {
        await sendRequest(chattingInstance, "patch", `/${chatroomId}/emojis`, {
            emoji,
        });
    };
    //채팅 방 삭제
    const deleteChattingRoom = async (chatroomId, emoji) => {
        await sendRequest(chattingInstance, "delete", `/${chatroomId}`);
    };

    const fetchPromptList = async () => {
        const response = await sendRequest(promptInstance, "get", ``);
        setPromptList(response.data.responseDto.selectPrompt);
    };

    const deletePrompt = async (promptId) => {
        await sendRequest(promptInstance, "delete", `/${promptId}`);
        setPromptList((oldPromptList) =>
            oldPromptList.filter((prompt) => prompt.promptId !== promptId),
        );
    };

    const patchPromptEmoji = async (promptId, emoji) => {
        await sendRequest(promptInstance, "patch", `/${promptId}/emojis`, {
            emoji,
        });
    };
    const patchPrompt = async (
        promptId,
        promptTitle,
        promptDescription,
        promptCategory,
    ) => {
        await sendRequest(promptInstance, "delete", `/${promptId}`, {
            promptId,
            promptTitle,
            promptDescription,
            promptCategory,
        });
    };

    // 프롬프트 정보 수정
    const patchPromptInfo = async (
        promptId,
        promptTitle,
        promptDescription,
        promptCategory,
    ) => {
        await sendRequest(promptInstance, "patch", `/${promptId}`, {
            promptId,
            promptTitle,
            promptDescription,
            promptCategory,
        });
        setPromptList((oldPromptList) =>
            oldPromptList.map((prompt) => {
                if (prompt.promptId === promptId) {
                    return {
                        ...prompt,
                        promptTitle,
                        promptDescription,
                        promptCategory,
                    };
                }
                return prompt;
            }),
        );
    };

    // 프롬프트 블록 수정
    const patchPromptBlock = async (
        promptId,
        listPromptAtom,
        promptPreview,
    ) => {
        await sendRequest(promptInstance, "patch", `/${promptId}/blocks`, {
            listPromptAtom,
            promptPreview,
        });
        await fetchPromptList();
        // setPromptList((oldPromptList) =>
        //     oldPromptList.map((prompt) => {
        //         if (prompt.promptId === promptId) {
        //             return {
        //                 ...prompt,
        //                 listPromptAtom,
        //                 promptPreview
        //             };
        //         }
        //         return prompt;
        //     }),
        // );
    };

    const fetchChattingMessages = async (chatroomId) => {
        await sendRequest(chattingInstance, "get", `/${chatroomId}`);
    };

    const fetchChattingAnswer = async (
        promptId,
        messageQuestion,
        chatroomId,
        fileType,
        messageFile,
    ) => {
        const response = await sendRequest(
            aiChatInstance,
            "post",
            `/question`,
            {
                promptId: promptId,
                messageQuestion,
                chatroomId,
                fileType,
                messageFile,
            },
        );

        return response;
    };

    const saveChattingMessage = async (
        chatroomId,
        prompt_id,
        chatroom_id,
        message_question,
        message_file,
        message_create_at,
        message_answer,
    ) => {
        await sendRequest(
            chattingInstance,
            "post",
            `/${chatroomId}${mockUserId}`,
            {
                prompt_id,
                chatroom_id,
                message_question,
                message_file,
                message_create_at,
                message_answer,
            },
        );
    };
    return {
        getChattingRoomList,
        getChattingList,
        createChattingRoom,
        patchChattingRoomEmoji,
        deleteChattingRoom,
        fetchPromptList,
        deletePrompt,
        patchPromptEmoji,
        patchPrompt,
        patchPromptInfo,
        patchPromptBlock,
        fetchChattingMessages,
        fetchChattingAnswer,
        saveChattingMessage,
    };
};
