import React from "react";
import MyFilterSection from "../components/SharingPrompt/mypage/filterSection/MyFilterSection";
import SharePromptList from "../components/SharingPrompt/Prompt/SharePromptList";
import PageBar from "../components/PageBar/PageBar";

function MyPage() {
  return (
    <>
      <MyFilterSection />
      <SharePromptList />
      <PageBar />
    </>
  );
}

export default MyPage;
