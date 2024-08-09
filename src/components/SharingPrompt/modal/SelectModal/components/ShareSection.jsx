import React, { useState } from "react";
import styles from "./ShareSection.module.css";
import PromptListName from "./PromptListName";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PostFixOrShare from "../../FixAndShareModal/PostFixOrShare";
import { H5 } from "../../../../../styles/font-styles";
import { useModalStack } from "../../../../../hooks/useModalStack";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    communityPromptListPageState,
    makePromptListState,
    stateChange,
} from "../../../../../recoil/community/communityRecoilState";
import { useCommunityHooks } from "../../../../../api/community/community";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ShareSection({ onClose }) {
    const promas = useRecoilValue(makePromptListState);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const setStateChange = useSetRecoilState(stateChange);
    const currentPage = useRecoilValue(communityPromptListPageState);
    const modalStack = useModalStack();
    const { sharePrompt } = useCommunityHooks();

    const handleShareModal = () => {
        if (selectedIndex === null) {
            setSnackbarOpen(true); // Snackbar 열기
        } else {
            //prompt 상세보기(홍규진꺼) 받아와서 넣기
            const selectedPromptId = promas[selectedIndex].promptId;

            modalStack.push({
                key: "promptShareModal",
                Component: PostFixOrShare,
                componentProps: {
                    onApi: (data) => handleWrite(data, selectedPromptId),
                    state: "share",
                },
                backdropTransparent: true,
            });
        }
    };

    const handlePromptSelect = (index) => {
        setSelectedIndex(index);
        setSnackbarOpen(false); // 프롬프트 선택 시 Snackbar 닫기
    };

    const handleWrite = (data, promptId) => {
        sharePrompt(promptId, data);
        setStateChange((prevValue) => prevValue + 1);

        console.log({ modalStack });
        console.log(currentPage);

        console.log({
            postTitle: data.title,
            postDescription: data.description,
            postCategory: data.category,
            promptId: promptId,
        });

        onClose();
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <>
            <div className={styles.listContainer}>
                {Array.isArray(promas) ? (
                    promas.map((proma, index) => (
                        <PromptListName
                            key={proma.promptId}
                            name={proma.promptTitle}
                            isSelected={index === selectedIndex}
                            onSelect={() => handlePromptSelect(index)}
                        />
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert onClose={handleSnackbarClose} severity="warning">
                    공유할 프롬프트를 선택해주세요.
                </Alert>
            </Snackbar>
            <div>
                <button
                    className={styles.shareButton}
                    onClick={handleShareModal}
                >
                    <H5 color="white">공유하기</H5>
                </button>
            </div>
        </>
    );
}

export default ShareSection;
