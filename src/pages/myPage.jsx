import React from "react";
import styles from "./myPage.module.css"
import {useLocation} from "react-router-dom";
import LikePromptList from "../components/community/mypage/LikePromptList";
import WritePromptList from "../components/community/mypage/WritePromptList";

function MyPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const data = searchParams.get("data");

    return(
        <div className={styles.backGround}>
            {data === "like" && <LikePromptList />}
            {data === "write" && <WritePromptList />}
        </div>
    );
}

export default MyPage;