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
  const [textWidth, setTextWidth] = useState(60); // 기본 너비 설정

  useLayoutEffect(() => {
    if (textRef.current) {
      const newWidth = Math.max(textRef.current.offsetWidth + 30, 60); // 텍스트의 너비에 여유 공간을 추가
      setTextWidth(newWidth);
    }
  }, []);

  const FontStyle = sizeMap[size].fontSize;

  const getPath = (variant, width) => {
    switch (variant) {
      case 1:
        return `M${width - 23} 0H23C10.2975 0 0 10.2975 0 23C0 35.7025 10.2975 46 23 46H${width - 23}C${width - 10.2975} 46 ${width} 35.7025 ${width} 23C${width} 10.2975 ${width - 10.2975} 0 ${width - 23} 0Z`;
      case 2:
        return `M${width - 23} 0H12V16.0718L0 9.14355V36.8564L12 29.9282V46H${width - 23}C${width - 10.2975} 46 ${width} 35.7025 ${width} 23C${width} 10.2975 ${width - 10.2975} 0 ${width - 23} 0Z`;
      case 3:
        return `M${width - 23} 0H14V12.5L0 23.5L14 33.5V46H${width - 23}C${width - 10.2975} 46 ${width} 35.7025 ${width} 23C${width} 10.2975 ${width - 10.2975} 0 ${width - 23} 0Z`;
      case 4:
        return `M${width - 23} 0H11.2583V10L0 16.5V29.5L11.2583 36V46H${width - 23}C${width - 10.0391} 46 ${width} 35.7025 ${width} 23C${width} 10.2975 ${width - 10.0391} 0 ${width - 23} 0Z`;
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
        <TextContainer ref={textRef}>
          <FontStyle color="white">{value}</FontStyle>
        </TextContainer>
      </foreignObject>
    </SvgContainer>
  );
};

const PromptValueBlock = styled(SvgContentBlock)``;

export default PromptValueBlock;
