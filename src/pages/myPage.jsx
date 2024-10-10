import React from "react";
import MyFilterSection from "../components/SharingPrompt/FilterSection/MyFilterSection";
import SharePromptList from "../components/SharingPrompt/Prompt/SharePromptList";
import PageBar from "../components/SharingPrompt/PageBar/PageBar";
import useScreenSize from "../hooks/common/useScreenSize";
import MobileMessage from "../components/common/MobileMessage";

function MyPage() {
    const isDesktop = useScreenSize(); // 커스텀 훅 사용

    if (!isDesktop) {
        return <MobileMessage />;
    }

    return (
        <>
            <MyFilterSection />
            <SharePromptList />
            <PageBar />
        </>
    );
}

export default MyPage;
