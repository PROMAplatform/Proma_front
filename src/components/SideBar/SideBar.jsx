import React, { useState } from "react";
import styles from "./SideBar.module.css";
import ChattingList from "./components/Chat/ChattingList";
import Toggle from "./components/Toggle";
import PromptList from "./components/Prompt/PromptList";
import AddButton from "./components/AddButton";
import promaLogoSmall from "../../assets/logos/promaLogoSmall.svg";
import ModalContainer from "../common/ModalContainer";
import ModalButton from "../common/ModalButton";
import CreatePromptModal from "./components/Prompt/Modal/CreatePromptModal";
import { H5 } from "../../styles/font-styles";
import { useChattingRoomHooks } from "../../api/chatting/chatting";

function SideBar() {
  const [isChatting, setIsChatting] = useState(false);
  const [isChattingModalOpen, setIsChattingModalOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [roomTitle, setRoomTitle] = useState("");
  const { createChattingRoom, getChattingRoomList } = useChattingRoomHooks();
  // const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가

  const handleAddChattingRoom = async () => {
    await createChattingRoom(roomTitle);
    await getChattingRoomList(); // 새로운 채팅방 목록
    setRoomTitle("");
    setIsChattingModalOpen(false);
  };

  const closeChattingModal = () => {
    setIsChattingModalOpen(false);
  }

  const closePromptModal = () => {
    setIsPromptModalOpen(false);
  }

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={promaLogoSmall} alt="logo" />
      <Toggle isChatting={isChatting} setIsChatting={setIsChatting} />
      {isChatting ? (
        <div className={styles.listContainer}>
          <ChattingList />
          <AddButton text="새 채팅 추가하기" onClick={() => setIsChattingModalOpen(true)}/>
        </div>
      ) : (
        <div className={styles.listContainer}>
          <PromptList />
          <AddButton text="새 프롬프트 추가하기" onClick={() => setIsPromptModalOpen(true)}/>
        </div>
      )}
      {isChattingModalOpen && <ModalContainer title="새 채팅 추가하기" isOpen={isChattingModalOpen} onClose={closeChattingModal} onSubmit={handleAddChattingRoom}>
        <div className={styles.formGroup}>
          <label htmlFor="roomTitle">
            <H5>채팅방 이름</H5>
          </label>
          <input
            placeholder="이름을 입력하세요."
            value={roomTitle}
            onChange={(e) => setRoomTitle(e.target.value)}
          />
        </div>
        <ModalButton title="추가하기" type="submit" variant="primary"/>
      </ModalContainer>}
      {isPromptModalOpen && <CreatePromptModal isOpen={isPromptModalOpen} onClose={closePromptModal}/>}
    </div>
  );
}

export default SideBar;
