import React, {useRef} from "react";
import styles from "./ChattingInput.module.css"
import { messageState } from "../../recoil/chatting/chattingRecoilState";
import useInput from "../../hooks/useInput";
import { useRecoilState } from "recoil";
import fileInputIcon from "../../assets/images/fileInputIcon.svg";
import submitButtonIcon from "../../assets/images/submitButtonIcon.svg";

function ChattingInput() {
    const [messages, setMessages] = useRecoilState(messageState);
    const input = useInput("");
    const fileInputRef = useRef(null);

    const handleSubmit = (e) => {
      e.preventDefault();
      if(input.value.trim()) {
        setMessages([...messages, input.value])
        input.reset();
      }
    };

    const handleIconClick = () => {
        if(fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    return (
        <div className={styles.inputContainer}>
            <form onSubmit={handleSubmit} className={styles.input}>
                <input type="file" className={styles.fileInput} ref={fileInputRef}/>
                <label for="file" className={styles.fileLable} onClick={handleIconClick}>
                    <img src={fileInputIcon} alt="icon"/>
                </label>
                <input
                    type="text"
                    value={input.value}
                    onChange={input.onChange}
                    placeholder="질문을 입력하세요."
                    className={[styles.textInput, 'text500_16'].join(' ')} 
                />
                <button type="submit" className={styles.submitButton}>
                    <img src={submitButtonIcon} />
                </button>
            </form>
        </div>
    );
}

export default ChattingInput;