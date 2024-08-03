import React, { useState } from "react";
import styles from "./SavePromptModal.module.css";
import { H5, B4, B3 } from "../../../styles/font-styles";
import ModalButton from "../../common/ModalButton";
import { promptMethodState } from "../../../recoil/prompt/promptRecoilState";
import { useRecoilState } from "recoil";
import RefinedPromptText from "../FinalPromptArea/RefinedPromptText";
import { usePromptHook } from "../../../api/prompt/prompt";
import ModalContainer from "../../common/ModalContainer";

const allCategories = ["IT", "게임", "글쓰기", "건강", "교육", "예술"];

const SavePromptModal = ({
  isOpen,
  onClose,
  combinations,
  refinedPromptParts,
}) => {
  const [promptTitle, setPromptTitle] = useState("");
  const [promptDescription, setPromptDescription] = useState("");
  const [promptCategory, setPromptCategory] = useState("IT");
  const promptMethod = useRecoilState(promptMethodState);

  const { savePrompt } = usePromptHook();
  if (!isOpen) return null;

  const handleSave = () => {
    const promptPreview = Object.values(refinedPromptParts).join(" ");
    const listPromptAtom = Object.values(combinations)
      .filter(Boolean)
      .map((value, index) => ({ blockId: value }));

    savePrompt(
      promptTitle,
      promptDescription,
      promptPreview,
      promptCategory,
      promptMethod,
      listPromptAtom,
    );

    console.log({
      promptTitle,
      promptDescription,
      promptPreview,
      promptCategory,
      promptMethod,
      listPromptAtom,
    });
    // 여기서 일반적으로 이 데이터를 백엔드로 보내거나 상태 관리 시스템에 저장합니다
    onClose();
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} title="프롬프트 저장" onSubmit={handleSave} children>  
      <div>
        <RefinedPromptText />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="promptTitle">
          <H5>프롬프트 제목</H5>
        </label>
        <input
          placeholder="프롬프트 제목"
          value={promptTitle}
          onChange={(e) => setPromptTitle(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="promptDescription">
          <H5>프롬프트 설명</H5>
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
                onClick={(e) => setPromptCategory(category)}
                className={`${styles.option} ${
                  category === promptCategory ? styles.active : styles.none
                }`}
              >
                <B4 color={category === promptCategory ? "white" : "gray5"}>
                  {category}
                </B4>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.formGroup}>
        <label>
          <H5>프롬프트 타입</H5>
        </label>
        <B3 color="black">{promptMethod} type</B3>
      </div>
      <ModalButton title="저장하기" variant="primary" />
    </ModalContainer>  
  );
};

export default SavePromptModal;
