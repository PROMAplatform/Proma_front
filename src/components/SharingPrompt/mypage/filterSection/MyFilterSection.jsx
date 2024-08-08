import React, {useEffect, useState} from "react";
import styles from "./MyFilterSection.module.css";
import SortButton from "../../components/FilterComponents/SortButton";
import CategoryButton from "../../components/FilterComponents/CategoryButton";
import {useRecoilState, useRecoilValue} from "recoil";
import {myPageState} from "../../../../recoil/community/myPageRecoilState";
import {useMyPageHooks} from "../../../../api/community/myPage";
import {communityPromptListPageState, stateChange} from "../../../../recoil/community/communityRecoilState";

function MyFilterSection() {
    const [isMyPageState] = useRecoilState(myPageState);
    const isStateChange = useRecoilValue(stateChange);
    const {currentPage} = useRecoilValue(communityPromptListPageState) ?? {currentPage: 0};
    const {getLikePromptList, getWritePromptList} = useMyPageHooks();

    const [selectCategory, setSelectCategory] = useState("전체");
    const [sortOrder, setSortOrder] = useState("최신순");

    useEffect(() => {
        let categoryParam = selectCategory === "전체" ? null : selectCategory;

        if (isMyPageState === "like") {
            getLikePromptList(categoryParam, sortOrder, currentPage);
        } else {
            getWritePromptList(categoryParam, sortOrder, currentPage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectCategory, sortOrder, isMyPageState, isStateChange]);

    console.log({
        params: {
            category: selectCategory === "전체" ? "" : selectCategory,
            sort: sortOrder,
        },
    });

    return(
        <div className={styles.backGround}>
            <div className={styles.titleSection}>
                <div className={styles.buttonSection}>
                    <SortButton setSortOrder={setSortOrder}/>
                </div>

                {isMyPageState === "like" ? (
                    <h1 className={styles.title}>내가 좋아요한 게시글</h1>
                ):(
                    <h1 className={styles.title}>내가 작성한 게시글</h1>
                )}
            </div>
            <div className={styles.lineSection}>
                <hr className={styles.line}/>
            </div>
            <CategoryButton setSelectCategory={setSelectCategory}/>
        </div>
    );
}

export default MyFilterSection;