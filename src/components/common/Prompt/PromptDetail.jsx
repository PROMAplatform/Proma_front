import React from "react";
import PromptCategoryBlock from "./PromptCategoryBlock";
import PromptValueBlock from "./PromptValueBlock";
import styled from "styled-components";

const Conatiner = styled.div`
  display: flex;
  flex-direction: column;
`;

const BlockContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
`;

const ValueBlockContainer = styled.div`
  position: relative;
  left: -6.65px;
  display: flex;
  align-items: center;
`;

const PromptDetail = ({ listPromptAtom }) => {
  const predefinedColors = [
    "var(--block-main-color)",
    "var(--block-purple)",
    "var(--block-pink)",
    "var(--block-red)",
    "var(--block-orange)",
    "var(--block-green)",
    "var(--block-blue)"
  ];

  const predefinedBlockShapes = [1, 2, 3, 4, 5, 6, 7];

  const categoryStyles = {};
  const categories = [...new Set(listPromptAtom.map(block => block.blockCategory))];

  categories.forEach((category, index) => {
    categoryStyles[category] = {
      color: predefinedColors[index % predefinedColors.length],
      shape: predefinedBlockShapes[index % predefinedBlockShapes.length]
    };
  });

  return (
    <Conatiner>
      {listPromptAtom.map((block) => (
        <BlockContainer key={`${block.blockId}-${block.blockCategory}`}>
          <PromptCategoryBlock
            color={categoryStyles[block.blockCategory].color} 
            variant={categoryStyles[block.blockCategory].shape}
            category={block.blockCategory}
            size="small"
          />
          <ValueBlockContainer>
            <PromptValueBlock
              color={categoryStyles[block.blockCategory].color} 
              variant={categoryStyles[block.blockCategory].shape}
              value={block.blockValue}
              size="small"
            />
          </ValueBlockContainer>
        </BlockContainer>
      ))}
    </Conatiner>
  );
}

export default PromptDetail;