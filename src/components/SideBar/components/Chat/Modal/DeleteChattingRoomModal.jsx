import React from "react";
import styled from "styled-components";
import ModalContainer from "../../../../common/ModalContainer";
import ModalButton from "../../../../common/ModalButton";
import { B3 } from "../../../../../styles/font-styles";
import { useSetRecoilState } from "recoil";
import { chattingRoomListState } from "../../../../../recoil/chatting/chattingRecoilState";
import { useChattingRoomHooks } from "../../../../../api/chatting/chatting";

const ButtonContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
  > * {
    margin: 0 !important;
  }
`;

function DeleteChattingModal({
  isOpen, 
  onClose, 
  roomId
}) {
  const setChattingRoomList = useSetRecoilState(chattingRoomListState);
  const { deleteChattingRoom } = useChattingRoomHooks();


  if (!isOpen) return null;

  const handleDeleteClick = async () => {
    await deleteChattingRoom(roomId);
    setChattingRoomList((oldRoomList) => {
      return oldRoomList.filter((room) => room.roomId !== roomId);
    });
    onClose();
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} title="채팅방을 삭제하시겠습니까?" onSubmit={handleDeleteClick} exitButton={false}>
      <B3>해당 채팅방의 기록이 완전히 삭제됩니다.</B3>
      <ButtonContainer>
        <ModalButton title="취소" variant="secondary" size="small" onClick={onClose}/>
        <ModalButton title="삭제" variant="primary" size="small" type="submit"/>
      </ButtonContainer>
     
    </ModalContainer>
  );
}

export default DeleteChattingModal;