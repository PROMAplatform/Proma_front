import React from "react";
import trashIcon from "../../../../assets/images/trashIcon.svg";
import styles from "./ChattingListItme.module.css";
import EmojiPcikerButton from "../../../common/EmojiPickerButton";
import { H5 } from "../../../../styles/font-styles";
import { useChattingRoomHooks } from "../../../../api/chatting/chatting";
function ChattingListItem(props) {
  const { deleteChattingRoom } = useChattingRoomHooks();

  function handleIconClick() {
    deleteChattingRoom(props.roomId);
  }

  // roomId={room.roomId}
  // emoji={room.emoji}
  // promptTitle={room.prompTitle}
  // promptCategory={room.promptCategory}

  return (
    <div className={styles.container} onClick={props.onClick}>
      <div className={styles.IconNName}>
        <EmojiPcikerButton
          isPromptEmoji={false}
          roomId={props.roomId}
          emoji={props.emoji}
        />
        <H5>{props.chatRoomTitle}</H5>
      </div>
      <div className={styles.iconContainer}>
        <img
          src={trashIcon}
          className={styles.icon}
          alt="trash"
          onClick={handleIconClick}
        />
      </div>
    </div>
  );
}

export default ChattingListItem;
