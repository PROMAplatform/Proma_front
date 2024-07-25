import React, {useEffect, useState} from 'react';
import styles from "./CategoryButton.module.css";

function CategoryButton({selectCategory, setSelectCategory}) {
    const allCategories = [
        "전체",
        "IT",
        "게임",
        "글쓰기",
        "건강",
        "교육",
        "예술",
    ];

    const [selectedCategory, setSelectedCategory] = useState(
        selectCategory ?? "전체"
    );

    useEffect(() => {
        setSelectCategory(selectedCategory);
    }, [selectedCategory, setSelectCategory]);

    return (
        <div>
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
        </div>
    );
}

export default CategoryButton;