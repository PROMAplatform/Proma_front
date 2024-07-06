import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./PromptListItem.module.css";
import EmojiPcikerButton from "../../../common/EmojiPickerButton";
import CustomIconButton from "../../../common/CustomIconButton";

function PromptListItem(props) {
  function handleIconClick() {
    console.log("Icon이 클릭되었습니다.");
  }
  function handlePromptClick() {
    console.log("Prompt 전환");
  }

  return (
    <div className={styles.container} onClick={handlePromptClick}>
      <div className={styles.IconNName}>
        <EmojiPcikerButton />
        <h3>{props.name}</h3>
      </div>

      <CustomIconButton icon={MoreHorizIcon} onClick={handleIconClick} />
    </div>
  );
}

export default PromptListItem;
