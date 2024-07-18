import React from "react";
import styles from "./ChattingMain.module.css";
import PromptCreateButton from "./Prompt/PromptCreateButton";
import characterIcon from "../../../assets/images/characterIcon.svg";
import taskIcon from "../../../assets/images/taskIcon.svg";
import freeIcon from "../../../assets/images/freeIcon.svg";

function ChattingMain() {
    return (
        <div className={styles.container}>
            <div className={[styles.title, 'h1'].join(' ')}>
                나만의 프롬프트 작성하기
            </div>
            <div className={styles.typeContainer}>
                <PromptCreateButton type="Character" icon={characterIcon} content="나만의 캐릭터를 만들어 대화해봐요!" />
                <PromptCreateButton type="Task/Research" icon={taskIcon} content="과제나 업무를 도와줍니다" />
                <PromptCreateButton type="Free" icon={freeIcon} content="자유로운 대화를 해봅시다!" />
            </div>
        </div>
    );
}
export default ChattingMain;