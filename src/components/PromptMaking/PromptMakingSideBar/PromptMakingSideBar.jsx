import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./PromptMakingSidebar.module.css";
import {
  activeBlocksState,
  activeCategoryState,
  availableCategoriesState,
  categoryColorsState,
  blockDetailsState,
} from "../../../recoil/prompt/promptRecoilState";
import logo from "../../../../src/assets/logos/Sidebar_Header.png";
import CreateBlockModal from "./CreateBlockModal";

const PromptMakingSidebar = () => {
  const [activeCategory, setActiveCategory] =
    useRecoilState(activeCategoryState);
  const activeBlocks = useRecoilValue(activeBlocksState);
  const categories = useRecoilValue(availableCategoriesState);
  const categoryColors = useRecoilValue(categoryColorsState);
  const blockDetails = useRecoilValue(blockDetailsState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBlock = (category, blockData) => {
    // 이 함수는 새로운 블록 추가 로직에 맞게 수정해야 할 수 있습니다.
    //TODO- 블록 추가 로직
    console.log("Adding new block:", category, blockData);
  };

  const getActiveColor = () => {
    return categoryColors[activeCategory] || "purple";
  };

  return (
    <div className={styles.container}>
      <img alt="sideBar 헤더 로고" src={logo} />
      <div className={styles.sidebar}>
        <div className={styles.categories}>
          {categories.map((category) => (
            <div
              key={category}
              className={`${styles.category} ${
                activeCategory === category ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(category)}
              style={{
                "--category-color": categoryColors[category],
                "--category-active-color": `${categoryColors[category]}33`,
              }}
            >
              {category}
            </div>
          ))}
        </div>
        <div
          className={styles.blocksContainer}
          style={{ "--active-color": getActiveColor() }}
        >
          <Droppable droppableId="sidebar">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.blocks}
              >
                {activeBlocks[activeCategory]?.map((blockId, index) => {
                  const block = blockDetails[blockId];
                  return (
                    <Draggable
                      key={blockId}
                      draggableId={`${blockId}|${activeCategory}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={styles.block}
                        >
                          <div className={styles.blockTitle}>
                            {block.blockTitle}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <button
            className={styles.addButton}
            style={{ "--active-color": getActiveColor() }}
            onClick={() => setIsModalOpen(true)}
          >
            블록 만들기
          </button>
        </div>
        <CreateBlockModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddBlock={handleAddBlock}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default PromptMakingSidebar;
