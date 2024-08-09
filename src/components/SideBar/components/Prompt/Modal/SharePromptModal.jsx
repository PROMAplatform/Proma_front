import React, {useState} from "react";
import styles from "./PromptModal.module.css";
import { H5, B5 } from "../../../../../styles/font-styles";
import PromptDetail from "../../../../common/Prompt/PromptDetail";
import ModalContainer from "../../../../common/ModalContainer";
import ModalButton from "../../../../common/ModalButton";
import { promptListState } from "../../../../../recoil/prompt/promptRecoilState";
import { useRecoilValue } from "recoil";
import { useCommunityHooks } from "../../../../../api/community/community";

const allCategories = ["IT", "게임", "글쓰기", "건강", "교육", "예술", "기타"];

function SharePromptModal({
  isOpen,
  onClose,
  promptId,
}) {
  const promptList = useRecoilValue(promptListState);
  const { sharePrompt } = useCommunityHooks();
  const prompt = promptList.find(p => p.promptId === promptId);

  const { promptTitle: initialTitle, promptDescription: initialDescription, promptCategory: initialCategory, listPromptAtom } = prompt;

  // 모달 내부에서 사용할 상태 변수 추가
  const [promptTitle, setPromptTitle] = useState(initialTitle);
  const [promptDescription, setPromptDescription] = useState(initialDescription);
  const [promptCategory, setPromptCategory] = useState(initialCategory);

  if (!isOpen) return null;

  const handleShareClick = () => {
    const data = {
      title: promptTitle,
      description: promptDescription,
      category: promptCategory,
    };
    sharePrompt(promptId, data);
    onClose();
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} title="프롬프트 공유하기" onSubmit={handleShareClick}>
      <div className={styles.promptDetailContainer}>
        <PromptDetail listPromptAtom={listPromptAtom}/>
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