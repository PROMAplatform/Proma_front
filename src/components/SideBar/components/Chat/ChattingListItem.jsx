import React from "react";
import { ReactComponent as TrashIcon } from "../../../../assets/images/trashIcon.svg";
import styles from "./ChattingListItme.module.css";
import EmojiPcikerButton from "../../../common/EmojiPickerButton";
import CustomIconButton from "../../../common/CustomIconButton";
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
      <CustomIconButton icon={TrashIcon} onClick={handleIconClick} />
    </div>
  );
}

export default ChattingListItem;
