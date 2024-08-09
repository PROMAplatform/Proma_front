import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PromptModal.module.css";
import { H5, B5, B6 } from "../../../../../styles/font-styles";
import { useRecoilValue, useSetRecoilState } from "recoil";
import editIcon from "../../../../../assets/images/editIcon.svg";
import {
    promptListState,
    promptMethodState,
} from "../../../../../recoil/prompt/promptRecoilState";
import ModalContainer from "../../../../common/ModalContainer";
import ModalButton from "../../../../common/ModalButton";
import PromptDetail from "../../../../common/Prompt/PromptDetail";
import { useChattingRoomHooks } from "../../../../../api/chatting/chatting";
import { setLocalPromptMethod } from "../../../../../util/localStorage";

const allCategories = ["IT", "게임", "글쓰기", "건강", "교육", "예술", "기타"];

function EditPromptInfoModal({ isOpen, onClose, promptId }) {
    const navigate = useNavigate();
    const promptList = useRecoilValue(promptListState);
    const prompt = promptList.find((p) => p.promptId === promptId);
    const {
        promptTitle: initialTitle,
        promptDescription: initialDescription,
        promptCategory: initialCategory,
        listPromptAtom,
    } = prompt;
    const setPromptMethod = useSetRecoilState(promptMethodState);
    // 모달 내부에서 사용할 상태 변수 추가
    const [promptTitle, setPromptTitle] = useState(initialTitle);
    const [promptDescription, setPromptDescription] =
        useState(initialDescription);
    const [promptCategory, setPromptCategory] = useState(initialCategory);

    const { patchPromptInfo } = useChattingRoomHooks();

    if (!isOpen) return null;

    const handleEditClick = () => {
        patchPromptInfo(
            promptId,
            promptTitle,
            promptDescription,
            promptCategory,
        );

        console.log({
            promptTitle,
            promptDescription,
            promptCategory,
        });
        // 여기서 일반적으로 이 데이터를 백엔드로 보내거나 상태 관리 시스템에 저장합니다
        onClose();
    };

    const handleBlockEditClick = () => {
        setLocalPromptMethod(prompt.promptMethod);
        setPromptMethod(prompt.promptMethod);
        navigate("/promptMaking", { state: { promptId } }); // promptId를 state에 담아 navigate
    };

    return (
        <ModalContainer
            isOpen={isOpen}
            onClose={onClose}
            title="프롬프트 정보 수정하기"
            onSubmit={handleEditClick}
        >
            <div className={styles.promptDetailContainer}>
                <PromptDetail listPromptAtom={listPromptAtom} />
                <div
                    className={styles.promptBlockEditButton}
                    onClick={handleBlockEditClick}
                >
                    <img src={editIcon} alt="edit icon" />
                    <B6 color="gray6">블록 수정하기</B6>
                </div>
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
                                onClick={() => setPromptCategory(category)}
                                className={`${styles.option} ${
                                    category === promptCategory
                                        ? styles.active
                                        : styles.none
                                }`}
                            >
                                <B5
                                    color={
                                        category === promptCategory
                                            ? "white"
                                            : "gray5"
                                    }
                                >
                                    {category}
                                </B5>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <ModalButton title="저장하기" variant="primary" type="submit" />
        </ModalContainer>
    );
}

export default EditPromptInfoModal;
