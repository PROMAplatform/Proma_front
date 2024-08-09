import React from "react";
import styles from "./FilePreview.module.css";
import removeIcon from "../../../../assets/images/removeIcon.svg";
import filePreview from "../../../../assets/images/filePreview.svg";

const Preview = ({ selectedFile, setSelectedFile }) => {
    if (!selectedFile) return null;

    return (
        <div className={styles.filePreviewContainer}>
            <div className={styles.filePreview}>
                <div className={styles.imageContainer}>
                    <img
                        src={
                            selectedFile.isImage
                                ? selectedFile.url
                                : filePreview
                        }
                        alt="preview"
                        className={styles.previewImage}
                    />
                </div>
                <div
                    onClick={() => setSelectedFile(null)}
                    className={styles.removeButton}
                >
                    <img src={removeIcon} alt="remove" />
                </div>
            </div>
        </div>
    );
};

export default Preview;
