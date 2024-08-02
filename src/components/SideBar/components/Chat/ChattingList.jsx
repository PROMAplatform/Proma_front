import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  chattingRoomListState,
  currentRoomIdState,
} from "../../../../recoil/chatting/chattingRecoilState";
import { useChattingRoomHooks } from "../../../../api/chatting/chatting";
import ChattingListItem from "./ChattingListItem";
import styles from "./ChattingList.module.css";

function ChattingList() {
  const setCurrentRoomId = useSetRecoilState(currentRoomIdState);
  const roomList = useRecoilValue(chattingRoomListState);
  const { getChattingRoomList, getChattingList } = useChattingRoomHooks();

  useEffect(() => {
    getChattingRoomList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRoomClick = async (roomId) => {
    setCurrentRoomId(roomId);
    await getChattingList(roomId, 1);
  };

  return (
    <div className={styles.container}>
      {roomList.length > 0 ? (
        <div className={styles.scrollContainer}>
          <div className={styles.chattingListContainer}>
            {roomList.map((room) => (
              <ChattingListItem
                key={room.roomId}
                roomId={room.roomId}
                emoji={room.emoji}
                chatRoomTitle={room.chatRoomTitle}
                onClick={() => handleRoomClick(room.roomId)}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>채팅방이 없습니다.</p>
      )}
    </div>
  );
}

export default ChattingList;
