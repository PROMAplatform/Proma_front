import React, {useState} from "react";
import styles from "./FilterSection.module.css";
import {ReactComponent as WriteIcon} from "../../../assets/images/writeIcon.svg";
import SelectPromptModal from "../modal/SelectModal/SelectPromptModal";
import SortButton from "../components/FilterComponents/SortButton";
import CategoryButton from "../components/FilterComponents/CategoryButton";

function FilterSection() {
    const [selectCategory, setSelectCategory] = useState("전체"); // 단일 선택
    const [sortOrder, setSortOrder] = useState("최신순");
    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log( {
        params: {
            category: selectCategory === "전체" ? "" : selectCategory,
            sort: sortOrder,
        },
    });

    return(
        <div>
            <h1 className={styles.title}>커뮤니티</h1>
            <div className={styles.searchBarSection}>
                <input className={styles.searchBar} type="text"
                       placeholder={"검색"}
                />
            </div>
            <CategoryButton setSelectCategory={setSelectCategory}/>
            <div className={styles.buttonSection}>
                <SortButton setSortOrder={setSortOrder}/>
                <div>
                    <button className={styles.writeButton} onClick={() => setIsModalOpen(true)}>
                        <WriteIcon/>
                        작성하기
                    </button>
                    <SelectPromptModal isOpen={isModalOpen}
                                       onClose={() => setIsModalOpen(false)} />
                </div>
            </div>
        </div>
    );
}

export default FilterSection;