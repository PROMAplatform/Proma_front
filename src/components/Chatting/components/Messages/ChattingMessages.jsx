import React, {useEffect, useRef} from 'react';
import {
    messageState,
    isLoadingState,
  } from "../../../../recoil/chatting/chattingRecoilState";
import { useRecoilValue } from 'recoil';
import promaChattingProfile from '../../../../assets/images/promaChattingProfile.svg';
import SkeletonMessage from './SkeletonMessage';
import filePreview from '../../../../assets/images/filePreview.svg';
import MarkdownRenderer from './MarkdownRenderer';
import styles from "./ChattingMessages.module.css";
import { B6 } from "../../../../styles/font-styles";

function ChattingMessages() {
    const messages = useRecoilValue(messageState);
    const isLoading = useRecoilValue(isLoadingState);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    useEffect(() => {
      scrollToBottom();
      }, [messages]);
    
    return (
        <div className={styles.messagesContainer}>
            {messages.map((message, index) => (
                <div key={message.chat_id} className='b5'>
                    <div className={styles.sendMessage}>
                        {message.message_file?.map((file, index) => (
                            <div key={index} className={styles.imageContainer}>
                                <a href={file.url} download={file.name}>
                                    <img
                                        src={file.isImage ? file.url : filePreview}
                                        alt="preview"
                                        className={styles.image}
                                    />
                                </a>
                                {file.isImage === false ? (
                                    <div className={styles.fileName}>
                                        <B6>{file.name}</B6>
                                    </div>
                                ) : null}
                            </div>
                        ))}
                        {message.message_question && (
                            <div className={styles.message}>{message.message_question}</div>
                        )}
                    </div>
                    {message.message_answer && (
                        <div className={styles.receiveMessage}>
                            <div className={styles.promaChattingProfile}>
                                <img src={promaChattingProfile} alt="proma profile" />
                            </div>
                            <div className={styles.receiveMessageText}>
                                <MarkdownRenderer text={message.message_answer} />
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