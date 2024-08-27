import React, { useState } from "react";
import { ReactComponent as TrashIcon } from "../../../../assets/images/trashIcon.svg";
import styles from "./ChattingListItme.module.css";
import EmojiPcikerButton from "../../../common/EmojiPickerButton";
import CustomIconButton from "../../../common/CustomIconButton";
import { H5 } from "../../../../styles/font-styles";
import DeleteChattingModal from "./Modal/DeleteChattingRoomModal";

function ChattingListItem(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={styles.container} onClick={props.onClick}>
            <div className={styles.IconNName}>
                <EmojiPcikerButton
                    isPromptEmoji={false}
                    roomId={props.roomId}
                    emoji={props.emoji}
                />
                <div className={styles.titleWrapper}>
                    <H5>{props.chatRoomTitle}</H5>
                </div>
            </div>
            <CustomIconButton
                icon={TrashIcon}
                onClick={() => setIsModalOpen(true)}
            />
            <DeleteChattingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                roomId={props.roomId}
            />
        </div>
    );
}

export default ChattingListItem;
