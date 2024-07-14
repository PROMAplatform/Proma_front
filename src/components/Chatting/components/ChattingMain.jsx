import React from "react";
import styles from "./ChattingMain.module.css";

function ChattingMain() {

    return (
        <div className={styles.container}>
            <div className={[styles.title, 'text800_50'].join(' ')}>
                나만의 프롬프트 작성하기
            </div>
            <div className={styles.typeContainer}>
                <div className={styles.type}>
                    대화형
                </div>
                <div className={styles.type}>
                    질문형
                </div>
                <div className={styles.type}>
                    자유형
                </div>
            </div>
        </div>
    );
}
export default ChattingMain;