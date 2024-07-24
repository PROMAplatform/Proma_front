import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./CombinationArea.module.css";
import {
  combinationsState,
  categoryColorsState,
  refinedPromptPartsState,
  blockDetailsState,
  availableCategoriesState,
} from "../../../recoil/prompt/promptRecoilState";
import SavePromptModal from "./SavePromptModal";

const CombinationArea = () => {
  const combinations = useRecoilValue(combinationsState);
  const categoryColors = useRecoilValue(categoryColorsState);
  const refinedPromptParts = useRecoilValue(refinedPromptPartsState);
  const blockDetails = useRecoilValue(blockDetailsState);
  const categories = useRecoilValue(availableCategoriesState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.combinationArea}>
      <button onClick={openModal} className={styles.saveButton}>
        프롬프트 저장하기
      </button>
      <h2 className={styles.title}>질문형 proma</h2>
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
                style={{ borderColor: categoryColors[category] }}
              >
                <span
                  className={styles.categoryName}
                  style={{ color: categoryColors[category] }}
                >
                  {category}:
                </span>
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
                            className={styles.draggableItem}
                            style={{
                              ...provided.draggableProps.style,
                              backgroundColor: snapshot.isDragging
                                ? `${categoryColors[category]}`
                                : `${categoryColors[category]}`,
                              boxShadow: snapshot.isDragging
                                ? "0 5px 10px rgba(0, 0, 0, 0.2)"
                                : "none",
                            }}
                          >
                            <div className={styles.blockTitle}>
                              {block.blockTitle}
                            </div>
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
  );
};

export default CombinationArea;
