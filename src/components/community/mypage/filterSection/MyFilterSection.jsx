import React, {useState} from "react";
import styles from "./MyFilterSection.module.css";

function MyFilterSection(curentstate) {
    const allCategories = [
        "전체",
        "IT",
        "게임",
        "글쓰기",
        "건강",
        "교육",
        "예술",
    ];

    const [selectedCategory, setSelectedCategory] = useState("전체");
    
    const [selectedState, setSelectedState] = useState("최신");

    const handleStateClick = (state) => { // 핸들러 함수 분리
        setSelectedState(state);
    };

    return(
        <div>
            {curentstate.state === "like" ? (
                <h1 className={styles.title}>내가 좋아요한 프롬프트</h1>
            ):(
                <h1 className={styles.title}>내가 작성한 프롬프트</h1>
            )}

            <div className={styles.buttonSection}>
                <div className={styles.stateButton}>
                    <div
                        className={selectedState === "최신" ? styles.active : ""}
                        onClick={() => handleStateClick("최신")}
                    >
                        최신순
                    </div>
                    <div>|</div>
                    <div
                        className={selectedState === "좋아요" ? styles.active : ""}
                        onClick={() => handleStateClick("좋아요")}
                    >
                        좋아요순
                    </div>
                </div>
            </div>
            <></>
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

export default MyFilterSection;