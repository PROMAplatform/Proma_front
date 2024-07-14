import React, { useState } from 'react';
import useInput from '../../hooks/useInput';
import styles from './Chatting.module.css';

function Chatting() {
    const [messages, setMessages] = useState([]);
    const input = useInput("");

    const handleSubmit = (e) => {
      e.preventDefault();
      if(input.value.trim()) {
        setMessages([...messages, input.value])
        input.reset();
      }
    };
    return (
        <div className={styles.container}>
            <div className={styles.messagesContainer}>
                {messages.map((message, index) => (
                    <div key={index} className={styles.message}>
                        {message}
                        </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} >
                <input
                    type="text"
                    value={input.value}
                    onChange={input.onChange}
                    placeholder="질문을 입력하세요."
                    className={[styles.inputContainer, 'text500_16'].join(' ')} 
                />
                <button type="submit" className={styles.button}>Submit</button>
            </form>
        </div>
    );
}

export default Chatting;