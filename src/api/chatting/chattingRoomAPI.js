import { useSetRecoilState } from "recoil";
import {
  chattingRoomListState,
  currentRoomIdState,
  messageState,
} from "../../recoil/chatting/chattingRecoilState";
import { useCallback } from "react";
// import { getUserIdInLocalStorage } from "../../util/localStorageUtil";

export const useChattingRoomHooks = () => {
  const setChattingRoomList = useSetRecoilState(chattingRoomListState);
  const setMessages = useSetRecoilState(messageState);
  const setCurrentRoomId = useSetRecoilState(currentRoomIdState);

  const userId = 1;

  const mockChattingRoomList = [
    { roomId: 1, roomTitle: "Chat Room 1" },
    { roomId: 2, roomTitle: "Chat Room 2" },
  ];

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

  const getChattingRoomList = useCallback(
    async (memberId) => {
      try {
        // const response = await sendRequest(
        //   chattingInstance,
        //   "post",
        //   "/room/list/",
        //   {
        //     memberId: userId,
        //   }
        // );
        // setChattingRoomList(response.data.responseDto.selectChatting);

        setChattingRoomList(mockChattingRoomList);
      } catch (error) {
        console.error("Failed to fetch chatting room list:", error);
        setChattingRoomList([]);
      }
    },
    [setChattingRoomList, userId]
  );

  const getChattingList = async (roomId, userId) => {
    try {
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
    } catch (error) {
      console.error("Failed to fetch chatting list:", error);
    }
  };

  const createChattingRoom = async (memberId) => {
    try {
    //   const response = await sendRequest(chattingInstance, "post", "/save", {
    //     memberId: userId,
    //     roomType: characterType,
    //     roomTitle: `${characters[characterType].name}(와)과의 채팅`, //이거는 새로운 방 만들때만 주면 돼
    //   });
    //   if (response.data.success) {
    //     setCurrentRoomId(response.data.responseDto.roomId);
    //     // getChattingRoomList(1); // 새로운 방 목록을 가져옵니다.
    //   }
      const newRoomId = Date.now();
      const newRoom = {
        roomId: newRoomId,
        roomTitle: "chattingRoom",
      };
      setCurrentRoomId(newRoomId);
      setChattingRoomList((prevRooms) => [...prevRooms, newRoom]);
      setMessages([]);
      return newRoomId;
    } catch (error) {
      console.error("Failed to create chatting room:", error);
    }
  };

  return {
    getChattingRoomList,
    getChattingList,
    createChattingRoom,
  };
};
