import React, { useState } from "react";
import styles from "./SideBar.module.css";
import ChattingList from "./components/Chat/ChattingList";
import Toggle from "./components/Toggle";
import PromptList from "./components/Prompt/PromptList";
import AddButton from "./components/AddButton";
import promaLogoSmall from "../../assets/logos/promaLogoSmall.svg";
import CreatePromptModal from "./components/Prompt/Modal/CreatePromptModal";
import { useChattingRoomHooks } from "../../api/chatting/chatting";

function SideBar() {
    const [isChatting, setIsChatting] = useState(false);
    const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
    const { createChattingRoom, getChattingRoomList } = useChattingRoomHooks();
    // const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가

    const handleAddChattingRoom = async () => {
        await createChattingRoom();
        await getChattingRoomList(); // 새로운 채팅방 목록
    };

    const closePromptModal = () => {
        setIsPromptModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <img className={styles.logo} src={promaLogoSmall} alt="logo" />
            <Toggle isChatting={isChatting} setIsChatting={setIsChatting} />
            {isChatting ? (
                <div className={styles.listContainer}>
                    <ChattingList />
                    <div onClick={handleAddChattingRoom}>
                        <AddButton text="새 채팅 추가하기" />
                    </div>
                </div>
            ) : (
                <div className={styles.listContainer}>
                    <PromptList />
                    <AddButton
                        text="새 프롬프트 추가하기"
                        onClick={() => setIsPromptModalOpen(true)}
                    />
                </div>
            )}
            <CreatePromptModal
                isOpen={isPromptModalOpen}
                onClose={closePromptModal}
            />
        </div>
    );
}

export default SideBar;
