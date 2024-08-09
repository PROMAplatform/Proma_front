import React from 'react';
import PromptCategoryBlock from "../../../common/Prompt/PromptCategoryBlock";
import PromptValueBlock from "../../../common/Prompt/PromptValueBlock";
import styled from "styled-components";

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


function MakeBlockPreview({categoryStyles, block, size}) {
    return (
        <>
            <BlockContainer key={`${block.blockId}-${block.blockCategory}`}>
                <PromptCategoryBlock
                    color={categoryStyles[block.blockCategory].color}
                    variant={categoryStyles[block.blockCategory].shape}
                    category={block.blockCategory}
                    size={size}
                />
                <ValueBlockContainer>
                    <PromptValueBlock
                        color={categoryStyles[block.blockCategory].color}
                        variant={categoryStyles[block.blockCategory].shape}
                        value={block.blockValue}
                        size={size}
                    />
                </ValueBlockContainer>
            </BlockContainer>
        </>
    );
}

export default MakeBlockPreview;
