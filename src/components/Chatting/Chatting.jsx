import React from "react";
import styles from "./Chatting.module.css";
import { messageState } from "../../recoil/chatting/chattingRecoilState";
import { useRecoilState } from "recoil";
import ChattingMain from "./components/ChattingMain";
import ChattingMessages from "./components/Messages/ChattingMessages";
import ChattingInput from "./components/Input/ChattingInput";

function Chatting() {
  const [messages] = useRecoilState(messageState);

  return (
    <div className={styles.container}>
      {messages.length === 0 ? (
        <ChattingMain /> // messages가 비어 있을 때 ChattingMain 컴포넌트 렌더링
      ) : (
        <ChattingMessages
        />
      )}
      <ChattingInput />
    </div>
  );
}

export default Chatting;
