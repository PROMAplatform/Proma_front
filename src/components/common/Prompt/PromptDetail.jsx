import React, { useEffect } from "react";
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

const PromptDetail = ({ promptId }) => {
  const categoryColors = useRecoilValue(categoryColorsState);
  const categoryBlockShapesArray = useRecoilValue(categoryBlockShapesState);

  const categoryBlockShapes = Array.isArray(categoryBlockShapesArray)
    ? Object.fromEntries(categoryBlockShapesArray)
    : {};
  const promptBlocks = [
    {
      blockCategory: "화자",
      blockDescription: "너는 선생님이야",
      blockId: 1,
      blockValue: "선생님 와라랄라라랄",
    },
    {
      blockCategory: "청자",
      blockDescription: "나는 학생이야",
      blockId: 2,
      blockValue: "학생",
    },
    {
      blockCategory: "지시",
      blockDescription: "한국말로 설명해줘",
      blockId: 3,
      blockValue: "한국말",
    },
    {
      blockCategory: "형식",
      blockDescription: "실생활에서의 예시를 들어 설명해줘",
      blockId: 4,
      blockValue: "실생활",
    },
    {
      blockCategory: "필수",
      blockDescription: "장점과 단점을 꼭 넣어줘",
      blockId: 5,
      blockValue: "장점과 단점",
    },
    {
      blockCategory: "제외",
      blockDescription: "비속어와 욕은 제외하고 대답해줘",
      blockId: 6,
      blockValue: "비속어",
    },
];

  useEffect(() => {
    // promptId로 블록 정보 불러오기
  }, [promptId]); // promptId가 변경될 때마다 이 effect가 실행됩니다

  return (
    <Conatiner>
      {promptBlocks.map((block) => (
        <BlockContainer key={block.blockId}>
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