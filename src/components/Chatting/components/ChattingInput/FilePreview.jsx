import React from "react";
import styles from "./FilePreview.module.css";
import removeIcon from "../../../../assets/images/removeIcon.svg";
import filePreview from "../../../../assets/images/filePreview.svg";

const Preview = ({ selectedFiles, setSelectedFiles }) => {
  return (
    <div className={styles.filePreviewContainer}>
      {selectedFiles &&
        selectedFiles.map((file, index) => (
          <div key={index} className={styles.filePreview}>
            <div className={styles.imageContainer}>
              <img
                src={file.isImage ? file.url : filePreview}
                alt="preview"
                className={styles.previewImage}
              />
            </div>
            <div
              onClick={() =>
                setSelectedFiles(selectedFiles.filter((_, i) => i !== index))
              }
              className={styles.removeButton}
            >
              <img src={removeIcon} alt="remove" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Preview;
