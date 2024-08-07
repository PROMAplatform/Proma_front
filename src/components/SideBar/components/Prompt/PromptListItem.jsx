import React from "react";
import styles from "./PromptListItem.module.css";
import EmojiPickerButton from "../../../common/EmojiPickerButton";
import MoreButton from "./MoreButton";
import { promptListState } from "../../../../recoil/prompt/promptRecoilState";
import { H5 } from "../../../../styles/font-styles";
import { useSetRecoilState } from "recoil";
import { currentPromptState } from "../../../../recoil/prompt/promptRecoilState";

function PromptListItem(props) {
  const setCurrentPrompt = useSetRecoilState(currentPromptState);
  function handleIconClick() {
    console.log("Icon이 클릭되었습니다.");
  }
  function handlePromptClick() {
    setCurrentPrompt({ id: props.promptId, name: props.name });
    console.log(props.promptId);
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
        listPromptAtom={prompt.listPromptAtom}
      />
    </div>
  );
}

export default PromptListItem;
