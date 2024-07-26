import React from 'react';
import styles from "./TopSection.module.css";
import {ReactComponent as LikeImg} from "../../../../../assets/images/likeImg.svg";

function TopSection({post, onClose}) {
    function handleClick() {
        //좋아요 버튼 api
        console.log("좋아요 버튼");
    }

    //ToDo - 좋아요 버튼의 user가 누름에 따른 클릭방지 동작, 백엔드에서 데이터 넘겨주는것 확인되면 수정
    return (
        <div>
            <div className={styles.topSection}>
                <div>
                    {post.promptType}
                </div>
                <div className={styles.likeSection}>
                    <div>
                        {post.postTitle}
                    </div>
                    <div>
                        {post.userName}
                    </div>
                    <div className={styles.likeButton}>
                        <LikeImg onClick={handleClick}/>{post.likeCount}
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