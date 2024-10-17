import ModalButton from "../../../common/ModalButton";
import ModalContainer from "../../../common/ModalContainer";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PromptListItem from "./components/PromptListItem";
import { useRecoilValue } from "recoil";
import { useChattingRoomHooks } from "../../../../api/chatting/chatting";
import { promptListState } from "../../../../recoil/prompt/promptRecoilState";
import styles from "./PromptListModal.module.css";
import { useOpenAPIHook } from "../../../../api/business/openAPI";
import PromptDetail from "../../../common/Prompt/PromptDetail";
import { H5, B4 } from "../../../../styles/font-styles";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PromptListModal({ isOpen, onClose }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [selectedPromptId, setSelectedPromptId] = useState("");
    const [currentPrompt, setCurrentPrompt] = useState(null);
    const { makeOpenAPI } = useOpenAPIHook();
    const navigate = useNavigate();

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };

    const { fetchPromptList } = useChattingRoomHooks();

    useEffect(() => {
        const fetchData = async () => {
            await fetchPromptList();
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const promptList = useRecoilValue(promptListState);

    const handleChooseClick = (prompt) => {
        setIsSecondModalOpen(true);
        setSelectedPromptId(prompt.promptId);
        setCurrentPrompt(
            promptList.find((p) => p.promptId === prompt.promptId),
        );
    };

    const handleSecondModalClose = () => {
        setIsSecondModalOpen(false);
    };

    const requestOpenAPI = (promptId) => {
        const fetchData = async () => {
            const { accessToken, secretKey } = await makeOpenAPI(promptId);
            onClose();
            navigate("/openapi/list", {
                state: { accessToken, secretKey, promptId },
            });
        };

        if (promptId) {
            fetchData();
        } else {
            setSnackbarOpen(true);
        }
    };

    if (!promptList || promptList.length === 0) {
        return (
            <ModalContainer
                isOpen={isOpen}
                onClose={onClose}
                title="프롬프트 선택하기"
            >
                <div className={styles.emptyContainer}>프롬프트가 없습니다</div>
            </ModalContainer>
        );
    }

    return (
        <>
            {/* 첫 번째 모달 */}
            <ModalContainer
                isOpen={isOpen}
                onClose={onClose}
                title="프롬프트 선택하기"
                onSubmit={() => requestOpenAPI(selectedPromptId)}
            >
                <div className={styles.promptListContainer}>
                    {promptList.map((prompt) => (
                        <PromptListItem
                            key={prompt.promptId}
                            title={prompt.promptTitle}
                            isSelected={selectedPromptId === prompt.promptId}
                            onClick={() => handleChooseClick(prompt)}
                        />
                    ))}
                </div>
                <ModalButton title="선택하기" variant="primary" type="submit" />
            </ModalContainer>
            {/* 두 번째 모달 */}
            <ModalContainer
                isOpen={isSecondModalOpen}
                onClose={() => setIsSecondModalOpen(false)}
                title="프롬프트 내용 확인"
                onSubmit={handleSecondModalClose}
                exitButton={false}
            >
                <div className={styles.promptDetailContainer}>
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
                <ModalButton
                    title="확인"
                    variant="primary"
                    type="submit"
                    onClick={handleSecondModalClose}
                />
            </ModalContainer>
            <div className={styles.snackbarContainer}>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                    <Alert onClose={handleSnackbarClose} severity="warning">
                        API를 발급할 프롬프트를 선택하세요!
                    </Alert>
                </Snackbar>
            </div>
        </>
    );
}

export default PromptListModal;
