import React from "react";
import styles from "./myPage.module.css";
import MyFilterSection from "../components/sharingPrompt/mypage/filterSection/MyFilterSection";
import SharePromptList from "../components/sharingPrompt/Prompt/SharePromptList";

function MyPage() {
    return(
        <div className={styles.backGround}>
            <MyFilterSection/>
            <SharePromptList/>
        </div>
    );
}

export default MyPage;