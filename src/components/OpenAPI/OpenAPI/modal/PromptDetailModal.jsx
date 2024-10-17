import ModalContainer from "../../../common/ModalContainer";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { H5, B4 } from "../../../../styles/font-styles";
import PromptDetail from "../../../common/Prompt/PromptDetail";
import { promptListState } from "../../../../recoil/prompt/promptRecoilState";
import ModalButton from "../../../common/ModalButton";
import styles from "./PromptDetailModal.module.css";

function PromptDetailModal({ isOpen, onClose, promptId }) {
    const [currentPrompt, setCurrentPrompt] = useState(null);
    const promptList = useRecoilValue(promptListState);
    useEffect(() => {
        const selectedPrompt = promptList.find((p) => p.promptId === promptId);
        setCurrentPrompt(selectedPrompt);
        console.log(currentPrompt);
        // eslint-disable-next-line
    }, [promptId, promptList]);
    return (
        <ModalContainer
            isOpen={isOpen}
            onClose={onClose}
            title="프롬프트 세부 정보"
            exitButton={false}
        >
            <div className={styles.detailContainer}>
                {currentPrompt && (
                    <PromptDetail
                        listPromptAtom={currentPrompt.listPromptAtom || []}
                    />
                )}
            </div>
            {currentPrompt && (
                <>
                    <div>
                        <label htmlFor="promptTitle">
                            <H5>프롬프트 제목</H5>
                        </label>
                        <B4>{currentPrompt.promptTitle}</B4>
                    </div>
                    <div>
                        <label htmlFor="promptDescription">
                            <H5>프롬프트 설명</H5>
                        </label>
                        <B4>{currentPrompt.promptDescription}</B4>
                    </div>
                    <div>
                        <label htmlFor="promptPreview">
                            <H5>프롬프트 미리보기</H5>
                        </label>
                        <B4>{currentPrompt.promptPreview}</B4>
                    </div>
                </>
            )}
            <ModalButton title="확인" variant="primary" onClick={onClose} />
        </ModalContainer>
    );
}

export default PromptDetailModal;
