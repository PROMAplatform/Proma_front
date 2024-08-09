import React, { useRef, useState, useEffect } from "react";
import styles from "./ChattingInput.module.css";
import {
    isLoadingState,
    messageState,
    currentRoomIdState,
    isFirstState,
} from "../../../../recoil/chatting/chattingRecoilState";
import useInput from "../../../../hooks/common/useInput.jsx";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import fileInputIcon from "../../../../assets/images/fileInputIcon.svg";
import submitButtonIcon from "../../../../assets/images/submitButtonIcon.svg";
import Preview from "./FilePreview";
import PromptPreview from "../Prompt/PromptPreview";
import { useChattingRoomHooks } from "../../../../api/chatting/chatting.js";
import { currentPromptState } from "../../../../recoil/prompt/promptRecoilState";
import { uploadS3 } from "../../../../util/s3Upload";
import { t } from "i18next";

function ChattingInput() {
    const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
    const setMessages = useSetRecoilState(messageState);
    const [currentRoomId, setCurrentRoomId] =
        useRecoilState(currentRoomIdState);
    const input = useInput("");
    const [isFirst, setIsFirst] = useRecoilState(isFirstState);
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState();
    const { fetchChattingAnswer, createChattingRoom } = useChattingRoomHooks();
    const currentPrompt = useRecoilValue(currentPromptState);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.value.trim() && !selectedFile) {
            return;
        }

        setIsLoading(true);

        try {
            let roomId = currentRoomId;
            if (isFirst) {
                roomId = await createChattingRoom(input.value, "💡");
                setCurrentRoomId(roomId);
                setIsFirst(false);
            }

            const newMessage = {
                messageId: Date.now(),
                promptId: currentPrompt.id,
                messageQuestion: input.value,
                messageFile: selectedFile,
                messageCreateAt: new Date().toISOString(),
                chatroomId: roomId,
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            console.log(
                currentPrompt.id,
                input.value,
                roomId,
                selectedFile ? (selectedFile.isImage ? "image" : "pdf") : "",
                selectedFile ? selectedFile.url : "",
            );

            const chattingResponse = await fetchChattingAnswer(
                currentPrompt.id,
                input.value,
                roomId,
                selectedFile ? (selectedFile.isImage ? "image" : "pdf") : "",
                selectedFile ? selectedFile.url : "",
            );

            const messageAnswer = {
                messageId: Date.now() + 1,
                messageAnswer: chattingResponse.data.responseDto.messageAnswer,
                messageCreateAt: new Date().toISOString(),
                chatroomId: roomId,
            };

            setMessages((prevMessages) => [...prevMessages, messageAnswer]);

            input.reset();
            setSelectedFile(undefined); // 파일 초기화
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const onSelectFile = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const s3Url = await uploadS3(file);
                const fileInfo = {
                    url: s3Url,
                    name: file.name,
                    isImage: file.type.startsWith("image/"),
                    type: file.type.startsWith("image/") ? "Image" : "PDF",
                };
                setSelectedFile(fileInfo);
            } catch (error) {
                console.error("파일 업로드 실패:", error);
            }
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
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [input.value]);

    return (
        <div className={styles.container}>
            <PromptPreview />
            <form onSubmit={handleSubmit} className={styles.inputContainer}>
                <div className={styles.filePreviewContainer}>
                    <Preview
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                    />
                </div>
                <div className={styles.input}>
                    <input
                        type="file"
                        className={styles.fileInput}
                        ref={fileInputRef}
                        onChange={onSelectFile}
                        accept="image/*, .pdf"
                    />
                    <label
                        htmlFor="file"
                        className={styles.fileLable}
                        onClick={handleIconClick}
                    >
                        <img src={fileInputIcon} alt="icon" />
                    </label>
                    <textarea
                        value={input.value}
                        onChange={input.onChange}
                        onKeyDown={handleKeyDown}
                        placeholder={t(`input.inputDefault`)}
                        className={styles.textInput}
                        ref={textareaRef}
                        rows={1}
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        <img src={submitButtonIcon} alt="submit" />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChattingInput;
