import React, {useState, useEffect} from "react";
import styles from "./PromptInfoModal.module.css";
import { H5, B5 } from "../../../../../styles/font-styles";
import { useSetRecoilState } from "recoil";
import { promptListState } from "../../../../../recoil/prompt/promptRecoilState";
import ModalContainer from "../../../../common/ModalContainer";
import ModalButton from "../../../../common/ModalButton";
import PromptDetail from "../../../../common/Prompt/PromptDetail";
import { useChattingRoomHooks } from "../../../../../api/chatting/chatting";

const allCategories = ["IT", "게임", "글쓰기", "건강", "교육", "예술"];

function EditPromptInfoModal({
  isOpen,
  onClose,
  promptId,
  initialTitle,
  initialDescription,
  initialCategory
}) {
  const [promptTitle, setPromptTitle] = useState(initialTitle);
  const [promptDescription, setPromptDescription] = useState(initialDescription);
  const [promptCategory, setPromptCategory] = useState(initialCategory);
  const setPromptList = useSetRecoilState(promptListState);
  const { patchPromptInfo } = useChattingRoomHooks();

  useEffect(() => {
    setPromptTitle(initialTitle);
  }, [initialTitle]);

  useEffect(() => {
    setPromptDescription(initialDescription);
  }, [initialDescription]);

  useEffect(() => {
    setPromptCategory(initialCategory);
  }, [initialCategory]);

  if (!isOpen) return null;

  const handleEditClick = () => {
    patchPromptInfo(
      promptId,
      promptTitle,
      promptDescription,
      promptCategory,
    );
    setPromptList((oldPromptList) => {
      return oldPromptList.map(prompt => {
        if (prompt.promptId === promptId) {
          return { ...prompt, promptTitle, promptDescription, promptCategory };
        }
        return prompt;
      });
    });
    console.log({
      promptTitle,
      promptDescription,
      promptCategory,
    });
    // 여기서 일반적으로 이 데이터를 백엔드로 보내거나 상태 관리 시스템에 저장합니다
    onClose();
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} title="프롬프트 정보 수정하기" onSubmit={handleEditClick}>
      <div className={styles.promptDetailContainer}><PromptDetail promptId={promptId}/></div>
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
      <ModalButton title="저장하기" variant="primary" type="submit"/>
    </ModalContainer>
  );
}

export default EditPromptInfoModal;