import React, { useState } from "react";
import styles from "./SideBar.module.css";
import ChattingList from "./components/Chat/ChattingList";
import Toggle from "./Toggle";
import PromptList from "./components/Prompt/PromptList";
import logo from "../../assets/logos/Sidebar_Header.png";
function SideBar() {
  const [isChatting, setIsChatting] = useState(false);
  // const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가

  return (
    <div className={styles.container}>
      <img alt="sideBar 헤더 로고" src={logo} />
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
