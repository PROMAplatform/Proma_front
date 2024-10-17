import React, { useState } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import styles from "./CopyButton.module.css";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CopyButton({ category, text }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleCopy = () => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                setCopied(true);
                setSnackbarOpen(true);
            })
            .catch((err) => console.errer("Failed to copy"));
    };
    return (
        <div>
            <button className={styles.buttonContainer} onClick={handleCopy}>
                복사
            </button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert onClose={handleSnackbarClose} severity="success">
                    {category} 이/가 복사되었습니다!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default CopyButton;
