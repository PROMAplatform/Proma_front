import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./ChattingListItme.module.css";
import EmojiPcikerButton from "../../../common/EmojiPickerButton";
import CustomIconButton from "../../../common/CustomIconButton";

function ChattingListItem(props) {
  function handleIconClick() {
    console.log("Icon이 클릭되었습니다.");
  }

  function handleChattingClick(index) {
    console.log(`${index}Chatting으로 전환`);
  }

  return (
    <div
      className={styles.container}
      onClick={() => handleChattingClick(props.name)}
    >
      <div className={styles.IconNName}>
        <EmojiPcikerButton />
        <p className={styles.chattingName}>{props.name}</p>
      </div>

      <CustomIconButton icon={MoreHorizIcon} onClick={handleIconClick} />
    </div>
  );
}

export default ChattingListItem;
