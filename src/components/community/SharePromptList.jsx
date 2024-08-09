import React, {useState} from "react";
import styles from "./SharePromptList.module.css";
import ComPromptListItem from "./Prompt/ComPromptListItem";

function SharePromptList () {

    const promas = [
        { name: "PROMPT 1", imageurl: "test", categories: ["IT", "글쓰기"] },
        { name: "PROMPT 2", categories: ["게임"] },
        { name: "PROMPT 3", categories: ["글쓰기", "예술"] },
        { name: "PROMPT 4", categories: ["IT", "교육"] },
        { name: "PROMPT 5", categories: ["건강"] },
        { name: "PROMPT 6", categories: ["교육"] },
        { name: "PROMPT 7", categories: ["예술"] },
    ];

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

    const filteredPrompts =
        selectedCategory === "전체"
            ? promas
            : promas.filter((proma) => proma.categories.includes(selectedCategory));

    return(
        <div className={styles.backGround}>
            <h1 className={styles.title}>커뮤니티</h1>
            <div>
                <input className={styles.searchBar} type="text"/>
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
            <div className={styles.filterButton}>
                최신순 / 좋아요순
            </div>
            <div className={styles.promptContainer}>
                {filteredPrompts.map((proma, index) => (
                    <ComPromptListItem key={index} name={proma.name} imageurl={proma.imageurl} />
                ))}
            </div>
        </div>
    )
}

export default SharePromptList;