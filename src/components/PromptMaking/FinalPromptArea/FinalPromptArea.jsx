import React from "react";
import styles from "./FinalPromptArea.module.css";
import RefinedPromptText from "./RefinedPromptText";
const FinalPromptArea = () => {
  //TODO- 프롬프트 다듬기 LLM 으로 변환
  //TODO- 태우네 서버 LLM 통신 로딩 Recoil 추가, Axios 추가 생성
  function handlePromptTrim() {
    console.log("프롬프트 다듬기 클릭");
  }
  return (
    <div className={styles.resultArea}>
      <h3 className={styles.resultTitle}>프롬프트 미리보기</h3>
      <RefinedPromptText />
      <button onClick={handlePromptTrim}> 프롬프트 다듬기 </button>
    </div>
  );
};

export default FinalPromptArea;
