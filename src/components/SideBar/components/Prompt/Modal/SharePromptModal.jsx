import React, {useState, useEffect} from "react";
import styles from "./PromptInfoModal.module.css";
import { H5, B5 } from "../../../../../styles/font-styles";
import PromptDetail from "../../../../common/Prompt/PromptDetail";
import ModalContainer from "../../../../common/ModalContainer";
import ModalButton from "../../../../common/ModalButton";

const allCategories = ["IT", "게임", "글쓰기", "건강", "교육", "예술"];

function SharePromptModal({
  isOpen,
  onClose,
  promptId,
  initialTitle,
  initialDescription,
  initialCategory,
  promptPreview
}) {
  const [promptTitle, setPromptTitle] = useState(initialTitle);
  const [promptDescription, setPromptDescription] = useState(initialDescription);
  const [promptCategory, setPromptCategory] = useState(initialCategory);

  if (!isOpen) return null;

  const handleShareClick = () => {
    onClose();
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} title="프롬프트 공유하기" onSubmit={handleShareClick}>
      <div className={styles.promptDetailContainer}><PromptDetail promptId={promptId}/></div>
      <div>
        <div>{promptPreview}</div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="promptTitle">
          <H5>게시글 제목</H5>
        </label>
        <input
          placeholder="프롬프트 제목"
          value={promptTitle}
          onChange={(e) => setPromptTitle(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="promptDescription">
          <H5>게시글 설명</H5>
        </label>
        <input
          placeholder="프롬프트 설명"
          value={promptDescription}
          onChange={(e) => setPromptDescription(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="category">
          <H5>프롬프트 카테고리</H5>
        </label>
        <div className={styles.select}>
          <ul className={styles.options}>
            {allCategories.map((category) => (
              <li
                key={category}
                onClick={() => setPromptCategory(category)}
                className={`${styles.option} ${
                  category === promptCategory ? styles.active : styles.none
                }`}
              >
                <B5 color={category === promptCategory ? "white" : "gray5"}>
                  {category}
                </B5>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ModalButton title="공유하기" variant="primary" type="submit"/>
    </ModalContainer>
  );
}

export default SharePromptModal;