import React, { useRef, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { B2, B3, B4 } from "../../../styles/font-styles";

const sizeMap = {
  small: {
    scale: 0.6,
    fontStyle: B4,
  },
  medium: {
    scale: 0.8,
    fontStyle: B3,
  },
  large: {
    scale: 1,
    fontStyle: B2,
  },
};

const SvgContainer = styled.svg`
  display: inline-block;
  vertical-align: middle;
  transform-origin: left;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  white-space: nowrap;
`;

const SvgBlock = ({ color, category, variant, size = "large" }) => {
  const textRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0); // 기본 너비 설정

  const scale = sizeMap[size].scale;
  const height = 46;

  useLayoutEffect(() => {
    if (textRef.current) {
      const newWidth = textRef.current.offsetWidth + 40; // 텍스트의 너비에 여유 공간을 추가
      setTextWidth(newWidth);
    }
  }, [category]);

  const FontStyle = sizeMap[size].fontStyle;

  const getPath = (variant, width) => {
    switch (variant) {
      case 1:
        return `M23 0C10.2975 0 0 10.2975 0 23C0 35.7025 10.2975 46 23 46H${width}V34C${
          width - 2.91738
        } 34 ${width - 5.71528} 32.8411 ${width - 7.77818} 30.7782C${
          width - 9.84108
        } 28.7153 ${width - 11} 25.9174 ${width - 11} 23C${
          width - 11
        } 20.0826 ${width - 9.84108} 17.2847 ${width - 7.77818} 15.2218C${
          width - 5.71528
        } 13.1589 ${width - 2.91738} 12 ${width} 12L${width} 0H23Z`;
      case 2:
        return `M23 0C10.2975 0 0 10.2975 0 23C0 35.7025 10.2975 46 23 46H${width}V29.0526L${
          width - 11
        } 35.4034V10L${width} 16.3509V0H23Z`;
      case 3:
        return `M23 0C10.2975 0 0 10.2975 0 23C0 35.7025 10.2975 46 23 46H${width}V31.5L${
          width - 11
        } 23.6429L${width} 15V0H23Z`;
      case 4:
        return `M23 0C10.2975 0 0 10.2975 0 23C0 35.7025 10.2975 46 23 46H${width}V35.4034L${
          width - 11
        } 29.0526V16.3509L${width} 10V0H23Z`;
      case 5:
        return `M23 0C10.2975 0 0 10.2975 0 23C0 35.7025 10.2975 46 23 46H${width}V33H${
          width - 11
        }V13H${width}V0H23Z`;
      case 6:
        return `M23 0C10.2975 0 0 10.2975 0 23C0 35.7025 10.2975 46 23 46H${width}V33H${
          width - 11
        }V13H${width}V0H23Z`;
      case 7:
        return `M23 0C10.2975 0 0 10.2975 0 23C0 35.7025 10.2975 46 23 46H${width}V32.5263H${width - 5.5}L${width - 11} 23L${width - 5.5} 13.4737H${width}V0H23Z`;

      default:
        return "";
    }
  };
  return (
    <SvgContainer
      size={size}
      width={textWidth * scale}
      height={height * scale}
      viewBox={`0 0 ${textWidth} ${height}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d={getPath(variant, textWidth)}
        fill={color}
      />
      <foreignObject x="0" y="0" width={textWidth} height={height}>
        <TextContainer>
          <FontStyle color="white" ref={textRef}>
            {category}
          </FontStyle>
        </TextContainer>
      </foreignObject>
    </SvgContainer>
  );
};

const PromptCategoryBlock = styled(SvgBlock)``;

export default PromptCategoryBlock;
