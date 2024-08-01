import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./PromptMakingSidebar.module.css";
import { H4, B5 } from "../../../styles/font-styles";
import PromptValueBlock from "../components/PromptValueBlock";
import {
  activeBlocksState,
  activeCategoryState,
  availableCategoriesState,
  categoryColorsState,
  blockDetailsState,
  BlockVariant
} from "../../../recoil/prompt/promptRecoilState";
import logo from "../../../assets/logos/promaLogoSmall.svg";
import CreateBlockModal from "./CreateBlockModal";

const PromptMakingSidebar = () => {
  const [activeCategory, setActiveCategory] =
    useRecoilState(activeCategoryState);
  const activeBlocks = useRecoilValue(activeBlocksState);
  const categoryBlock = useRecoilValue(BlockVariant);
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
      <img alt="sideBar 헤더 로고" src={logo} className={styles.promaLogo} />
      <div className={styles.promptTitle}>
        <H4>PROMA prompt</H4>
      </div>
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
              <B5 color="white">{category}</B5>
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
                          <PromptValueBlock 
                            color={categoryColors[activeCategory]} 
                            value={block.blockTitle} 
                            variant={categoryBlock[activeCategory]} 
                            size="medium" 
                          />
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
            onClick={() => setIsModalOpen(true)}
          >
            <B5 color="blockMainColor">블록 만들기</B5>
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
