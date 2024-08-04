import React from "react";
import styled from "styled-components";
import ModalContainer from "../../../../common/ModalContainer";
import ModalButton from "../../../../common/ModalButton";
import { B3 } from "../../../../../styles/font-styles";
import { useSetRecoilState } from "recoil";
import { promptListState } from "../../../../../recoil/prompt/promptRecoilState";
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

function DeletePromptModal({
  isOpen, 
  onClose, 
  promptId, 
  promptTitle
}) {
  const setPromptList = useSetRecoilState(promptListState);
  const { deletePrompt } = useChattingRoomHooks();

  if (!isOpen) return null;

  const handleDeleteClick = () => {
    deletePrompt(promptId);
    setPromptList((oldPromptList) => {
      return oldPromptList.filter((prompt) => prompt.promptId !== promptId);
    });
    onClose();
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} title="프롬프트를 삭제하시겠습니까?" onSubmit={handleDeleteClick} exitButton={false}>
      <B3>[{promptTitle}] 프롬프트가 완전히 지워집니다.</B3>
      <ButtonContainer>
        <ModalButton title="취소" variant="secondary" size="small" onClick={onClose}/>
        <ModalButton title="삭제" variant="primary" size="small" type="submit"/>
      </ButtonContainer>
     
    </ModalContainer>
  );
}

export default DeletePromptModal;