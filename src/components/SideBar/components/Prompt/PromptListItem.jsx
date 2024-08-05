import React from "react";
import styles from "./PromptListItem.module.css";
import EmojiPickerButton from "../../../common/EmojiPickerButton";
import MoreButton from "./MoreButton";
import { H5 } from "../../../../styles/font-styles";

function PromptListItem({emoji, promptId, name, prompt}) {
  function handlePromptClick() {
    console.log("Prompt 전환");
  }

  return (
    <div className={styles.container} onClick={handlePromptClick}>
      <div className={styles.IconNName}>
        <EmojiPickerButton
          isPromptEmoji={true}
          promptId={promptId}
          emoji={emoji}
        />
        <H5 color="gray8">{name}</H5>
      </div>
      <MoreButton
        promptId={promptId}
        promptTitle={name}
        promptDescription={prompt.promptDescription}
        promptCategory={prompt.promptCategory}
      />
    </div>
  );
}

export default PromptListItem;
