import React from "react";
import trashIcon from "../../../../assets/images/trashIcon.svg";
import styles from "./ChattingListItme.module.css";
import EmojiPcikerButton from "../../../common/EmojiPickerButton";
import { H5 } from "../../../../styles/font-styles";

function ChattingListItem(props) {
  function handleIconClick() {
    //TODO- 삭제랑 API연결
    console.log("Icon이 클릭되었습니다.");
  }

  // roomId={room.roomId}
  // emoji={room.emoji}
  // promptTitle={room.prompTitle}
  // promptCategory={room.promptCategory}

  return (
    <div className={styles.container} onClick={props.onClick}>
      <div className={styles.IconNName}>
        <EmojiPcikerButton emoji={props.emoji} />
        <H5>{props.promptTitle}</H5>
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
