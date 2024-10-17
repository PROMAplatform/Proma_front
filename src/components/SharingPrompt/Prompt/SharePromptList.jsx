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
    const [filledPostList, setFilledPostList] = useState([]);

    useEffect(() => {
        setFilledPostList(
            Array.isArray(postList)
                ? Array.from(
                      { length: 9 },
                      (_, index) => postList[index] || null,
                  )
                : Array.from({ length: 9 }, () => null),
        );
    }, [postList]);

    console.log(modalStack);

    return (
        <>
            <div className={styles.backGround}>
                <div className={styles.promptContainer}>
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
