import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SavePromptModal.module.css";
import { H5, B5, B3 } from "../../../styles/font-styles";
import ModalButton from "../../common/ModalButton";
import { promptMethodState, promptListState, blockDetailsState } from "../../../recoil/prompt/promptRecoilState";
import { useRecoilValue } from "recoil";
import RefinedPromptText from "../FinalPromptArea/RefinedPromptText";
import { usePromptHook } from "../../../api/prompt/prompt";
import { useChattingRoomHooks } from "../../../api/chatting/chatting";
import ModalContainer from "../../common/ModalContainer";

const allCategories = ["IT", "게임", "글쓰기", "건강", "교육", "예술", "기타"];

const SavePromptModal = ({
  isOpen,
  onClose,
  combinations,
  refinedPromptParts,
  promptId
}) => {
  const navigate = useNavigate();
  const promptList = useRecoilValue(promptListState);
  const blockDetails = useRecoilValue(blockDetailsState);
  const prompt = promptList.find(p => p.promptId === promptId);
  const [promptTitle, setPromptTitle] = useState("");
  const [promptDescription, setPromptDescription] = useState("");
  const [promptCategory, setPromptCategory] = useState("IT");
  const promptMethod = useRecoilValue(promptMethodState);

  const { savePrompt } = usePromptHook();
  const { patchPromptBlock, patchPromptInfo } = useChattingRoomHooks();

  useEffect(() => {
    if (prompt) {
      setPromptTitle(prompt.promptTitle || "");
      setPromptDescription(prompt.promptDescription || "");
      setPromptCategory(prompt.promptCategory || "IT");
    } else {
      // Reset state if no prompt is found
      setPromptTitle("");
      setPromptDescription("");
      setPromptCategory("IT");
    }
  }, [prompt])

  if(!isOpen) return null;

  const handleSave = () => {
    if(prompt) {
      const listPromptAtom = Object.entries(combinations)
        .filter(([category, blockId]) => blockId)
        .map(([category, blockId]) => ({
          blockId: Number(blockId),
          blockCategory: category,
          blockValue: blockDetails[blockId].blockValue
      }));
      patchPromptBlock(promptId, listPromptAtom);
      patchPromptInfo(
        promptId,
        promptTitle,
        promptDescription,
        promptCategory,
      );

    } else {
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
        listPromptAtom
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
    }
    navigate("/");
    onClose();
  };

  let title = "";
  if(prompt) {
    title = "프롬프트 블록 수정하기";
  } else {
    title = "프롬프트 저장";
  }

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} title={title} onSubmit={handleSave} children>  
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
                <B5 color={category === promptCategory ? "white" : "gray5"}>
                  {category}
                </B5>
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
      <ModalButton title="저장하기" variant="primary" type="submit"/>
    </ModalContainer>  
  );
};

export default SavePromptModal;
