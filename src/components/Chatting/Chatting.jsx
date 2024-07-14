import React, {useEffect, useRef} from 'react';
import styles from './Chatting.module.css';
import { messageState } from '../../recoil/chatting/chattingRecoilState';
import { useRecoilState } from 'recoil';
import ChattingInput from './components/ChattingInput';
import promaChattingProfile from '../../assets/images/promaChattingProfile.svg';
import ChattingMain from './components/ChattingMain';

function Chatting() {
    const [messages, setMessages] = useRecoilState(messageState);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    return (
        <div className={styles.container}>
            {messages.length === 0 ? (
                <ChattingMain /> // messages가 비어 있을 때 ChattingMain 컴포넌트 렌더링
            ) : (
            <div className={styles.messagesContainer}>
                {messages.map((message, index) => (
                    <div key={index} className='text500_16'>
                        <div className={styles.sendMessage}>
                            <div className={styles.message}>
                                {message}
                            </div>
                        </div>
                        <div className={styles.receiveMessage}>
                            <div className={styles.promaChattingProfile}>
                                <img src={promaChattingProfile} />
                            </div>
                            <div className={styles.receiveMessageText}>
                                Answer
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            )}
            <ChattingInput />
        </div>
    );
}

export default Chatting;