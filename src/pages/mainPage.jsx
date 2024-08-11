import React from "react";
import SideBar from "../components/SideBar/SideBar";
import styles from "./mainPage.module.css";
import Chatting from "../components/Chatting/Chatting";
import MainTour from "./mainTour";

function MainPage() {
  return (
    <div className={styles.container}>
      <MainTour/>
      <SideBar/>
      <div className={styles.content}>
        <Chatting />
      </div>
    </div>
  );
}

export default MainPage;
