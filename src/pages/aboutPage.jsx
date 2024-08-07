import React from "react";
import { useNavigate } from "react-router-dom";
import { H1, B1 } from "../styles/font-styles";
import NavigateButton from "../components/common/NavigateButton";
import styles from "./aboutPage.module.css";
import BlockAnimation from "../components/common/BlockAnimation";

function AboutPage() {
  const navigate = useNavigate();
  const moveTOCommunity = () => {
    navigate("/community");
  }

  const moveToChatting = () => {
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <BlockAnimation />
      <H1>모두를 위한 프롬프트 엔지니어링</H1>
      <B1>블록형 프롬프트로 쉽고 빠르게 AI와 소통하세요</B1>
      <div className={styles.buttonContainer}>
        <NavigateButton title="community" variant="primary" onClick={moveTOCommunity}/>
        <NavigateButton title="chatting" variant="secondary" onClick={moveToChatting}/>
      </div>
    </div>
  );
}

export default AboutPage;