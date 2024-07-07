import React, { useState } from "react";
import styles from "./SideBar.module.css";
import ChattingList from "./components/Chat/ChattingList";
import Toggle from "./Toggle";
import PromptList from "./components/Prompt/PromptList";
function SideBar() {
  const [isChatting, setIsChatting] = useState(false);
  // const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가

  return (
    <div className={styles.container}>
      <h1> PROMA </h1>
      <Toggle isChatting={isChatting} setIsChatting={setIsChatting} />
      {isChatting ? (
        <div>
          <ChattingList />
          <button> 새 채팅 추가하기 </button>
        </div>
      ) : (
        <div>
          <PromptList />
          <button> 새 프롬프트 추가하기 </button>
        </div>
      )}
    </div>
  );
}

export default SideBar;
