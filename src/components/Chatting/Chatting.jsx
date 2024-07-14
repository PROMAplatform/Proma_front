import React, { useState } from 'react';
import styles from './Chatting.module.css';
import { messageState } from '../../recoil/chatting/chattingRecoilState';
import { useRecoilState } from 'recoil';
import ChattingInput from './ChattingInput';
import promaChattingProfile from '../../assets/images/promaChattingProfile.svg';

function Chatting() {
    const [messages, setMessages] = useRecoilState(messageState);

    return (
        <div className={styles.container}>
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
            </div>
            <ChattingInput />
        </div>
    );
}

export default Chatting;