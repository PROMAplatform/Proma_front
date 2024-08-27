import React from "react";
import MyFilterSection from "../components/SharingPrompt/FilterSection/MyFilterSection";
import SharePromptList from "../components/SharingPrompt/Prompt/SharePromptList";
import PageBar from "../components/SharingPrompt/PageBar/PageBar";

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
