import React, {useRef, useState} from "react";
import styles from "./ChattingInput.module.css"
import { messageState } from "../../../../recoil/chatting/chattingRecoilState";
import useInput from "../../../../hooks/useInput";
import { useRecoilState } from "recoil";
import fileInputIcon from "../../../../assets/images/fileInputIcon.svg";
import submitButtonIcon from "../../../../assets/images/submitButtonIcon.svg";
import Preview from "./FilePreview";
import PromptPreview from "../Prompt/PromptPreview";

function ChattingInput() {
    const [messages, setMessages] = useRecoilState(messageState);
    const input = useInput("");
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if(input.value.trim()) {
        setMessages([...messages, input.value])
        input.reset();
      }
    };

    const handleIconClick = () => {
        if(fileInputRef.current) {
            fileInputRef.current.click();
        }
    }
    
    const onSelectFile = (e) => {
        const files = e.target.files;
        const fileUrls = [];

        for(let i = 0; i < files.length; i++){
            const file = files[i];
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = () => {
                const fileUrl = {
                    url: reader.result,
                    isImage: file.type && file.type.startsWith('image/'),
                };
                fileUrls.push(fileUrl);
                if(fileUrls.length === files.length) {
                    setSelectedFiles([...selectedFiles, ...fileUrls]);
                }
            };
        }
    };

    return (
        <div className={styles.container}>
            <PromptPreview />
            <form onSubmit={handleSubmit} className={styles.inputContainer}>
                <div className={styles.filePreviewContainer}>
                    <Preview selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
                </div>
                <div className={styles.input}>
                <input type="file" className={styles.fileInput} ref={fileInputRef} onChange={onSelectFile} accept="image/* .pdf .txt"/>
                <label htmlFor="file" className={styles.fileLable} onClick={handleIconClick}>
                    <img src={fileInputIcon} alt="icon"/>
                </label>
                <input
                    type="text"
                    value={input.value}
                    onChange={input.onChange}
                    placeholder="질문을 입력하세요."
                    className={[styles.textInput, 'b5'].join(' ')} 
                />
                <button type="submit" className={styles.submitButton}>
                    <img src={submitButtonIcon} />
                </button>
                </div>
            </form>
        </div>
    );
}

export default ChattingInput;