import React from "react";
import styles from "./ComPromptListItem.module.css";
import { ReactComponent as PromptPreview } from "../../../assets/images/PromptPreview.svg";


function ComPromptListItem(props) {
    function handlePromptClick() {
        console.log("Prompt 클릭");
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.containerFront} onClick={handlePromptClick}>
                    <div>
                        <h3>{props.name}</h3>
                        <>{props.imageurl}</>
                    </div>
                </div>
                <div className={styles.containerBack} onClick={handlePromptClick}>
                        <PromptPreview/>
                </div>
            </div>
        </div>
    );
}

export default ComPromptListItem;