import React, { useEffect, useState, useRef } from "react";
import PromptListItem from "./PromptListItem";
import styles from "./PromptList.module.css";
import { useRecoilValue } from "recoil";
import { promptListState } from "../../../../recoil/prompt/promptRecoilState";
import { useChattingRoomHooks } from "../../../../api/chatting/chatting";
import SkeletonListItem from "../SkeletonListItem";
import blockIcon from "../../../../assets/images/blockIcon.svg";
import rightScrollIcon from "../../../../assets/images/rightScrollIcon.svg";
import leftScrollIcon from "../../../../assets/images/leftScrollIcon.svg";
import { B4 } from "../../../../styles/font-styles";
import { t } from "i18next";

function PromptList() {
    const scrollRef = useRef(null);
    const [scrollState, setScrollState] = useState("right");
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

    useEffect(() => {
        const handleScroll = (event) => {
            const scrollContainer = scrollRef.current;
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;

            if (scrollContainer) {
                if (scrollLeft <= (scrollWidth - clientWidth) / 2) {
                    setScrollState("right");
                } else {
                    setScrollState("left");
                }
            }
        };
        const scrollContainer = scrollRef.current;
        scrollContainer.addEventListener("scroll", handleScroll);

        handleScroll();
        // 컴포넌트가 unmount될 때 이벤트 리스너 제거
        return () => {
            scrollContainer.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLeftScroll = () => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            scrollContainer.scrollLeft = 0;
        }
    };

    const handleRightScroll = () => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            scrollContainer.scrollLeft =
                scrollContainer.scrollWidth - scrollContainer.clientWidth;
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.categoryContainer}>
                <div className={styles.categoryScrollContainer} ref={scrollRef}>
                    {allCategories.map((category) => (
                        <button
                            key={category}
                            className={`${styles.categoryButton} ${
                                selectedCategory === category
                                    ? styles.active
                                    : ""
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                {scrollState !== "left" && (
                    <img
                        src={rightScrollIcon}
                        alt="right scroll"
                        className={styles.rightScrollIcon}
                        onClick={handleRightScroll}
                    />
                )}
                {scrollState !== "right" && (
                    <img
                        src={leftScrollIcon}
                        alt="left scroll"
                        className={styles.leftScrollIcon}
                        onClick={handleLeftScroll}
                    />
                )}
            </div>
            <div className={styles.promptListWrapper} data-tour="promptList">
                {isLoading ? ( // 로딩 중일 때
                    <div className={styles.promptListContainer}>
                        {Array.from({
                            length: filteredPrompts.length || 5,
                        }).map((_, index) => (
                            <SkeletonListItem key={index} />
                        ))}
                    </div>
                ) : filteredPrompts.length > 0 ? (
                    <div className={styles.promptListContainer}>
                        {filteredPrompts.slice().map((prompt) => (
                            <PromptListItem
                                key={prompt.promptId}
                                emoji={prompt.emoji}
                                promptId={prompt.promptId}
                                name={prompt.promptTitle}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.empty}>
                        <img src={blockIcon} alt="empty" />
                        <B4 color="gray6">{t(`sideBar.emptyPrompt`)}</B4>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PromptList;
