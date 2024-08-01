import React, { useState } from "react";
import styles from "./SideBar.module.css";
import ChattingList from "./components/Chat/ChattingList";
import Toggle from "./components/Toggle";
import PromptList from "./components/Prompt/PromptList";
import AddButton from "./components/AddButton";
import promaLogoSmall from "../../assets/images/promaLogoSmall.svg";
import { useChattingRoomHooks } from "../../api/chatting/chatting";

function SideBar() {
  const [isChatting, setIsChatting] = useState(false);
  const { createChattingRoom } = useChattingRoomHooks();
  // const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가

  const handleAddChattingRoom = async () => {
    await createChattingRoom(1);
  };

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={promaLogoSmall} alt="logo" />
      <Toggle isChatting={isChatting} setIsChatting={setIsChatting} />
      {isChatting ? (
        <div className={styles.listContainer}>
          <ChattingList />
          <div onClick={handleAddChattingRoom}>
            <AddButton text="새 채팅 추가하기" />
          </div>
        </div>
      ) : (
        <div className={styles.listContainer}>
          <PromptList />
          <AddButton text="새 프롬프트 추가하기" />
        </div>
      )}
    </div>
  );
}

export default SideBar;
