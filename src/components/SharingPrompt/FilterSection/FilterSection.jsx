import React, {useEffect, useState} from "react";
import styles from "./FilterSection.module.css";
import { ReactComponent as WriteIcon } from "../../../assets/images/writeIcon.svg";
import SelectPromptModal from "./modal/SelectModal/SelectPromptModal";
import SortButton from "./components/SortButton";
import CategoryButton from "./components/CategoryButton";
import { useModalStack } from "../../../hooks/useModalStack";
import { useCommunityHooks } from "../../../api/community/community";
import {
    communityPromptListPageState,
    stateChange,
} from "../../../recoil/community/communityRecoilState";
import { useRecoilValue } from "recoil";
import { t } from "i18next";
import {useNavigate} from "react-router-dom";

function FilterSection() {
    const [selectCategory, setSelectCategory] = useState("전체"); // 단일 선택
    const [sortOrder, setSortOrder] = useState("latest");
    const [searchQuery, setSearchQuery] = useState("");
    const modalStack = useModalStack();
    const navigate = useNavigate();
    const isStateChange = useRecoilValue(stateChange);
    const { currentPage } = useRecoilValue(communityPromptListPageState) ?? {
        currentPage: 0,
    };
    const { getCommunityPreviewPromptList, getCommunityPromptList, getMakePromptList } = useCommunityHooks();
    const userName = localStorage.getItem("userName");

    const [selectedPromptMethod, setSelectedPromptMethod] = useState(''); // 선택된 값 저장

    const handleSelectChange = (event) => {
        setSelectedPromptMethod(event.target.value);
    };

    const handleListModal = () => {
        if (userName) {
            getMakePromptList();
            modalStack.push({
                key: "promptListModal",
                Component: SelectPromptModal,
                componentProps: {},
                backdropTransparent: true,
            });
        } else {
            navigate("/login");
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // 엔터 키 기본 동작(폼 제출 등) 방지
            let categoryParam =
                selectCategory === "전체" ? null : selectCategory;

            if (userName === null) {
                getCommunityPreviewPromptList(
                    categoryParam,
                    sortOrder,
                    searchQuery,
                    currentPage,
                    selectedPromptMethod,
                );
            } else {
                getCommunityPromptList(
                    categoryParam,
                    sortOrder,
                    searchQuery,
                    currentPage,
                    selectedPromptMethod,
                );
            }
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            let categoryParam =
                selectCategory === "전체" ? null : selectCategory;

            if (userName === null) {
                getCommunityPreviewPromptList(
                    categoryParam,
                    sortOrder,
                    searchQuery,
                    currentPage,
                    selectedPromptMethod,
                );
            } else {
                getCommunityPromptList(
                    categoryParam,
                    sortOrder,
                    searchQuery,
                    currentPage,
                    selectedPromptMethod,
                );
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPromptMethod, selectCategory, sortOrder, searchQuery, isStateChange]);

    console.log({
        params: {
            category: selectCategory === "전체" ? "" : selectCategory,
            sort: sortOrder,
            method: selectedPromptMethod,
        },
    });

    return (
        <div>
            <div className={styles.searchBarSection}>
                <input
                    className={styles.searchBar}
                    type="text"
                    placeholder={t(`community.search`)}
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onKeyDown={handleSearchKeyDown}
                />
            </div>
            <div className={styles.sortSection}>
                <div className={styles.methodSection}>
                    <select value={selectedPromptMethod} onChange={handleSelectChange}>
                        <option value="">ALL</option>
                        <option value="Task/Research">Task</option>
                        <option value="Character">Character</option>
                        <option value="Free">Free</option>
                    </select>
                </div>
                <CategoryButton setSelectCategory={setSelectCategory} />
            </div>

            <div className={styles.buttonSection}>
                <SortButton setSortOrder={setSortOrder} />
                <div>
                    <button
                        className={styles.writeButton}
                        onClick={handleListModal}
                    >
                        <WriteIcon />
                        {t(`community.write`)}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FilterSection;
