import React, { useEffect, useMemo, useState } from "react";
import styles from "./MyFilterSection.module.css";
import SortButton from "./components/SortButton";
import CategoryButton from "./components/CategoryButton";
import { useRecoilState, useRecoilValue } from "recoil";
import { myPageState } from "../../../recoil/community/myPageRecoilState";
import { useMyPageHooks } from "../../../api/community/myPage";
import {
    communityPromptListPageState,
    stateChange,
} from "../../../recoil/community/communityRecoilState";
import { t } from "i18next";

function MyFilterSection() {
    const [isMyPageState] = useRecoilState(myPageState);
    const isStateChange = useRecoilValue(stateChange);
    const { currentPage } = useRecoilValue(communityPromptListPageState) ?? {
        currentPage: 0,
    };
    const { getLikePromptList, getWritePromptList } = useMyPageHooks();

    const [selectCategory, setSelectCategory] = useState("전체");
    const [sortOrder, setSortOrder] = useState("latest");
    const [selectedPromptMethod, setSelectedPromptMethod] = useState(''); // 선택된 값 저장


    const categoryParam = useMemo(
        () => (selectCategory === "전체" ? null : selectCategory),
        [selectCategory],
    );

    useEffect(() => {
        if (isMyPageState === "like") {
            getLikePromptList(categoryParam, sortOrder, currentPage, selectedPromptMethod);
        } else {
            getWritePromptList(categoryParam, sortOrder, currentPage, selectedPromptMethod);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectCategory, sortOrder, isMyPageState, isStateChange, selectedPromptMethod]);

    const handleSelectChange = (event) => {
        setSelectedPromptMethod(event.target.value);
    };

    return (
        <div className={styles.backGround}>
            <div className={styles.titleSection}>
                <div className={styles.buttonSection}>
                    <SortButton setSortOrder={setSortOrder} />
                </div>

                {isMyPageState === "like" ? (
                    <h1 className={styles.title}>
                        {t(`community.my-liked-post`)}
                    </h1>
                ) : (
                    <h1 className={styles.title}>
                        {t(`community.my-writed-post`)}
                    </h1>
                )}
            </div>
            <div className={styles.lineSection}>
                <hr className={styles.line} />
            </div>
            <div className={styles.sortSection}>
                <div className={styles.methodSection}>
                    <select value={selectedPromptMethod} onChange={handleSelectChange}>
                        <option value="">ALL</option>
                        <option value="Task/Research">Task</option>
                        <option value="Character">Character</option>
                        <option value="Free">Free</option>
                    </select>
                </div>
                <CategoryButton setSelectCategory={setSelectCategory} />
            </div>
        </div>
    );
}

export default MyFilterSection;
