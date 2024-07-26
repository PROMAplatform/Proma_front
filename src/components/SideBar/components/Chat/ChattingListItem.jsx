import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./ChattingListItme.module.css";
import EmojiPcikerButton from "../../../common/EmojiPickerButton";
import CustomIconButton from "../../../common/CustomIconButton";
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

      <CustomIconButton icon={MoreHorizIcon} onClick={handleIconClick} />
    </div>
  );
}

export default ChattingListItem;
