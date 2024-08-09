import React, { useState } from "react";
import styles from "./TopSection.module.css";
import { ReactComponent as LikeImg } from "../../../../../assets/images/likeImg.svg";
import { ReactComponent as LikeTrue } from "../../../../../assets/images/heartTrue.svg";
import { useCommunityHooks } from "../../../../../api/community/community";
import { useSetRecoilState } from "recoil";
import { stateChange } from "../../../../../recoil/community/communityRecoilState";

function TopSection({ post, onClose }) {
    const setStateChange = useSetRecoilState(stateChange);
    const [localLikeState, setLocalLikeState] = useState(post.likeState);
    const [localLikeCount, setLocalLikeCount] = useState(post.likeCount);
    const { likePost } = useCommunityHooks();

    function handleClickLike() {
        likePost(post.postId);

        if (localLikeState === true) {
            setLocalLikeState(false);
            setLocalLikeCount((prevValue) => prevValue - 1);
        } else {
            setLocalLikeState(true);
            setLocalLikeCount((prevValue) => prevValue + 1);
        }

        setStateChange((prevValue) => prevValue + 1);
        console.log("좋아요 버튼 : ", post.postId);
    }

    return (
        <div>
            <div className={styles.topSection}>
                <div>{post.promptMethod}</div>
                <div className={styles.likeSection}>
                    <div>{post.postTitle}</div>
                    <div>by {post.userName}</div>
                    <div className={styles.likeButton}>
                        {localLikeCount}
                        {localLikeState === true ? (
                            <LikeTrue onClick={handleClickLike} />
                        ) : (
                            <LikeImg onClick={handleClickLike} />
                        )}
                    </div>
                </div>
                <div>
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
}

export default TopSection;
