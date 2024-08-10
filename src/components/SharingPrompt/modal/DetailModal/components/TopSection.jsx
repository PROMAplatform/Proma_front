import React, { useState } from "react";
import styles from "./TopSection.module.css";
import {ReactComponent as LikeImg} from "../../../../../assets/images/likeImg.svg";
import {ReactComponent as LikeTrue} from "../../../../../assets/images/heartTrue.svg";
import {ReactComponent as ExitIcon} from "../../../../../assets/images/exitIcon.svg";
import {useCommunityHooks} from "../../../../../api/community/community";
import {useSetRecoilState} from "recoil";
import {stateChange} from "../../../../../recoil/community/communityRecoilState";
import {methodImage} from "../../../util/methodImage";
import {B4, B6, H3} from "../../../../../styles/font-styles";
import {useNavigate} from "react-router-dom";

function TopSection({ post, onClose }) {
    const setStateChange = useSetRecoilState(stateChange);
    const [localLikeState, setLocalLikeState] = useState(post.likeState);
    const [localLikeCount, setLocalLikeCount] = useState(post.likeCount);
    const { likePost } = useCommunityHooks();
    const userName = localStorage.getItem("userName");
    const navigate = useNavigate();

    function handleClickLike() {
        if (userName) {
            likePost(post.postId);

            if (localLikeState === true) {
                setLocalLikeState(false);
                setLocalLikeCount((prevValue) => prevValue - 1);
            } else {
                setLocalLikeState(true);
                setLocalLikeCount((prevValue) => prevValue + 1);
            }
        } else {
            navigate("/login");
            onClose();
        }
    }

    function handleCloseClick() {
        setStateChange(prevValue => prevValue + 1);
        onClose();
    }

    return (
        <div>
            <div className={styles.topSection}>
                <div className={styles.methodSection}>
                    <img src={methodImage[post.promptMethod]} alt={post.promptMethod}/>
                    {post.promptMethod}
                </div>
                <div className={styles.likeSection}>
                    <div>
                        <H3>{post.postTitle}</H3>
                    </div>
                    <div>
                        <B4>by {post.userName}</B4>
                    </div>
                    <div className={styles.likeButtonSection}>
                        <div className={styles.likeButton}>
                            {localLikeState === true ? <LikeTrue onClick={handleClickLike}/>
                                : <LikeImg onClick={handleClickLike}/>}
                            <B6>{localLikeCount}</B6>
                        </div>
                    </div>
                </div>
                <div className={styles.closeSection}>
                    <div className={styles.closeButton}>
                        <ExitIcon onClick={handleCloseClick}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopSection;
