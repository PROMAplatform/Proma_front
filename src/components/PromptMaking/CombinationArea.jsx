import React from "react";
import { useRecoilValue } from "recoil";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./CombinationArea.module.css";
import {
  combinationsState,
  categoryColorsState,
} from "../../recoil/prompt/promptRecoilState";

const CombinationArea = () => {
  const combinations = useRecoilValue(combinationsState);
  const categoryColors = useRecoilValue(categoryColorsState);

  return (
    <div className={styles.combinationArea}>
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
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={styles.draggableItem}
                          style={{
                            ...provided.draggableProps.style,
                            backgroundColor: snapshot.isDragging
                              ? `${categoryColors[category]}` // 드래그 중일 때 더 투명하게
                              : `${categoryColors[category]}`, // 기본 상태
                            color: snapshot.isDragging ? "white" : "black", // 드래그 중일 때 텍스트 색상 변경
                            boxShadow: snapshot.isDragging
                              ? "0 5px 10px rgba(0, 0, 0, 0.2)"
                              : "none", // 드래그 중일 때 그림자 효과
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
    </div>
  );
};

export default CombinationArea;
