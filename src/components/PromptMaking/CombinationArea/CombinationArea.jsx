import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./CombinationArea.module.css";
import PromptCategoryBlock from "../../common/Prompt/PromptCategoryBlock";
import PromptValueBlock from "../../common/Prompt/PromptValueBlock";
import { H2, H5 } from "../../../styles/font-styles";
import saveButtonIcon from "../../../assets/images/saveButtonIcon.svg";
import FinalPromptArea from "../FinalPromptArea/FinalPromptArea";
import {
  combinationsState,
  categoryColorsState,
  refinedPromptPartsState,
  blockDetailsState,
  availableCategoriesState,
  categoryBlockShapesState,
  promptMethodState,
  promptListState,
} from "../../../recoil/prompt/promptRecoilState";
import SavePromptModal from "./SavePromptModal";

const CombinationArea = ({ promptId }) => {
  const [combinations, setCombinations] = useRecoilState(combinationsState);
  const promptMethod = useRecoilValue(promptMethodState);
  const categoryColors = useRecoilValue(categoryColorsState);
  const categoryBlockShapes = useRecoilValue(categoryBlockShapesState);
  const refinedPromptParts = useRecoilValue(refinedPromptPartsState);
  const blockDetails = useRecoilValue(blockDetailsState);
  const categories = useRecoilValue(availableCategoriesState);
  const promptList = useRecoilValue(promptListState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const prompt = promptList.find((p) => p.promptId === promptId);
    if (prompt) {
      const { listPromptAtom } = prompt;
      if (Array.isArray(listPromptAtom)) {
        const newCombinations = {};
        listPromptAtom.forEach((block) => {
          newCombinations[block.blockCategory] = block.blockId;
        });
        setCombinations(newCombinations);
      }
    }
  }, [promptId, promptList, blockDetails, setCombinations]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <H5 color="gray5">{promptMethod} PROMA</H5>
        <button onClick={openModal} className={styles.saveButton}>
          <img src={saveButtonIcon} className={styles.saveIcon} alt="save" />
        </button>
      </div>
      <div className={styles.combinationArea}>
        <H2 color="gray3" className={styles.dropYourBlocks}>
          이 곳에 블록을 끌어넣어보아요!
          <hr style={{ visibility: "hidden" }} />
          Drop your blocks!
        </H2>
        <div className={styles.categoryList}>
          {categories.map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${styles.categoryItem} ${
                    snapshot.isDraggingOver ? styles.draggingOver : ""
                  }`}
                  style={{
                    ...(snapshot.isDraggingOver && {
                      backgroundColor: "var(--color-gray3)",
                      border: `2px dashed ${categoryColors[category]}`,
                    }),
                  }}
                >
                  <PromptCategoryBlock
                    category={category}
                    color={categoryColors[category]}
                    variant={categoryBlockShapes[category]}
                  />
                  <div className={styles.categoryValue}>
                    {combinations[category] ? (
                      <Draggable
                        key={`${combinations[category]}-${category}`}
                        draggableId={`${combinations[category]}|${category}`}
                        index={0}
                      >
                        {(provided, snapshot) => {
                          const block = blockDetails[combinations[category]];
                          if (!block) return null;
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={styles.block}
                            >
                              <PromptValueBlock
                                color={categoryColors[category]}
                                value={block.blockValue}
                                variant={categoryBlockShapes[category]}
                                size="large"
                              />
                              {/* <div>{block.blockValue}</div> */}
                            </div>
                          );
                        }}
                      </Draggable>
                    ) : (
                      <></>
                    )}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
          <FinalPromptArea />
        </div>
        <SavePromptModal
          isOpen={isModalOpen}
          onClose={closeModal}
          combinations={combinations}
          refinedPromptParts={refinedPromptParts}
          promptId={promptId}
        />
      </div>
    </div>
  );
};

export default CombinationArea;
