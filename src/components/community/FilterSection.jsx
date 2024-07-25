import React, {useState} from "react";
import styles from "./FilterSection.module.css";
import {ReactComponent as WriteIcon} from "../../assets/images/writeIcon.svg";

function FilterSection() {
    const allCategories = [
        "전체",
        "IT",
        "게임",
        "글쓰기",
        "건강",
        "교육",
        "예술",
    ];

    const [selectedCategory, setSelectedCategory] = useState("전체"); // 단일 선택

    /*const filteredPrompts =
        selectedCategory === "전체"
            ? promas
            : promas.filter((proma) => proma.categories.includes(selectedCategory));
    */
    function handleWriteClick() {
        console.log("작성하기 클릭");
    }

    return(
        <div>
            <h1 className={styles.title}>커뮤니티</h1>
            <div className={styles.searchBarSection}>
                <input className={styles.searchBar} type="text"
                       placeholder={"검색"}
                />
            </div>
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
            <div className={styles.buttonSection}>
                {/*이 부분을 클릭해서 fetching으로 list받아올거임 (백에서 정렬한 list로)*/}
                <div>
                    최신순 | 좋아요순
                </div>
                <button className={styles.writeButton} onClick={handleWriteClick}>
                    <WriteIcon/>
                    작성하기
                </button>
            </div>
        </div>
    )
}

export default FilterSection;