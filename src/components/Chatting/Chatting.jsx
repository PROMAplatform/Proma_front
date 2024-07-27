import React, {useState} from 'react';
import styles from './Chatting.module.css';
import { messageState } from '../../recoil/chatting/chattingRecoilState';
import { useRecoilState } from 'recoil';
import ChattingInput from './components/Input/ChattingInput';
import ChattingMain from './components/ChattingMain';
import ChattingMessages from './components/Messages/ChattingMessages';

function Chatting() {
    const [messages, setMessages] = useRecoilState(messageState);
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(null);

    return (
        <div className={styles.container}>
            {messages.length === 0 ? (
                <ChattingMain /> // messages가 비어 있을 때 ChattingMain 컴포넌트 렌더링
            ) : (
                <ChattingMessages 
                    loadingMessageIndex={loadingMessageIndex}
                    setLoadingMessageIndex={setLoadingMessageIndex}
                />
            )}
            <ChattingInput />
        </div>
    );
}

export default Chatting;