import React, {useState} from "react";
import styles from "./MyFilterSection.module.css";
import SortButton from "../../components/FilterComponents/SortButton";
import CategoryButton from "../../components/FilterComponents/CategoryButton";
import {useRecoilValue} from "recoil";
import {myPageState} from "../../../../recoil/community/myPageRecoilState";

function MyFilterSection() {
    const isMyPageState = useRecoilValue(myPageState);

    const [selectCategory, setSelectCategory] = useState("전체");
    const [sortOrder, setSortOrder] = useState("최신순");

    console.log( {
        params: {
            category: selectCategory === "전체" ? "" : selectCategory,
            sort: sortOrder,
        },
    });

    return(
        <div>
            {isMyPageState === "like" ? (
                <h1 className={styles.title}>내가 좋아요한 게시글</h1>
            ):(
                <h1 className={styles.title}>내가 작성한 게시글</h1>
            )}

            <div className={styles.buttonSection}>
                <SortButton setSortOrder={setSortOrder}/>
            </div>
            <CategoryButton setSelectCategory={setSelectCategory}/>
        </div>
    );
}

export default MyFilterSection;