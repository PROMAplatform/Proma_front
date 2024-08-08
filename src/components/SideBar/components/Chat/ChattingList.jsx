import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  chattingRoomListState,
  currentRoomIdState,
} from "../../../../recoil/chatting/chattingRecoilState";
import { useChattingRoomHooks } from "../../../../api/chatting/chatting";
import ChattingListItem from "./ChattingListItem";
import SkeletonListItem from "../SkeletonListItem";
import styles from "./ChattingList.module.css";

function ChattingList() {
  const [isLoading, setIsLoading] = useState(true);
  const setCurrentRoomId = useSetRecoilState(currentRoomIdState);
  const roomList = useRecoilValue(chattingRoomListState);
  const { getChattingRoomList, getChattingList } = useChattingRoomHooks();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getChattingRoomList();
      setIsLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRoomClick = async (roomId) => {
    setCurrentRoomId(roomId);
    await getChattingList(roomId, 1);
  };

  return (
    <div className={styles.container}>
      {isLoading ? ( // 로딩 중일 때
        <div className={styles.scrollContainer}>
          <div className={styles.chattingListContainer}>
            {Array.from({ length: roomList.length || 5 }).map((_, index) => (
              <SkeletonListItem key={index} />
            ))}
          </div>
        </div>
      ) : roomList.length > 0 ? (
        <div className={styles.scrollContainer}>
          <div className={styles.chattingListContainer}>
            {roomList.slice().reverse().map((room) => (
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
