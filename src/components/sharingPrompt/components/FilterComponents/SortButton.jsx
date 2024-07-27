import React, {useEffect, useState} from 'react';
import styles from "./SortButton.module.css";

function SortButton({setSortOrder}) {
    const [selectedState, setSelectedState] = useState("최신");

    const handleStateClick = (state) => {
        setSelectedState(state);
    };

    useEffect(() => {
        setSortOrder(selectedState);
    }, [selectedState, setSortOrder]);

    return (
        <div>
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
    );
}

export default SortButton;