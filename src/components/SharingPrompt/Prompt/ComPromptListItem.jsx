import React from "react";
import styles from "./ComPromptListItem.module.css";
import { ReactComponent as LikeButton } from "../../../assets/images/likeButton.svg";
import { ReactComponent as LikeTrue } from "../../../assets/images/heartTrue.svg";
import PromptDetailModal from "./modal/DetailModal/PromptDetailModal";
import {useModalStack} from "../../../hooks/useModalStack";
import {B6, B7, H5} from "../../../styles/font-styles";
import {useCommunityHooks} from "../../../api/community/community";
import {methodImage} from "../util/methodImage";
import {t} from "i18next";

function ComPromptListItem({ post }) {
    const modalStack = useModalStack();
    const { getCommunityPromptDetail } = useCommunityHooks();

    const handleDetailModal = () => {
        getCommunityPromptDetail(post.postId);

        modalStack.push({
            key: "promptDetailModal",
            Component: PromptDetailModal,
            componentProps: { post: post },
            backdropTransparent: true,
        });
    };

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.card}>
                    <div
                        className={styles.containerFront}
                        onClick={handleDetailModal}
                    >
                        <div className={styles.typeSection}>
                            <img src={methodImage[post.promptMethod]} alt={post.promptMethod}/>
                            <div className={styles.typeText}>
                                {post.promptMethod}
                            </div>
                        </div>
                        <div className={styles.explainSection}>
                            <div className={styles.categorieSection}>
                                {post.postCategory}
                            </div>
                            <div className={styles.descriptionSection}>
                                <H5>{post.postTitle}</H5>
                                <div className={styles.descriptionSectionText}>
                                    <B7>{post.postDescription}</B7>
                                </div>
                            </div>
                        </div>
                        <div className={styles.userSection}>
                            <div>{post.userName}</div>
                            <div className={styles.likeSection}>
                                <div className={styles.likeText}>
                                    {post.likeCount}
                                </div>
                                {post.likeState === true ? (
                                    <LikeTrue />
                                ) : (
                                    <LikeButton />
                                )}
                            </div>
                        </div>
                    </div>

                    <div
                        className={styles.containerBack}
                        onClick={handleDetailModal}
                    >
                        <div className={styles.typeSection}>
                            <img src={methodImage[post.promptMethod]} alt={post.promptMethod}/>
                            <div className={styles.typeText}>
                                {post.promptMethod}
                            </div>
                        </div>
                        <div className={styles.backExplainSection}>
                            <H5>{t(`promptMaking.promptPreView`)}</H5>
                            <div className={styles.promptPreviewContainer}>
                                <B6>{post.promptPreview}</B6>
                            </div>
                        </div>
                        <div className={styles.userSection}>
                            <div>{post.userName}</div>
                            <div className={styles.likeSection}>
                                <div className={styles.likeText}>
                                    {post.likeCount}
                                </div>
                                {post.likeState === true ? (
                                    <LikeTrue />
                                ) : (
                                    <LikeButton />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ComPromptListItem;
