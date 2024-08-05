import React from "react";
import styles from "./PromptListItem.module.css";
import EmojiPickerButton from "../../../common/EmojiPickerButton";
import MoreButton from "./MoreButton";
import { H5 } from "../../../../styles/font-styles";

function PromptListItem({emoji, prompt}) {
  function handlePromptClick() {
    console.log("Prompt 전환");
  }

  return (
    <div className={styles.container} onClick={handlePromptClick}>
      <div className={styles.IconNName}>
        <EmojiPickerButton
          isPromptEmoji={true}
          promptId={prompt.promptId}
          emoji={emoji}
        />
        <H5 color="gray8">{prompt.promptTitle}</H5>
      </div>
      <MoreButton
        promptId={prompt.promptId}
        promptTitle={prompt.promptTitle}
        promptDescription={prompt.promptDescription}
        promptCategory={prompt.promptCategory}
      />
    </div>
  );
}

export default PromptListItem;
