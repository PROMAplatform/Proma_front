import React, { useState } from "react";
import styles from "./CreateBlockModal.module.css";

const CreateBlockModal = ({ isOpen, onClose, onAddBlock, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [blockContent, setBlockContent] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBlock(selectedCategory, blockContent);
    setBlockContent("");
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>새 블록 만들기</h2>
        <form onSubmit={handleSubmit}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <textarea
            value={blockContent}
            onChange={(e) => setBlockContent(e.target.value)}
            placeholder="블록 내용을 입력하세요"
            required
          />
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
