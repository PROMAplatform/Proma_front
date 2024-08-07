import React, {useEffect, useState} from 'react';
import styles from "./SortButton.module.css";

function SortButton({setSortOrder}) {
    const [selectedState, setSelectedState] = useState("latest");

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
                    className={selectedState === "latest" ? styles.active : ""}
                    onClick={() => handleStateClick("latest")}
                >
                    최신순
                </div>
                <div>|</div>
                <div
                    className={selectedState === "like" ? styles.active : ""}
                    onClick={() => handleStateClick("like")}
                >
                    좋아요순
                </div>
            </div>
        </div>
    );
}

export default SortButton;