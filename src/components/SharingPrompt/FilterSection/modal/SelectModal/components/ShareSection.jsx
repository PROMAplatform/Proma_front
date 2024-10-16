import React, { useState } from "react";
import styles from "./ShareSection.module.css";
import PromptListName from "./PromptListName";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PostFixOrShare from "../../../../Prompt/modal/FixAndShareModal/PostFixOrShare";
import { H5 } from "../../../../../../styles/font-styles";
import { useModalStack } from "../../../../../../hooks/useModalStack";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    communityPromptListPageState,
    makePromptListState,
    stateChange,
} from "../../../../../../recoil/community/communityRecoilState";
import { useCommunityHooks } from "../../../../../../api/community/community";
import { t } from "i18next";

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
    const { sharePrompt, getPromptDetail } = useCommunityHooks();

    const handleShareModal = () => {
        if (selectedIndex === null) {
            setSnackbarOpen(true); // Snackbar 열기
        } else {
            const selectedPromptId = promas[selectedIndex].promptId;

            getPromptDetail(selectedPromptId);

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
                {promas.length ? (
                    promas.map((proma, index) => (
                        <PromptListName
                            key={proma.promptId}
                            name={proma.promptTitle}
                            isSelected={index === selectedIndex}
                            onSelect={() => handlePromptSelect(index)}
                        />
                    ))
                ) : (
                    <>
                        {t(`community.notToShare`)}
                    </>
                )}
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert onClose={handleSnackbarClose} severity="warning">
                    {t(`community.chooseToShare`)}
                </Alert>
            </Snackbar>
            <div>
                <button
                    className={styles.shareButton}
                    onClick={handleShareModal}
                >
                    <H5 color="white"> {t(`community.share`)}</H5>
                </button>
            </div>
        </>
    );
}

export default ShareSection;
