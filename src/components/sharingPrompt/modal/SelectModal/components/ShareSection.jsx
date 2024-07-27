import React, {useState} from 'react';
import styles from "./ShareSection.module.css";
import PromptListName from "./PromptListName";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PostFixOrShare from "../../FixAndShareModal/PostFixOrShare";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ShareSection({onClose}) {
    const promas = [
        { type: "캐릭터", name: "PROMPT 1"},
        { type: "Free", name: "PROMPT 2"},
        { type: "캐릭터", name: "PROMPT 3"},
        { type: "Task", name: "PROMPT 4"},
        { type: "캐릭터", name: "PROMPT 5"},
        { type: "Free", name: "PROMPT 6"},
        { type: "Task", name: "PROMPT 7"},
    ];

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handlePromptSelect = (index) => {
        setSelectedIndex(index);
        setSnackbarOpen(false); // 프롬프트 선택 시 Snackbar 닫기
    };

    const handleShareClick = () => {
        if (selectedIndex === null) {
            setSnackbarOpen(true); // Snackbar 열기
        } else {
            setIsModalOpen(true); // 모달 열기
        }
    };

    const handleWrite = (data) => {
        // 실제 작성하기 로직 (API 호출 등)
        console.log({
            "postTitle" : data.title,
            "postDescription" : data.description,
            "post_category" : data.category,
        });

        onClose();
        console.log("프롬프트 게시글 작성");
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <div>
            <div className={styles.listContainer}>
                {promas.map((proma, index) => (
                    <PromptListName key={index}
                                    name={proma.name}
                                    isSelected={index === selectedIndex}
                                    onSelect={() => handlePromptSelect(index)}/>))}
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert onClose={handleSnackbarClose} severity="warning">
                    프롬프트를 먼저 선택해주세요.
                </Alert>
            </Snackbar>
            <div>
                <button className={styles.shareButton}
                        onClick={handleShareClick}
                >
                    공유하기
                </button>
                <PostFixOrShare isOpen={isModalOpen}
                                onApi={handleWrite}
                                state={"share"}
                                onClose={() => setIsModalOpen(false)}
                />
            </div>
        </div>
    );
}

export default ShareSection;