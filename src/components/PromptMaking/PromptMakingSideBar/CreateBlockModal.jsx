import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { H5, B4 } from "../../../styles/font-styles";
import {
  categoryColorsState,
  availableCategoriesState,
  promptMethodState,
} from "../../../recoil/prompt/promptRecoilState";
import styles from "./CreateBlockModal.module.css";
import { usePromptHook } from "../../../api/prompt/prompt";
import ModalContainer from "../../common/ModalContainer";
import ModalButton from "../../common/ModalButton";
import { getLocalPromptMethod } from "../../../util/localStorage";

const CreateBlockModal = ({ isOpen, onClose, onBlockCreated }) => {
  const categories = useRecoilValue(availableCategoriesState);
  const categoryColors = useRecoilValue(categoryColorsState);
  const promptMethod = useRecoilValue(promptMethodState);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [blockValue, setBlockValue] = useState("");
  const [blockDescription, setBlockDescription] = useState("");
  const { makeBlock, fetchBlocks } = usePromptHook();
  if (!isOpen) return null;

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  
  const localPromptMethod = getLocalPromptMethod();

  const handleSubmit = async () => {
    await makeBlock(
      blockValue,
      blockDescription,
      selectedCategory,
      promptMethod
    );
    fetchBlocks(localPromptMethod);
    onBlockCreated();
    setBlockValue("");
    setBlockDescription("");
    onClose();
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title="새 블록 만들기"
      button="블록 만들기"
      onSubmit={handleSubmit}
    >
      <div className={styles.formGroup}>
        <label htmlFor="category">
          <H5>블록 카테고리</H5>
        </label>
        <div className={styles.select}>
          <ul className={styles.options}>
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={styles.option}
                style={{
                  backgroundColor:
                    category === selectedCategory
                      ? categoryColors[category]
                      : "var(--color-gray4)",
                  transform:
                    category === selectedCategory ? "Scale(1.3)" : "Scale(1)",
                }}
              >
                <B4 color="white">{category}</B4>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="blockTitle">
          <H5>블록 제목</H5>
        </label>
        <input
          id="blockTitle"
          type="text"
          value={blockValue}
          onChange={(e) => setBlockValue(e.target.value)}
          placeholder="블록 제목을 입력하세요"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="blockDescription">
          <H5>블록 설명</H5>
        </label>
        <textarea
          id="blockDescription"
          value={blockDescription}
          onChange={(e) => setBlockDescription(e.target.value)}
          placeholder="블록 설명을 입력하세요"
          required
        />
      </div>
      <ModalButton title="블록 만들기" variant="primary" type="submit" />
    </ModalContainer>
  );
};

export default CreateBlockModal;
