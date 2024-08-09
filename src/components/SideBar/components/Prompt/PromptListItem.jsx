import React from "react";
import styles from "./PromptListItem.module.css";
import EmojiPickerButton from "../../../common/EmojiPickerButton";
import MoreButton from "./MoreButton";
import { H5 } from "../../../../styles/font-styles";
import { useSetRecoilState } from "recoil";
import { currentPromptState } from "../../../../recoil/prompt/promptRecoilState";

function PromptListItem(props) {
    const setCurrentPrompt = useSetRecoilState(currentPromptState);
    function handlePromptClick() {
        setCurrentPrompt({ id: props.promptId, name: props.name });
        console.log(prompt.promptId);
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
            <MoreButton promptId={props.promptId} />
        </div>
    );
}

export default PromptListItem;
