import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
    communityPromptListPageState,
    isLoadingCommunityState,
    stateChange,
} from "../../recoil/community/communityRecoilState";
import styles from "./PageBar.module.css";

function PageBar() {
    const [pageState, setPageState] = useRecoilState(
        communityPromptListPageState,
    );
    const { currentPage, totalPages } = pageState ?? {};
    const isLoading = useRecoilValue(isLoadingCommunityState);
    const setStateChange = useSetRecoilState(stateChange);

    const userCurrentPage = currentPage + 1;

    const handlePageChange = (newPage) => {
        setPageState({
            ...pageState,
            currentPage: newPage - 1,
        });
        setStateChange((prevValue) => prevValue + 1);
    };

    const pageNumbers = [];
    const maxPageButtons = 5; // Adjust as needed
    const startPage = Math.max(
        1,
        userCurrentPage - Math.floor(maxPageButtons / 2),
    );
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div> // 로딩 중일 때 Loading 메시지 표시
            ) : (
                <div>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className={styles.pagination}>
                            <button
                                onClick={() =>
                                    handlePageChange(userCurrentPage - 1)
                                }
                                disabled={userCurrentPage === 1}
                            >
                                &lt;
                            </button>
                            {pageNumbers.map((number) => (
                                <button
                                    key={number}
                                    onClick={() => handlePageChange(number)}
                                    className={
                                        userCurrentPage === number
                                            ? styles.active
                                            : ""
                                    }
                                >
                                    {number}
                                </button>
                            ))}
                            <button
                                onClick={() =>
                                    handlePageChange(userCurrentPage + 1)
                                }
                                disabled={userCurrentPage === totalPages}
                            >
                                &gt;
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default PageBar;
