import React from "react";
import ChattingListItem from "./ChattingListItem";
import styles from "./ChattingList.module.css"

function ChattingList() {
  const promas = ["CHATTING 1", "CHATTING 2", "CHATTING 3", "CHATTING 4"];

  return (
    <div className={styles.container}>
      <div className={styles.chattingListContainer}>
      {promas.map((proma, index) => (
        <ChattingListItem key={index} name={proma} />
      ))}
      </div>
    </div>
  );
}

export default ChattingList;
