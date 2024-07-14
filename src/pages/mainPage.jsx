import React from "react";
import useInput from "../hooks/useInput";
import SideBar from "../components/SideBar/SideBar";
import styles from "./mainPage.module.css"
import Chatting from "../components/Chatting/Chatting";

function MainPage() {
  const name = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Name: ${name.value}`);
    name.reset();
  };

  return (
    // <form onSubmit={handleSubmit}>
      <div>
        <SideBar />
        <div className={styles.content}>
          <Chatting />
        </div>
      </div>
    // </form>
  );
}

export default MainPage;
