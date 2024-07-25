import React from "react";
import SharePromptList from "../components/community/Prompt/SharePromptList";
import styles from "./communityPage.module.css";
import FilterSection from "../components/community/FilterSection";


function CommunityPage() {
    return(
        <div className={styles.backGround}>
            <FilterSection/>
            <SharePromptList/>
        </div>
    );
}

export default CommunityPage;