import React from "react";
import SideBar from "../components/SideBar/SideBar";
import styles from "./mainPage.module.css";
import Chatting from "../components/Chatting/Chatting";
import MainTour from "./mainTour";
import useScreenSize from "../hooks/common/useScreenSize";
import MobileMessage from "../components/common/MobileMessage";

function MainPage() {
    const isDesktop = useScreenSize(); // 커스텀 훅 사용

    if (!isDesktop) {
        return <MobileMessage />;
    }

    return (
        <div className={styles.container}>
            <MainTour />
            <SideBar />
            <div className={styles.content}>
                <Chatting />
            </div>
        </div>
    );
}

export default MainPage;
