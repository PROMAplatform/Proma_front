import React from "react";
import { H6 as BaseH6 } from "../../styles/font-styles";
import styled from "styled-components";

const ButtonContainer = styled.button`
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  padding: 10px 50px;
  width: auto;
  margin: 0 auto;
  border: 2px solid var(--block-main-color);
  transition: background-color 0.3s;
  ${({ variant }) =>
    variant === 'primary' &&
    `
    background-color: var(--block-main-color);
    &:hover {
      background-color: #3821CA;
    }
  `}

  ${({ variant }) =>
    variant === 'secondary' &&
    `
    color: var(--block-main-color);
    background-color: var(--white);
    &:hover {
      background-color: var(--color-gray2);
    }
  `}
`;

const H6 = styled(BaseH6)`
  ${({ variant }) =>
    variant === 'primary' &&
    `
    color: var(--white);
  `}

  ${({ variant }) =>
    variant === 'secondary' &&
    `
    color: var(--block-main-color);
  `}
`;

function ModalButton({title, variant}) {
  return (
    <ButtonContainer variant={variant} type="submit" >
      <H6 variant={variant}>{title}</H6>
    </ButtonContainer>
  );
}

export default ModalButton;


