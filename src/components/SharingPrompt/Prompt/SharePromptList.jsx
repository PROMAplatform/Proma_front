import React, { useEffect, useState } from "react";
import styles from "./SharePromptList.module.css";
import ComPromptListItem from "./ComPromptListItem";
import { useRecoilValue } from "recoil";
import {
    communityPromptListState,
    modalStackState,
} from "../../../recoil/community/communityRecoilState";
import EmptyPromptListItem from "./components/EmptyPromptListItem";

function SharePromptList() {
    const postList = useRecoilValue(communityPromptListState);
    const modalStack = useRecoilValue(modalStackState);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [filledPostList, setFilledPostList] = useState([]);
    const [gridClassName, setGridClassName] = useState(styles.threeItems);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const size = windowWidth > 1100 ? 9 : 8;

        setGridClassName(size === 9 ? styles.threeItems : styles.twoItems);

        setFilledPostList(
            Array.isArray(postList)
                ? Array.from(
                      { length: size },
                      (_, index) => postList[index] || null,
                  )
                : Array.from({ length: size }, () => null),
        );
    }, [postList]);

    return (
        <>
            <div className={styles.backGround}>
                <div className={`${styles.promptContainer} ${gridClassName}`}>
                    {filledPostList.map((post, index) =>
                        post ? (
                            <ComPromptListItem key={index} post={post} />
                        ) : (
                            <EmptyPromptListItem key={index} />
                        ),
                    )}
                </div>
            </div>
        </>
    );
}

export default SharePromptList;
