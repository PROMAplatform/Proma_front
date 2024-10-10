import React from "react";
import SharePromptList from "../components/SharingPrompt/Prompt/SharePromptList";
import FilterSection from "../components/SharingPrompt/FilterSection/FilterSection";
import PageBar from "../components/SharingPrompt/PageBar/PageBar";
import useScreenSize from "../hooks/common/useScreenSize";
import MobileMessage from "../components/common/MobileMessage";

function CommunityPage() {
    const isDesktop = useScreenSize(); // 커스텀 훅 사용

    if (!isDesktop) {
        return <MobileMessage />;
    }

    return (
        <>
            <FilterSection />
            <SharePromptList />
            <PageBar />
        </>
    );
}

export default CommunityPage;
