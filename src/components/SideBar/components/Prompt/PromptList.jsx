import React, { useState } from "react";
import PromptListItem from "./PromptListItem";
import styles from "./PromptList.module.css";

function PromptList() {

  // 더미로 우선은 하고 나중에 전부 recoil로 수정할 것
  const promas = [
    { name: "PROMPT 1", categories: ["IT", "글쓰기"] },
    { name: "PROMPT 2", categories: ["게임"] },
    { name: "PROMPT 3", categories: ["글쓰기", "예술"] },
    { name: "PROMPT 4", categories: ["IT", "교육"] },
    { name: "PROMPT 5", categories: ["건강"] },
    { name: "PROMPT 6", categories: ["교육"] },
    { name: "PROMPT 7", categories: ["예술"] },
  ];

  // 

  // 나중에 이 부분은 consts 라는 폴더에서 관리할 것임.
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
      <div>
        {filteredPrompts.map((proma, index) => (
          <PromptListItem key={index} name={proma.name} />
        ))}
      </div>
    </div>
  );
}

export default PromptList;
