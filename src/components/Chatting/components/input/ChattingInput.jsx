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

const generateMockResponse = (question) => {
  const responses = [
    `## 답변\n\n당신의 질문 "${question}"에 대한 답변입니다:\n\n- 첫 번째 포인트\n- 두 번째 포인트\n- 세 번째 포인트\n\n자세한 내용은 다음과 같습니다:\n\n1. 상세 설명 1\n2. 상세 설명 2\n3. 상세 설명 3\n\n\`\`\`\n코드 예시가 필요한 경우 여기에 작성합니다.\n\`\`\``,
    `### 답변\n\n${question}에 대해 다음과 같이 생각합니다:\n\n1. 주요 관점\n2. 부가 설명\n3. 결론\n\n> 중요한 인용구나 강조하고 싶은 내용을 여기에 작성합니다.`,
    `# 답변\n\n## 1. 개요\n${question}에 대한 간단한 개요입니다.\n\n## 2. 주요 논점\n- 논점 1\n- 논점 2\n- 논점 3\n\n## 3. 결론\n최종적인 의견을 여기에 작성합니다.\n\n---\n\n추가 참고 사항이 있다면 여기에 작성합니다.`,
  ];

  return responses[Math.floor(Math.random() * responses.length)];
};

function ChattingInput() {
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const setMessages = useSetRecoilState(messageState);
  const currentRoomId = useRecoilValue(currentRoomIdState);
  const setCurrentRoomId = useSetRecoilState(currentRoomIdState);
  const input = useInput("");
  const isFirst = useRecoilValue(isFirstState);
  const setIsFirst = useSetRecoilState(isFirstState);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { fetchChattingAnswer, createChattingRoom } = useChattingRoomHooks();
  const currentPrompt = useRecoilValue(currentPromptState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.value.trim() && selectedFiles.length === 0) {
      return;
    }

    setIsLoading(true);

    try {
      // 이 부분 chattingAPI로 분리 예정
      if (isFirst) {
        await createChattingRoom(input.value, "💡");
        setIsFirst(false);
      }
      // const mockResponse = generateMockResponse(input.value);

      const newMessage = {
        messageId: Date.now(),
        promptId: "",
        messageQuestion: input.value,
        messageFile: selectedFiles,
        messageCreateAt: new Date().toISOString(),
        chatroomId: currentRoomId,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      //TODO- pdf, image 처리에 관한 로직 좀 더 추가해야할 듯
      const response = await fetchChattingAnswer(
        currentPrompt.id,
        input.value,
        "",
        ""
      );
      console.log(response);
      const messageAnswer = {
        messageId: Date.now() + 1,
        messageAnswer: response.data.responseDto.messageAnswer,
        messageCreateAt: new Date().toISOString(),
        chatroomId: currentRoomId,
      };

      setMessages((prevMessages) => [...prevMessages, messageAnswer]);

      input.reset();
      setSelectedFiles([]); // 파일 초기화
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

  const onSelectFile = (e) => {
    const files = e.target.files;
    const fileUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const fileUrl = {
          url: reader.result,
          name: file.name,
          isImage: file.type && file.type.startsWith("image/"),
        };
        fileUrls.push(fileUrl);
        if (fileUrls.length === files.length) {
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
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
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
            placeholder="질문을 입력하세요."
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
