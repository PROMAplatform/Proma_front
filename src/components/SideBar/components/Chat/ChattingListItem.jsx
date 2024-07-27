import React from "react";
import trashIcon from "../../../../assets/images/trashIcon.svg";
import styles from "./ChattingListItme.module.css";
import EmojiPcikerButton from "../../../common/EmojiPickerButton";
import { H5 } from "../../../../styles/font-styles";

function ChattingListItem(props) {
  function handleIconClick() {
    console.log("Icon이 클릭되었습니다.");
  }

  return (
    <div
      className={styles.container}
      onClick={props.onClick}
    >
      <div className={styles.IconNName}>
        <EmojiPcikerButton />
        <H5>{props.name}</H5>
      </div>
      <div className={styles.iconContainer}>
        <img src={trashIcon} className={styles.icon} alt="trash" onClick={handleIconClick}/>
      </div>
    </div>
  );
}

export default ChattingListItem;
