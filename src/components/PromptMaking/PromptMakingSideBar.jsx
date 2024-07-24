import React from "react";
import { useRecoilState } from "recoil";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./PromptMakingSidebar.module.css";
import {
  activeBlocksState,
  activeCategoryState,
} from "../../recoil/prompt/promptRecoilState";
import logo from "../../../src/assets/logos/Sidebar_Header.png";

const categories = [
  { name: "역할", color: "red" },
  { name: "형식", color: "orange" },
  { name: "지시", color: "yellow" },
  { name: "참고", color: "green" },
  { name: "필수", color: "blue" },
  { name: "제외", color: "indigo" },
];

const PromptMakingSidebar = () => {
  const [activeCategory, setActiveCategory] =
    useRecoilState(activeCategoryState);
  const [activeBlocks] = useRecoilState(activeBlocksState);

  const getActiveColor = () => {
    return (
      categories.find((category) => category.name === activeCategory)?.color ||
      "purple"
    );
  };

  return (
    <div className={styles.container}>
      <img alt="sideBar 헤더 로고" src={logo} />
      <div className={styles.sidebar}>
        <div className={styles.categories}>
          {categories.map((category) => (
            <div
              key={category.name}
              className={`${styles.category} ${
                activeCategory === category.name ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(category.name)}
              style={{
                "--category-color": category.color,
                "--category-active-color": `${category.color}33`,
              }}
            >
              {category.name}
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
                {activeBlocks[activeCategory].map((block, index) => (
                  <Draggable
                    key={`${block}|${activeCategory}`}
                    draggableId={`${block}|${activeCategory}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.block}
                      >
                        {block}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <button
            className={styles.addButton}
            style={{ "--active-color": getActiveColor() }}
          >
            블록 만들기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptMakingSidebar;
