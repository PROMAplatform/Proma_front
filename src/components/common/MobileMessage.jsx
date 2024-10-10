import React from "react";
import { AlertTriangle } from "lucide-react";
import styles from "./MobileMessage.module.css";

const MobileMessage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.alert}>
                <AlertTriangle className={styles.icon} />
                <h2 className={styles.title}>PC 버전만 지원됩니다</h2>
                <div className={styles.description}>
                    <p className={styles.mainMessage}>
                        이 애플리케이션은 현재 데스크톱 환경에서만 사용
                        가능합니다. 화면 크기가 1024px 이상인 기기에서
                        접속해주세요.
                    </p>
                    <p className={styles.subMessage}>
                        모바일 버전은 현재 개발 중입니다. 불편을 드려
                        죄송합니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MobileMessage;
