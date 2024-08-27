import React from "react";
import SharePromptList from "../components/SharingPrompt/Prompt/SharePromptList";
import FilterSection from "../components/SharingPrompt/FilterSection/FilterSection";
import PageBar from "../components/SharingPrompt/PageBar/PageBar";

function CommunityPage() {
    return(
        <>
            <FilterSection/>
            <SharePromptList/>
            <PageBar/>
        </>
    );
}

export default CommunityPage;
