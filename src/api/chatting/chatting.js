import { useSetRecoilState } from "recoil";
import {
  chattingRoomListState,
  currentRoomIdState,
  messageState,
} from "../../recoil/chatting/chattingRecoilState";
import { sendRequest } from "../request";
import { chattingInstance } from "../instance";
import { promptListState } from "../../recoil/prompt/promptRecoilState";

// import { getUserIdInLocalStorage } from "../../util/localStorageUtil";

export const useChattingRoomHooks = () => {
  const setChattingRoomList = useSetRecoilState(chattingRoomListState);
  const setMessages = useSetRecoilState(messageState);
  const setCurrentRoomId = useSetRecoilState(currentRoomIdState);
  const setPromptList = useSetRecoilState(promptListState);
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
  const mockChattingList = [
    {
      chat_id: 1,
      prompt: "",
      message_question: "Hello?",
      message_answer: "Hi there!",
      message_file: [],
      message_create_at: new Date().toISOString(),
    },
    {
      chat_id: 2,
      prompt: "",
      message_question: "How are you?",
      message_answer: "I'm fine, thank you.",
      message_file: [],
      message_create_at: new Date().toISOString(),
    },
  ];

  // const mockPromptList = [
  //   {
  //     promptId: 1,
  //     promptMethod: "Task/Research",
  //     promptTitle: "프롬포트 제목1",
  //     promptDescription: "프롬포트 설명1",
  //     promptCategory: "IT",
  //     emoji: "🏎",
  //     promptPreview: "ai로 보낼 다듬어진 미리보기",
  //     listPromptAtom: [
  //       {
  //         blockId: "1",
  //         blockValue: "선생님",
  //         blockDescription: "착하고 뭐하고 뭐한 선생님",
  //         blockCategory: "화자",
  //       },
  //       {
  //         blockId: "2",
  //         blockValue: "선생님",
  //         blockDescription: "착하고 뭐하고 뭐한 선생님",
  //         blockCategory: "화자",
  //       },
  //       {
  //         blockId: "3",
  //         blockValue: "선생님",
  //         blockDescription: "착하고 뭐하고 뭐한 선생님",
  //         blockCategory: "화자",
  //       },
  //     ],
  //   },
  //   {
  //     promptId: 2,
  //     promptMethod: "Task/Research",
  //     promptTitle: "프롬포트 제목2",
  //     promptDescription: "프롬포트 설명1",
  //     promptCategory: "IT",
  //     emoji: "🏎",
  //     promptPreview: "ai로 보낼 다듬어진 미리보기",
  //     listPromptAtom: [
  //       {
  //         blockId: "1",
  //         blockValue: "선생님",
  //         blockDescription: "착하고 뭐하고 뭐한 선생님",
  //         blockCategory: "화자",
  //       },
  //       {
  //         blockId: "2",
  //         blockValue: "선생님",
  //         blockDescription: "착하고 뭐하고 뭐한 선생님",
  //         blockCategory: "화자",
  //       },
  //       {
  //         blockId: "3",
  //         blockValue: "선생님",
  //         blockDescription: "착하고 뭐하고 뭐한 선생님",
  //         blockCategory: "화자",
  //       },
  //     ],
  //   },
  //   {
  //     promptId: 3,
  //     promptMethod: "Task/Research",
  //     promptTitle: "프롬포트 제목3",
  //     promptDescription: "프롬포트 설명3",
  //     promptCategory: "IT",
  //     emoji: "🏎",
  //     promptPreview: "ai로 보낼 다듬어진 미리보기",
  //     listPromptAtom: [
  //       {
  //         blockId: "1",
  //         blockValue: "선생님",
  //         blockDescription: "착하고 뭐하고 뭐한 선생님",
  //         blockCategory: "화자",
  //       },
  //       {
  //         blockId: "2",
  //         blockValue: "선생님",
  //         blockDescription: "착하고 뭐하고 뭐한 선생님",
  //         blockCategory: "화자",
  //       },
  //       {
  //         blockId: "3",
  //         blockValue: "선생님",
  //         blockDescription: "착하고 뭐하고 뭐한 선생님",
  //         blockCategory: "화자",
  //       },
  //     ],
  //   },
  // ];

  //채팅방 리스트 가져오기
  //TODO- mock에서 실제 데이터로 수정해야함.
  const getChattingRoomList = async () => {
    const response = await sendRequest(
      chattingInstance,
      "get",
      `/sidebar/room/list${mockUserId}`
    );
    if (response.data.success) {
      await setChattingRoomList(response.data.responseDto.selectChatroom);
    }
  };

  //TODO- mock에서 실제 데이터로 수정해야함.
  const getChattingList = async (roomId, userId) => {
    //   const response = await sendRequest(
    //     chattingInstance,
    //     "post",
    //     `/list/${roomId}`,
    //     {
    //       memberId: userId,
    //     }
    //   );
    //   if (response.data.success) {
    //     setMessages(response.data.responseDto.selectChat);
    //   }
    setMessages(mockChattingList);
  };
  //채팅방 생성
  const createChattingRoom = async (roomTitle, emoji) => {
    try {
      const response = await sendRequest(
        chattingInstance,
        "post",
        `/sidebar/room/save${mockUserId}`,
        {
          roomTitle: roomTitle,
          emoji: "🏎",
        }
      );
      if (response.data.success) {
        //TODO- 내가 방금 방으로 방을 이동하는 로직 추가
        console.log("성공");
        setCurrentRoomId();
      }
    } catch (error) {
      console.error("Failed to create chatting room:", error);
    }
  };

  //채팅방 이모지 수정
  const patchChattingRoomEmoji = async (chatroomId, emoji) => {
    await sendRequest(
      chattingInstance,
      "patch",
      `/sidebar/room/emoji/${chatroomId}${mockUserId}`,
      {
        emoji,
      }
    );
  };
  //채팅 방 삭제
  const deleteChattingRoom = async (chatroomId, emoji) => {
    await sendRequest(
      chattingInstance,
      "delete",
      `/sidebar/room/${chatroomId}${mockUserId}`
    );
  };

  const fetchPromptList = async () => {
    const response = await sendRequest(
      chattingInstance,
      "get",
      `/sidebar/prompt/list${mockUserId}`
    );
    setPromptList(response.data.responseDto.selectPrompt);
  };

  const deletePrompt = async (promptId) => {
    await sendRequest(
      chattingInstance,
      "delete",
      `/sidebar/prompt/${promptId}${mockUserId}`
    );
    setPromptList((oldPromptList) => 
      oldPromptList.filter(prompt => prompt.promptId !== promptId)
    );
  };
  
  const patchPromptEmoji = async (promptId, emoji) => {
    await sendRequest(
      chattingInstance,
      "patch",
      `/sidebar/prompt/emoji/${promptId}${mockUserId}`,
      { emoji }
    );
  };
  const patchPrompt = async (
    promptId,
    promptTitle,
    promptDescription,
    promptCategory
  ) => {
    await sendRequest(
      chattingInstance,
      "delete",
      `/sidebar/prompt/${promptId}${mockUserId}`,
      {
        promptId,
        promptTitle,
        promptDescription,
        promptCategory,
      }
    );
  };

  const patchPromptInfo = async (
    promptId,
    promptTitle,
    promptDescription,
    promptCategory
  ) => {
    await sendRequest(
      chattingInstance,
      "patch",
      `/sidebar/prompt/${promptId}${mockUserId}`,
      {
        promptId,
        promptTitle,
        promptDescription,
        promptCategory,
      }
    );
  };

  const fetchChattingMessages = async (chatroomId) => {
    await sendRequest(chattingInstance, "get", `/${chatroomId}${mockUserId}`);
  };

  const saveChattingMessage = async (
    chatroomId,
    prompt_id,
    chatroom_id,
    message_question,
    message_file,
    message_create_at,
    message_answer
  ) => {
    await sendRequest(chattingInstance, "post", `/${chatroomId}${mockUserId}`, {
      prompt_id,
      chatroom_id,
      message_question,
      message_file,
      message_create_at,
      message_answer,
    });
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
    fetchChattingMessages,
    saveChattingMessage,
  };
};
