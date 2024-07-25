import React, {useState} from "react";
import styles from "./ComPromptListItem.module.css";
import { ReactComponent as TypeIcon } from "../../../assets/images/typeIcon.svg";
import { ReactComponent as LikeButton } from "../../../assets/images/likeButton.svg";
import PromptDetailModal from "../modal/DetailModal/PromptDetailModal";

function ComPromptListItem({post}) {

    /*const promas = [
        { type: "캐릭터", name: "PROMPT 1", explain: "프롬프트에 대한 설명", imageurl: "test", categories: ["IT", "글쓰기"], like: 1 },
        { type: "Free", name: "PROMPT 2", explain: "프롬프트에 대한 설명",imageurl: "test", categories: ["게임"], like: 8 },
        { type: "캐릭터", name: "PROMPT 3", explain: "프롬프트에 대한 설명",imageurl: "test", categories: ["글쓰기", "예술"], like: 1 },
        { type: "Task", name: "PROMPT 4", explain: "프롬프트에 대한 설명",imageurl: "test", categories: ["IT", "교육"], like: 5 },
        { type: "캐릭터", name: "PROMPT 5", explain: "프롬프트에 대한 설명",imageurl: "test", categories: ["건강"], like: 1 },
        { type: "Free", name: "PROMPT 6", explain: "프롬프트에 대한 설명",imageurl: "test", categories: ["교육"], like: 2 },
        { type: "Task", name: "PROMPT 7", explain: "프롬프트에 대한 설명",imageurl: "test", categories: ["예술"], like: 4 },
    ];*/

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handlePromptClick() {
        setIsModalOpen(true);
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.card}>
                    <div className={styles.containerFront} onClick={handlePromptClick}>
                        <div className={styles.typeSection}>
                            <TypeIcon />
                            <div className={styles.typeText}>
                                {post.promptType}
                            </div>
                        </div>
                        <div className={styles.explainSection}>
                            <div className={styles.categorieSection}>
                                {post.prompt_category}
                            </div>
                            <h3>{post.postTitle}</h3>
                            <h3>{post.postDescription}</h3>
                        </div>
                        <div className={styles.likeSection}>
                            <div className={styles.likeText}>
                                {post.likeCount}
                            </div>
                            <LikeButton />
                        </div>
                    </div>

                    <div className={styles.containerBack} onClick={handlePromptClick}>
                        <div className={styles.typeSection}>
                            <TypeIcon />
                            <div className={styles.typeText}>
                                {post.promptType}
                            </div>
                        </div>
                        <div className={styles.explainSection}>
                            {post.promptPreview}
                        </div>
                        <div className={styles.likeSection}>
                            <div className={styles.likeText}>
                                {post.likeCount}
                            </div>
                            <LikeButton />
                        </div>
                    </div>
                </div>
            </div>
            <PromptDetailModal postId={post.postId} post={post}
                               isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>

    );
}

export default ComPromptListItem;