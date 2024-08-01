import React, { useRef, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { B2, B4, B6 } from "../../../styles/font-styles";

const sizeMap = {
  small: {
    scale: 0.6,
    fontSize: B6,
  },
  medium: {
    scale: 0.8,
    fontSize: B4,
  },
  large: {
    scale: 1,
    fontSize: B2,
  },
};

const SvgContainer = styled.svg`
  height: 46px;
  display: flex;
  align-items: center;
  text-align: center;
  transform: scale(${({ size }) => sizeMap[size].scale});
  transform-origin: left;
  width: ${({ width }) => width}px;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  white-space: nowrap;
`;

const SvgContentBlock = ({ color, variant, value, size = "medium" }) => {
  const textRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0); // 기본 너비 설정

  useLayoutEffect(() => {
    if (textRef.current) {
      const newWidth = textRef.current.offsetWidth + 40; // 텍스트의 너비에 여유 공간을 추가
      setTextWidth(newWidth);
    }
  }, [value]);

  const FontStyle = sizeMap[size].fontSize;

  const getPath = (variant, width) => {
    switch (variant) {
      case 1:
        return `M${width - 23} 0H11L11 23L11 12C8.08261 12 5.28472 13.1589 3.22182 15.2218C1.15892 17.2847 0 20.0826 0 23C0 25.9174 1.15893 28.7153 3.22183 30.7782C5.28473 32.8411 8.08262 34 11 34L11 46H${width - 23}C${width - 10.2975} 46 ${width} 35.7025 ${width} 23C${width} 10.2975 ${width - 10.2975} 0 ${width - 23} 0Z`;
      case 2:
        return `M${width - 23} 0H11V16.3509L0 10V35.4034L11 29.0526V46H${width - 23}C${width - 10.2975} 46 ${width} 35.7025 ${width} 23C${width} 10.2975 ${width - 10.2975} 0 ${width - 23} 0Z`;
      case 3:
        return `M${width - 23} 0H11V15L0 23.6429L11 31.5V46H${width - 23}C${width - 10.2975} 46 ${width} 35.7025 ${width} 23C${width} 10.2975 ${width - 10.2975} 0 ${width - 23} 0Z`;
      case 4:
        return `M${width - 23} 0H11V10L0 16.3509V29.0526L11 35.4034V46H${width - 23}C${width - 10.2975} 46 ${width} 35.7025 ${width} 23C${width} 10.2975 ${width - 10.2975} 0 ${width - 23} 0Z`;
      case 5:
        return `M${width - 23} 0H11V13H0V33H11V46H${width - 23}C${width - 10.2975} 46 ${width} 35.7025 ${width} 23C${width} 10.2975 ${width - 10.2975} 0 ${width - 23} 0Z`;
      case 6:
        return `M${width - 23} 0H11V13H0V33H11V46H${width - 23}C${width - 10.2975} 46 ${width} 35.7025 ${width} 23C${width} 10.2975 ${width - 10.2975} 0 ${width - 23} 0Z`;
      default:
        return "";
    }
  };

  return (
    <SvgContainer size={size} width={textWidth} viewBox={`0 0 ${textWidth} 46`}>
      <path fillRule="evenodd" clipRule="evenodd" d={getPath(variant, textWidth)} fill={color} />
      <foreignObject x="0" y="0" width={textWidth} height="46">
        <TextContainer>
          <FontStyle color="white" ref={textRef}>{value}</FontStyle>
        </TextContainer>
      </foreignObject>
    </SvgContainer>
  );
};

const PromptValueBlock = styled(SvgContentBlock)``;

export default PromptValueBlock;
