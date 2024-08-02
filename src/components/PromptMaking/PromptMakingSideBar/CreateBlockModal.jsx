import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { H3, H5, B4 } from "../../../styles/font-styles";
import { availableCategoriesState } from "../../../recoil/prompt/promptRecoilState";
import styles from "./CreateBlockModal.module.css";
import exitIcon from "../../../assets/images/exitIcon.svg";
import ModalButton from "../../common/ModalButton";
import {
  categoryColorsState,
} from "../../../recoil/prompt/promptRecoilState";

const CreateBlockModal = ({ isOpen, onClose, onAddBlock }) => {
  const categories = useRecoilValue(availableCategoriesState);
  const categoryColors = useRecoilValue(categoryColorsState);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [blockTitle, setBlockTitle] = useState("");
  const [blockDescription, setBlockDescription] = useState("");

  if (!isOpen) return null;

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlock = {
      blockTitle,
      blockDescription,
    };
    onAddBlock(selectedCategory, newBlock);
    setBlockTitle("");
    setBlockDescription("");
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <H3>새 블록 만들기</H3>
        <img src={exitIcon} className={styles.exitButton} alt="exit" onClick={onClose} />
        <form onSubmit={handleSubmit} className={styles.contentContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="category"><H5>블록 카테고리</H5></label>
            <div className={styles.select}>
              <ul className={styles.options}>
                {categories.map((category) => (
                  <li 
                    key={category} 
                    onClick={() => handleCategorySelect(category)}
                    className={styles.option}
                    style={{ 
                      backgroundColor: category === selectedCategory ? categoryColors[category] : "var(--color-gray4",
                      transform: category === selectedCategory ? "Scale(1.3)" : "Scale(1)"
                    }}
                  >
                    <B4 color="white">{category}</B4>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="blockTitle"><H5>블록 제목</H5></label>
            <input
              id="blockTitle"
              type="text"
              value={blockTitle}
              onChange={(e) => setBlockTitle(e.target.value)}
              placeholder="블록 제목을 입력하세요"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="blockDescription"><H5>블록 설명</H5></label>
            <textarea
              id="blockDescription"
              value={blockDescription}
              onChange={(e) => setBlockDescription(e.target.value)}
              placeholder="블록 설명을 입력하세요"
              required
            />
          </div>
          <ModalButton title="블록 만들기" variant="primary" />
        </form>
      </div>
    </div>
  );
};

export default CreateBlockModal;
