import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./CombinationArea.module.css";
import PromptCategoryBlock from "../components/PromptCategoryBlock";
import PromptValueBlock from "../components/PromptValueBlock";
import {H5, H6} from "../../../styles/font-styles";
import {
  combinationsState,
  categoryColorsState,
  refinedPromptPartsState,
  blockDetailsState,
  availableCategoriesState,
  BlockVariant
} from "../../../recoil/prompt/promptRecoilState";
import SavePromptModal from "./SavePromptModal";

const CombinationArea = () => {
  const combinations = useRecoilValue(combinationsState);
  const categoryColors = useRecoilValue(categoryColorsState);
  const categoryBlock = useRecoilValue(BlockVariant);
  const refinedPromptParts = useRecoilValue(refinedPromptPartsState);
  const blockDetails = useRecoilValue(blockDetailsState);
  const categories = useRecoilValue(availableCategoriesState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.container}>
      <H5 color="gray5" className={styles.title}>질문형 PROMA</H5>
      <button onClick={openModal} className={styles.saveButton}>
        프롬프트 저장하기
      </button>
      
      <div className={styles.combinationArea}>
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
              >
                <PromptCategoryBlock category={category} color={categoryColors[category]} variant={categoryBlock[category]}/>

                <div className={styles.categoryValue}>
                  {combinations[category] ? (
                    <Draggable
                      draggableId={`${combinations[category]}|${category}`}
                      index={0}
                    >
                      {(provided, snapshot) => {
                        const block = blockDetails[combinations[category]];
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              boxShadow: snapshot.isDragging
                                ? "0 5px 10px rgba(0, 0, 0, 0.2)"
                                : "none",
                            }}
                          >
                            <PromptValueBlock color={categoryColors[category]} value={block.blockTitle} variant={categoryBlock[category]} size="large" />
                          </div>
                        );
                      }}
                    </Draggable>
                  ) : (
                    <span className={styles.emptyValue}>여기에 드롭하세요</span>
                  )}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
      <SavePromptModal
        isOpen={isModalOpen}
        onClose={closeModal}
        combinations={combinations}
        refinedPromptParts={refinedPromptParts}
      />
    </div>
    </div>
  );
};

export default CombinationArea;
