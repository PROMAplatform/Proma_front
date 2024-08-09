import React, { useEffect, useState } from "react";
import styles from "./SortButton.module.css";
import { t } from "i18next";

function SortButton({ setSortOrder }) {
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
                    {t(`community.up-to-date`)}
                </div>
                <div>|</div>
                <div
                    className={selectedState === "like" ? styles.active : ""}
                    onClick={() => handleStateClick("like")}
                >
                    {t(`community.up-to-like`)}
                </div>
            </div>
        </div>
    );
}

export default SortButton;
