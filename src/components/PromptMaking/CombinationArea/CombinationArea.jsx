import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./CombinationArea.module.css";
import PromptCategoryBlock from "../components/PromptCategoryBlock";
import PromptValueBlock from "../components/PromptValueBlock";
import {H5} from "../../../styles/font-styles";
import saveButtonIcon from "../../../assets/images/saveButtonIcon.svg";
import FinalPromptArea from "../FinalPromptArea/FinalPromptArea";
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
      <div className={styles.title}>
        <H5 color="gray5" >Task/Research PROMA</H5>
        <button onClick={openModal} className={styles.saveButton}>
          <img src={saveButtonIcon} className={styles.saveIcon} alt="save" />
        </button>
      </div>
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
                  variant={categoryBlock[category]}
                />

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
                          >
                            <PromptValueBlock 
                              color={categoryColors[category]} 
                              value={block.blockTitle} 
                              variant={categoryBlock[category]} 
                              size="large" 
                            />
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
      />
    </div>
    </div>
  );
};

export default CombinationArea;
