import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 5px;
  background-color: var(--white);
  padding: 20px;
`;

const IconNName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const EmojiPcikerButton = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--color-gray2);
`;

const Title = styled.div`
  width: 100px;
  height: 22px;
  border-radius: 5px;
  background-color: var(--color-gray2);
`;

const MenuButton = styled.div`
  width: 20px;
  height: 10px;
  border-radius: 5px;
  background-color: var(--color-gray2);
`;

function SkeletonListItem() {
  return (
    <Container>
      <IconNName>
        <EmojiPcikerButton/>
        <Title/>
      </IconNName>
      <MenuButton/>
    </Container>
  );
}

export default SkeletonListItem;
