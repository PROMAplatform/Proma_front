import React, { useEffect, useRef } from "react";
import {
  messageState,
  isLoadingState,
} from "../../../../recoil/chatting/chattingRecoilState";
import { useRecoilValue } from "recoil";
import promaChattingProfile from "../../../../assets/images/promaChattingProfile.svg";
import SkeletonMessage from "./SkeletonMessage";
import filePreview from "../../../../assets/images/filePreview.svg";
import MarkdownRenderer from "./MarkdownRenderer";
import styles from "./ChattingMessages.module.css";

function ChattingMessages() {
  const messages = useRecoilValue(messageState);
  const isLoading = useRecoilValue(isLoadingState);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isImageFile = (file) => {
    if (typeof file === "string") {
      const imageExtensions = [
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".bmp",
        ".webp",
      ];
      return imageExtensions.some((ext) => file.toLowerCase().endsWith(ext));
    }
    if (file && file.type) {
      return file.type.startsWith("image/");
    }
    return false;
  };

  //보낼 때는 File이고, 올 때는 File의 url이기 때문에, 다르게 해줘야 함.
  const getFileName = (file) => {
    if (typeof file === "string") {
      const parts = file.split("/");
      return decodeURIComponent(parts[parts.length - 1]);
    }
    if (file && file.name) {
      return file.name;
    }
    return "Unknown File";
  };

  //보낼 때는 File이고, 올 때는 File의 url이기 때문에, 다르게 해줘야 함.
  const getFileUrl = (file) => {
    if (typeof file === "string") {
      return file;
    }
    if (file && file.url) {
      return file.url;
    }
    return "";
  };

  return (
    <div className={styles.messagesContainer}>
      {messages.map((message, index) => (
        <div key={message.chatroomId} className="b5">
          <div className={styles.sendMessage}>
            {message.messageFile && (
              <div className={styles.imageContainer}>
                <a
                  href={getFileUrl(message.messageFile)}
                  download={getFileName(message.messageFile)}
                >
                  <img
                    src={
                      isImageFile(message.messageFile)
                        ? getFileUrl(message.messageFile)
                        : filePreview
                    }
                    alt="preview"
                    className={styles.image}
                  />
                </a>
                {!isImageFile(message.messageFile) && (
                  <p className={[styles.fileName, "b6"].join(" ")}>
                    {getFileName(message.messageFile)}
                  </p>
                )}
              </div>
            )}
            {message.messageQuestion && (
              <div className={styles.message}>{message.messageQuestion}</div>
            )}
          </div>
          {message.messageAnswer && (
            <div className={styles.receiveMessage}>
              <div className={styles.promaChattingProfile}>
                <img src={promaChattingProfile} alt="proma profile" />
              </div>
              <div className={styles.receiveMessageText}>
                <MarkdownRenderer text={message.messageAnswer} />
              </div>
            </div>
          )}
        </div>
      ))}
      {isLoading && (
        <div className={styles.receiveMessage}>
          <div className={styles.promaChattingProfile}>
            <img src={promaChattingProfile} alt="proma profile" />
          </div>
          <div className={styles.receiveMessageText}>
            <SkeletonMessage />
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChattingMessages;
