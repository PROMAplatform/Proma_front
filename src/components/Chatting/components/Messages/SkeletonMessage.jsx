import React from "react";
import styles from "./SkeletonMessage.module.css";

function SkeletonMessage() {
    return (
        <div className={styles.skeletonContainer}>
            <div className={styles.skeletonMessage}>
                <div className={styles.skeletonText}></div>
                <div className={styles.skeletonText}></div>
            </div>
        </div>
    );
}

export default SkeletonMessage;