import React, {useEffect, useState} from 'react';
import styles from "./CategoryButton.module.css";
import {useRecoilValue} from "recoil";
import {modalStackState} from "../../../../recoil/community/communityRecoilState";

function CategoryButton({selectCategory, setSelectCategory}) {
    const modalState = useRecoilValue(modalStackState);

    const allCategories = [
        "전체",
        'IT',
        '게임',
        '글쓰기',
        '건강',
        '교육',
        '예술',
        '기타',
    ];

    const [selectedCategory, setSelectedCategory] = useState(
        selectCategory ?? "전체"
    );

    // filteredCategories 상태를 selectCategory와 modalState를 기반으로 계산
    const filteredCategories = (selectedCategory === "전체" || modalState.length === 0)
        ? allCategories
        : allCategories.filter(category => category !== "전체");

    useEffect(() => {
        console.log(filteredCategories); // 디버깅용
        setSelectCategory(selectedCategory);
    }, [selectedCategory, modalState, setSelectedCategory, filteredCategories]); // 필요한 의존성 추가

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