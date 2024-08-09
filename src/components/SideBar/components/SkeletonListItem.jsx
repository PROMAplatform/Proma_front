import React from "react";
import styles from "./SkeletonListItem.module.css";

function SkeletonListItem() {
    return (
        <div className={styles.container}>
            <div className={styles.iconNName}>
                <div
                    className={`${styles.emojiPickerButton} ${styles.skeleton}`}
                />
                <div className={`${styles.title} ${styles.skeleton}`} />
            </div>
            <div className={`${styles.menuButton} ${styles.skeleton}`} />
        </div>
    );
}

export default SkeletonListItem;
