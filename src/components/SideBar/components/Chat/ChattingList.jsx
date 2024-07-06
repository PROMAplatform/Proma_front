import React from "react";
import ChattingListItem from "./ChattingListItem";

function ChattingList() {
  const promas = ["CHATTING 1", "CHATTING 2", "CHATTING 3", "CHATTING 4"];

  return (
    <div>
      {promas.map((proma, index) => (
        <ChattingListItem key={index} name={proma} />
      ))}
    </div>
  );
}

export default ChattingList;
