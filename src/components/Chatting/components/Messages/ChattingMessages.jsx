import React, {useEffect, useRef, useState} from 'react';
import { messageState } from '../../../../recoil/chatting/chattingRecoilState';
import { useRecoilState } from 'recoil';
import promaChattingProfile from '../../../../assets/images/promaChattingProfile.svg';
import SkeletonMessage from './SkeletonMessage';
import filePreview from '../../../../assets/images/filePreview.svg';
import MarkdownRenderer from './MarkdownRenderer';
import styles from "./ChattingMessages.module.css";

function ChattingMessages({ loadingMessageIndex, setLoadingMessageIndex }) {
    const [messages, setMessages] = useRecoilState(messageState);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    useEffect(() => {
      scrollToBottom();
      }, [messages, loadingMessageIndex]);

    useEffect(() => {
      if (messages.length > 0) {
        const newMessageIndex = messages.length - 1;
        setLoadingMessageIndex(newMessageIndex);
        const timer = setTimeout(() => {
          setLoadingMessageIndex(null);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }, [messages]);

    const exampleAnswer = `
# 제목 1
## 제목 2
여기에 일반 텍스트를 작성합니다. 이 텍스트는 단락을 나타냅니다.
### 제목 3
* 기울임 (Italic) *기울임*
* 굵게 (Bold) **굵게**
* 기울임과 굵게 ***기울임과 굵게***
#### 목록 (Lists)
1. 첫 번째 항목
2. 두 번째 항목
    - 두 번째 항목의 하위 항목
3. 세 번째 항목
* 순서 없는 목록
    - 하위 항목 1
    - 하위 항목 2
#### 코드 블록 (Code Block)
\`\`\`javascript
function helloWorld() {
    console.log("Hello, world!");
}
\`\`\`
> 인용문와랄라
    `;
    
    return (
        <div className={styles.messagesContainer}>
            {messages.map((message, index) => (
                <div key={index} className='b5'>
                    <div className={styles.sendMessage}>
                        {message.files.map((file, index) => (
                            <div key={index} className={styles.imageContainer}>
                                <a href={file.url} download={file.name}>
                                    <img
                                        src={file.isImage ? file.url : filePreview}
                                        alt="preview"
                                        className={styles.image}
                                    />
                                </a>
                                {file.isImage === false ? (
                                    <p className={[styles.fileName, "b6"].join(' ')}>{file.name}</p>
                                ) : null}
                            </div>
                        ))}
                        {message.text && (
                            <div className={styles.message}>
                                {message.text}
                            </div>
                        )}
                    </div>
                        <div className={styles.receiveMessage}>
                        <div className={styles.promaChattingProfile}>
                            <img src={promaChattingProfile} />
                        </div>
                        {loadingMessageIndex === index ? ( // 로딩 중일 때 SkeletonMessage 컴포넌트 렌더링
                        <SkeletonMessage />
                    ) : (
                        <div className={styles.receiveMessageText}>
                            <MarkdownRenderer text={exampleAnswer} />
                        </div>
                        )}
                    </div>
                    
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default ChattingMessages;