import React from "react";
import SharePromptList from "../components/sharingPrompt/Prompt/SharePromptList";
import styles from "./communityPage.module.css";
import FilterSection from "../components/sharingPrompt/community/FilterSection";


function CommunityPage() {
    return(
        <div className={styles.backGround}>
            <FilterSection/>
            <SharePromptList/>
        </div>
    );
}

export default CommunityPage;