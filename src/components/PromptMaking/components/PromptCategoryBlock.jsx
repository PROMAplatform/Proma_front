import React from "react";
import styled from "styled-components";
import {B2} from "../../../styles/font-styles";

const SvgContainer = styled.svg`
  width: 80px;
  height: 46px;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SvgBlock = ({color, category, variant}) => {
  const getPath = (variant) => {
    switch (variant) {
      case 1:
        return "M23 0C10.2975 0 0 10.2975 0 23C0 35.7025 10.2975 46 23 46H80V34C77.0826 34 74.2847 32.8411 72.2218 30.7782C70.1589 28.7153 69 25.9174 69 23C69 20.0826 70.1589 17.2847 72.2218 15.2218C74.2847 13.1589 77.0826 12 80 12L80 0H23Z";
      case 2:
        return "M23 0C10.2975 0 0 10.2975 0 23C0 35.7025 10.2975 46 23 46H80V29.0526L69 35.4034V10L80 16.3509V0H23Z";
      case 3:
        return "M23 0C10.2975 0 0 10.2975 0 23C0 35.7025 10.2975 46 23 46H80V31.5L69 23.6429L80 15V0H23Z";
      case 4:
        return "M23 0C10.2975 0 0 10.2975 0 23C0 35.7025 10.2975 46 23 46H80V35.4034L69 29.0526V16.3509L80 10V0H23Z";
      case 5:
        return "M23 0C10.2975 0 0 10.2975 0 23C0 35.7025 10.2975 46 23 46H80V33H69V13H80V0H23Z";
      case 6:
        return "M23 0C10.2975 0 0 10.2975 0 23C0 35.7025 10.2975 46 23 46H80V33H69V13H80V0H23Z";
      default:
        return ;
    }
  }
  return (
    <SvgContainer viewBox="0 0 80 46">
      <path fillRule="evenodd" clipRule="evenodd" d={getPath(variant)} fill={color} />
      <foreignObject x="0" y="0" width="80" height="46">
        <TextContainer>
          <B2 color="white">{category}</B2>
        </TextContainer>
      </foreignObject>
    </SvgContainer>
  );
}


const PromptCategoryBlock = styled(SvgBlock)``;

export default PromptCategoryBlock;
