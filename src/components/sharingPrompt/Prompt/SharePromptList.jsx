import React from "react";
import styles from "./SharePromptList.module.css";
import ComPromptListItem from "./ComPromptListItem";

function SharePromptList () {

    const promas = [
        {
            postId: 1, postTitle: "제목1",
            postDescription: "게시글 설명1",
            userName: "박민기",
            likeCount: 1,
            promptId: 1,
            promptType: "Task/Research",
            prompt_category : "IT",
            promptPreview: "프롬포트 미리보기1"
        },
        {
            postId: 2, postTitle: "제목2",
            postDescription: "게시글 설명2",
            userName: "박민기",
            likeCount: 1,
            promptId: 2,
            promptType: "Task/Research",
            prompt_category : "IT",
            promptPreview: "프롬포트 미리보기2"
        },
        {
            postId: 3, postTitle: "제목3",
            postDescription: "게시글 설명3",
            userName: "박민기",
            likeCount: 1,
            promptId: 3,
            promptType: "Task/Research",
            prompt_category : "IT",
            promptPreview: "프롬포트 미리보기3"
        },
        {
            postId: 4, postTitle: "제목4",
            postDescription: "게시글 설명4",
            userName: "박민기",
            likeCount: 1,
            promptId: 4,
            promptType: "Task/Research",
            prompt_category : "IT",
            promptPreview: "프롬포트 미리보기4"
        },
        {
            postId: 5, postTitle: "제목5",
            postDescription: "게시글 설명5",
            userName: "박민기",
            likeCount: 1,
            promptId: 5,
            promptType: "Task/Research",
            prompt_category : "IT",
            promptPreview: "프롬포트 미리보기5"
        },
        {
            postId: 6, postTitle: "제목6",
            postDescription: "게시글 설명6",
            userName: "박민기",
            likeCount: 1,
            promptId: 6,
            promptType: "Task/Research",
            prompt_category : "IT",
            promptPreview: "프롬포트 미리보기6"
        },
        {
            postId: 7, postTitle: "제목7",
            postDescription: "게시글 설명7",
            userName: "박민기",
            likeCount: 1,
            promptId: 7,
            promptType: "Task/Research",
            prompt_category : "IT",
            promptPreview: "프롬포트 미리보기7"
        },
    ];

    return(
        <div>
            <div className={styles.promptContainer}>
                {promas.map((proma) => (
                    <ComPromptListItem key={proma.postId} prompt={proma}/>))}
            </div>
        </div>
    )
}

export default SharePromptList;