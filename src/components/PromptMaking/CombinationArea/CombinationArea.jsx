import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./CombinationArea.module.css";
import {
  combinationsState,
  categoryColorsState,
  refinedPromptPartsState,
} from "../../../recoil/prompt/promptRecoilState";
import SavePromptModal from "./SavePromptModal";

const CombinationArea = () => {
  const combinations = useRecoilValue(combinationsState);
  const categoryColors = useRecoilValue(categoryColorsState);
  const refinedPromptParts = useRecoilValue(refinedPromptPartsState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.combinationArea}>
      <button onClick={openModal}>프롬프트 저장하기</button>
      <h2 className={styles.title}>질문형 proma</h2>
      <div className={styles.categoryList}>
        {Object.entries(combinations).map(([category, value]) => (
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
                  {value ? (
                    <Draggable draggableId={`${value}|${category}`} index={0}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={styles.draggableItem}
                          style={{
                            ...provided.draggableProps.style,
                            backgroundColor: snapshot.isDragging
                              ? `${categoryColors[category]}88`
                              : `${categoryColors[category]}`,
                            color: snapshot.isDragging ? "white" : "black",
                            boxShadow: snapshot.isDragging
                              ? "0 5px 10px rgba(0, 0, 0, 0.2)"
                              : "none",
                          }}
                        >
                          {value}
                        </div>
                      )}
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
