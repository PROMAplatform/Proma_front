import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    chattingRoomListState,
    currentRoomIdState,
    isFirstState,
} from "../../../../recoil/chatting/chattingRecoilState";
import { useChattingRoomHooks } from "../../../../api/chatting/chatting";
import ChattingListItem from "./ChattingListItem";
import SkeletonListItem from "../SkeletonListItem";
import styles from "./ChattingList.module.css";
import emptyChattingList from "../../../../assets/images/emptyChattingList.svg";
import { B4 } from "../../../../styles/font-styles";
import { t } from "i18next";

function ChattingList() {
    const [isLoading, setIsLoading] = useState(true);
    const setCurrentRoomId = useSetRecoilState(currentRoomIdState);
    const setIsFirst = useSetRecoilState(isFirstState);
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
        await getChattingList(roomId);
        await setCurrentRoomId(roomId);
        await setIsFirst(false);
    };

    return (
        <div className={styles.container}>
            {isLoading ? ( // 로딩 중일 때
                <div className={styles.scrollContainer}>
                    <div className={styles.chattingListContainer}>
                        {Array.from({ length: roomList.length || 5 }).map(
                            (_, index) => (
                                <SkeletonListItem key={index} />
                            ),
                        )}
                    </div>
                </div>
            ) : roomList.length > 0 ? (
                <div className={styles.scrollContainer}>
                    <div className={styles.chattingListContainer}>
                        {roomList
                            .slice()
                            .reverse()
                            .map((room) => (
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
                <div className={styles.empty}>
                    <img src={emptyChattingList} alt="empty"/>
                    <B4 color="gray6">{t(`sideBar.emptyChatting`)}</B4>
                </div>
            )}
        </div>
    );
}

export default ChattingList;
