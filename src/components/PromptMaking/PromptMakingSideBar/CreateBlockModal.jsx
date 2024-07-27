import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { availableCategoriesState } from "../../../recoil/prompt/promptRecoilState";
import styles from "./CreateBlockModal.module.css";

const CreateBlockModal = ({ isOpen, onClose, onAddBlock }) => {
  const categories = useRecoilValue(availableCategoriesState);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [blockTitle, setBlockTitle] = useState("");
  const [blockDescription, setBlockDescription] = useState("");

  if (!isOpen) return null;

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
        <h2>새 블록 만들기</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="category">카테고리</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="blockTitle">블록 제목</label>
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
            <label htmlFor="blockDescription">블록 설명</label>
            <textarea
              id="blockDescription"
              value={blockDescription}
              onChange={(e) => setBlockDescription(e.target.value)}
              placeholder="블록 설명을 입력하세요"
              required
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit">완료</button>
            <button type="button" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlockModal;
