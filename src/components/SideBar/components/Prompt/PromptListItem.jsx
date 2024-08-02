import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./PromptListItem.module.css";
import EmojiPickerButton from "../../../common/EmojiPickerButton";
import CustomIconButton from "../../../common/CustomIconButton";
import { H5 } from "../../../../styles/font-styles";

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
        <EmojiPickerButton
          isPromptEmoji={true}
          promptId={props.promptId}
          emoji={props.emoji}
        />
        <H5 color="gray8">{props.name}</H5>
      </div>
      <CustomIconButton icon={MoreHorizIcon} onClick={handleIconClick} />
    </div>
  );
}

export default PromptListItem;
