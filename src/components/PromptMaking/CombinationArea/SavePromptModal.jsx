import React, { useState } from "react";
import styles from "./SavePromptModal.module.css";
import RefinedPromptText from "../FinalPromptArea/RefinedPromptText";

const SavePromptModal = ({
  isOpen,
  onClose,
  combinations,
  refinedPromptParts,
}) => {
  const [promptTitle, setPromptTitle] = useState("");
  const [promptDescription, setPromptDescription] = useState("");
  const [promptCategory, setPromptCategory] = useState("IT");
  const [promptType, setPromptType] = useState("task");

  if (!isOpen) return null;

  const handleSave = () => {
    const promptPreview = Object.values(refinedPromptParts).join(" ");
    const listPromptAtom = Object.values(combinations)
      .filter(Boolean)
      .map((value, index) => ({ blockId: index + 1 }));

    const savedData = {
      promptTitle,
      promptDescription,
      promptPreview,
      promptCategory,
      promptType,
      listPromptAtom,
    };

    console.log("저장된 데이터:", savedData);
    // 여기서 일반적으로 이 데이터를 백엔드로 보내거나 상태 관리 시스템에 저장합니다
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>프롬프트 저장</h2>
        <div>
          <RefinedPromptText />
        </div>
        <input
          placeholder="게시글 제목"
          value={promptTitle}
          onChange={(e) => setPromptTitle(e.target.value)}
        />
        <input
          placeholder="게시글 설명"
          value={promptDescription}
          onChange={(e) => setPromptDescription(e.target.value)}
        />
        <select
          value={promptCategory}
          onChange={(e) => setPromptCategory(e.target.value)}
        >
          <option value="IT">IT</option>
          {/* 필요한 경우 더 많은 카테고리 추가 */}
        </select>
        <select
          value={promptType}
          onChange={(e) => setPromptType(e.target.value)}
        >
          <option value="task">Task</option>
          <option value="research">Research</option>
        </select>
        <button onClick={handleSave}>저장하기</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

export default SavePromptModal;
