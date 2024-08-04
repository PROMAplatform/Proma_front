import React from "react";
import styled from "styled-components";
import { H5 } from "../../../../styles/font-styles";

const Container = styled.div`
  width: 25%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border-radius: 30px;
  background-color: ${({ isSelected }) =>
    isSelected ? "var(--logo-purple1)" : "var(--color-gray1)"};
  &:hover {
    transform: scale(1.1);
    transition: 0.2s;
  }
`;

const Icon = styled.img`
  width: 30px;
`;

function PromptMethodButton({ icon, type, onClick, isSelected }) {
  return (
    <Container onClick={onClick} isSelected={isSelected}>
      <Icon src={icon} alt="type icon" />
      <H5>{type}</H5>
    </Container>
  );
}

export default PromptMethodButton;
