import React, { useState } from "react";
import styles from "./SideBar.module.css";
import ChattingList from "./components/Chat/ChattingList";
import Toggle from "./Toggle";
import PromptList from "./components/Prompt/PromptList";
import AddButton from "./AddButton";
import promaLogoSmall from "../../assets/images/promaLogoSmall.svg";
function SideBar() {
  const [isChatting, setIsChatting] = useState(false);
  // const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={promaLogoSmall} alt="logo" />
      <Toggle isChatting={isChatting} setIsChatting={setIsChatting} />
      {isChatting ? (
        <div className={styles.listContainer}>
          <ChattingList />
          <AddButton text="새 채팅 추가하기" />
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
