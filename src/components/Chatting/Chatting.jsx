import React from "react";
import styles from "./Chatting.module.css";
import { messageState } from "../../recoil/chatting/chattingRecoilState";
import { useRecoilValue } from "recoil";
import ChattingMain from "./components/ChattingMain";
import ChattingMessages from "./components/Messages/ChattingMessages";
import ChattingInput from "./components/ChattingInput/ChattingInput";

function Chatting() {
  const messages = useRecoilValue(messageState);
  return (
    <div className={styles.container}>
      {messages.length === 0 ? (
        <ChattingMain /> // messages가 비어 있을 때 ChattingMain 컴포넌트 렌더링
      ) : (
        <ChattingMessages />
      )}
      <ChattingInput />
    </div>
  );
}

export default Chatting;
