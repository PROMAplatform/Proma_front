import React, { useEffect, useState } from "react";
import styles from "./CategoryButton.module.css";
import { useRecoilValue } from "recoil";
import { modalStackState } from "../../../../recoil/community/communityRecoilState";

function CategoryButton({ selectCategory, setSelectCategory }) {
    const modalState = useRecoilValue(modalStackState);

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

    const [selectedCategory, setSelectedCategory] = useState(
        selectCategory ?? "전체",
    );

    // filteredCategories 상태를 selectCategory와 modalState를 기반으로 계산
    const filteredCategories =
        selectedCategory === "전체" || modalState.length === 0
            ? allCategories
            : allCategories.filter((category) => category !== "전체");

    useEffect(() => {
        console.log(filteredCategories);
        setSelectCategory(selectedCategory);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory, modalState, setSelectedCategory, filteredCategories]);

    return (
        <div>
            <div className={styles.categoryContainer}>
                {filteredCategories.map((category) => (
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
        </div>
    );
}

export default CategoryButton;
