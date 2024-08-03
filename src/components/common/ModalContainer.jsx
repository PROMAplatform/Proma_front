import React from "react";
import useModal from "../../hooks/useModal";
import styled from "styled-components";
import CustomIconButton from "./CustomIconButton";
import { ReactComponent as ExitIcon} from "../../assets/images/exitIcon.svg";
import { H3 } from "../../styles/font-styles";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Container = styled.div`
  background-color: var(--white);
  padding: 35px;
  border-radius: 20px;
  max-width: 500px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  position: relative;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ExitIconContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 30px;
  height: 30px;
  margin: 0;
  padding: 0;
`;

function ModalContainer({isOpen, onClose, title, onSubmit, children}) {
  const { isModalOpen, setIsModalOpen, handleOverlayClick } = useModal(isOpen, onClose);
  if (!isModalOpen) return null;

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <Container>
        <H3>{title}</H3>
        <ExitIconContainer>
          <CustomIconButton icon={ExitIcon} onClick={closeModal} />
        </ExitIconContainer>
        <FormContainer onSubmit={onSubmit}>
          {children}
        </FormContainer>
      </Container>
    </ModalOverlay>
  );
}

export default ModalContainer;