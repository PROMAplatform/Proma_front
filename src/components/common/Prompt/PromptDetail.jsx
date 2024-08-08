import React from "react";
import PromptCategoryBlock from "./PromptCategoryBlock";
import PromptValueBlock from "./PromptValueBlock";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { categoryColorsState, categoryBlockShapesState } from "../../../recoil/prompt/promptRecoilState";

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
  const categoryColors = useRecoilValue(categoryColorsState);
  const categoryBlockShapesArray = useRecoilValue(categoryBlockShapesState);

  const categoryBlockShapes = Array.isArray(categoryBlockShapesArray)
    ? Object.fromEntries(categoryBlockShapesArray)
    : {};

  return (
    <Conatiner>
      {listPromptAtom.map((block) => (
        <BlockContainer key={`${block.blockId}-${block.blockCategory}`}>
          <PromptCategoryBlock 
            color={categoryColors[block.blockCategory]} 
            variant={categoryBlockShapes[block.blockCategory]} 
            category={block.blockCategory} 
            size="small"
          />
          <ValueBlockContainer>
            <PromptValueBlock 
              color={categoryColors[block.blockCategory]} 
              variant={categoryBlockShapes[block.blockCategory]}
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