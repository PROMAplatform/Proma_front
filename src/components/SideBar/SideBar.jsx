import React, { useState } from "react";
import styles from "./SideBar.module.css";
import ChattingList from "./components/Chat/ChattingList";
import Toggle from "./components/Toggle";
import PromptList from "./components/Prompt/PromptList";
import AddButton from "./components/AddButton";
import promaLogoSmall from "../../assets/logos/promaLogoSmall.svg";
import ModalContainer from "../common/ModalContainer";
import ModalButton from "../common/ModalButton";
import { H5 } from "../../styles/font-styles";
import { useChattingRoomHooks } from "../../api/chatting/chatting";

function SideBar() {
  const [isChatting, setIsChatting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomTitle, setRoomTitle] = useState("");
  const { createChattingRoom, getChattingRoomList } = useChattingRoomHooks();
  // const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가

  const handleAddChattingRoom = async () => {
    await createChattingRoom(roomTitle);
    await getChattingRoomList(); // 새로운 채팅방 목록
    setRoomTitle("");
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={promaLogoSmall} alt="logo" />
      <Toggle isChatting={isChatting} setIsChatting={setIsChatting} />
      {isChatting ? (
        <div className={styles.listContainer}>
          <ChattingList />
          <AddButton text="새 채팅 추가하기" onClick={() => setIsModalOpen(true)}/>
        </div>
      ) : (
        <div className={styles.listContainer}>
          <PromptList />
          <AddButton text="새 프롬프트 추가하기" />
        </div>
      )}
      {isModalOpen && <ModalContainer title="새 채팅 추가하기" isOpen={isModalOpen} onClose={closeModal} onSubmit={handleAddChattingRoom}>
        <div className={styles.formGroup}>
          <label htmlFor="roomTitle">
            <H5>채팅방 이름</H5>
          </label>
          <input
            placeholder="채팅방 이름"
            value={roomTitle}
            onChange={(e) => setRoomTitle(e.target.value)}
          />
        </div>
        <ModalButton title="추가하기" type="submit" variant="primary"/>
      </ModalContainer>}
    </div>
  );
}

export default SideBar;
