import React, {useRef, useState, useEffect} from "react";
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
    const textareaRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!input.value.trim() && selectedFiles.length === 0) {
            return;
        }
        // 메시지나 파일이 있을 때만 저장

        const newMessage = {
            text: input.value,
            files: selectedFiles
        };
        setMessages(prevMessages => {
            const updatedMessages = [...prevMessages, newMessage];
            return updatedMessages;
        });
        input.reset();
        setSelectedFiles([]); // 파일 초기화
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
            reader.readAsDataURL(file);
            reader.onload = () => {
                const fileUrl = {
                    url: reader.result,
                    name: file.name,
                    isImage: file.type && file.type.startsWith('image/'),
                };
                fileUrls.push(fileUrl);
                if(fileUrls.length === files.length) {
                    setSelectedFiles((prevFiles) => [...prevFiles, ...fileUrls]);
                }
            };
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    };

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.addEventListener("keydown", handleKeyDown);
        adjustTextareaHeight(); // 초기 높이 설정

        return () => {
            textarea.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        adjustTextareaHeight();
    }, [input.value]);

    return (
        <div className={styles.container}>
            <PromptPreview />
            <form onSubmit={handleSubmit} className={styles.inputContainer}>
                <div className={styles.filePreviewContainer}>
                    <Preview selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
                </div>
                <div className={styles.input}>
                <input type="file" className={styles.fileInput} ref={fileInputRef} onChange={onSelectFile} accept="image/*, .pdf"/>
                <label htmlFor="file" className={styles.fileLable} onClick={handleIconClick}>
                    <img src={fileInputIcon} alt="icon"/>
                </label>
                <textarea
                    value={input.value}
                    onChange={input.onChange}
                    placeholder="질문을 입력하세요."
                    className={[styles.textInput, 'b5'].join(' ')} 
                    ref={textareaRef}
                    rows={1}
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