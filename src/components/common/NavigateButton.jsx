import React from "react";
import { B3 as BaseB3 } from "../../styles/font-styles";
import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  padding: 5px 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  border: 2px solid var(--block-main-color);
  transition: background-color 0.3s;
  cursor: pointer;
  ${({ variant }) =>
    variant === 'primary' &&
    `
    color: var(--white);
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

const B3 = styled(BaseB3)`
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

function NavigateButton({title, variant, onClick}) {
  return (
    <Container variant={variant} onClick={onClick}>
      <B3 variant={variant}>{title}</B3>
    </Container>
  );
}

export default NavigateButton;