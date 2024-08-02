import React from "react";
import styles from "./PromptListItem.module.css";
import EmojiPickerButton from "../../../common/EmojiPickerButton";
import MoreButton from "../MoreButton";
import { H5 } from "../../../../styles/font-styles";

function PromptListItem(props) {
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
      <MoreButton/>
    </div>
  );
}

export default PromptListItem;
