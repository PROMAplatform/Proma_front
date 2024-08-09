import React, { useEffect, useState } from "react";
import PromptListItem from "./PromptListItem";
import styles from "./PromptList.module.css";
import { useRecoilValue } from "recoil";
import { promptListState } from "../../../../recoil/prompt/promptRecoilState";
import { useChattingRoomHooks } from "../../../../api/chatting/chatting";
import SkeletonListItem from "../SkeletonListItem";
import { t } from "i18next";

function PromptList() {
    const [isLoading, setIsLoading] = useState(true);
    const { fetchPromptList } = useChattingRoomHooks();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await fetchPromptList();
            setIsLoading(false);
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 더미로 우선은 하고 나중에 전부 recoil로 수정할 것
    const promptList = useRecoilValue(promptListState);
    // 나중에 이 부분은 consts 라는 폴더에서 관리할 것임.
    const allCategories = [
        "전체",
        "IT",
        "게임",
        "글쓰기",
        "건강",
        "교육",
        "예술",
        "기타",
    ];

    const [selectedCategory, setSelectedCategory] = useState("전체"); // 단일 선택

    const filteredPrompts =
        selectedCategory === "전체"
            ? promptList
            : promptList.filter((proma) =>
                  proma.promptCategory.includes(selectedCategory),
              );

    return (
        <div className={styles.container}>
            <div className={styles.categoryContainer}>
                {allCategories.map((category) => (
                    <button
                        key={category}
                        className={`${styles.categoryButton} ${
                            selectedCategory === category ? styles.active : ""
                        }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            {isLoading ? ( // 로딩 중일 때
                <div className={styles.promptListContainer}>
                    {Array.from({ length: filteredPrompts.length || 5 }).map(
                        (_, index) => (
                            <SkeletonListItem key={index} />
                        ),
                    )}
                </div>
            ) : filteredPrompts.length > 0 ? (
                <div className={styles.promptListContainer}>
                    {filteredPrompts.slice().map((prompt, index) => (
                        <PromptListItem
                            key={index}
                            emoji={prompt.emoji}
                            promptId={prompt.promptId}
                            name={prompt.promptTitle}
                        />
                    ))}
                </div>
            ) : (
                <p>{t(`sideBar.emptyPrompt`)}</p>
            )}
        </div>
    );
}

export default PromptList;
