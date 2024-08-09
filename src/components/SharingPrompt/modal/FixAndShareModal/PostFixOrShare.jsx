import React, { useState } from "react";
import styles from "./PostFixOrShare.module.css";
import MakeBlockPreview from "../components/MakeBlockPreview";
import CategoryButton from "../../components/FilterComponents/CategoryButton";
import { H3, H4 } from "../../../../styles/font-styles";

function PostFixOrShare({ close, onApi, state }) {
    //recoil상태로 불러올 데이터
    const promptExample = {
        pomptId: 1,
        promptType: "Task",
        promptTitle: "test1",
        promptCategory: "글쓰기",
        promptDescription: "프롬포트 설명",
        promptPreview: "프롬포트 미리보기",
        selectPromptAtom: [
            {
                blockId: 1,
                blockTitle: "선생님",
                blockCategory: "화자",
            },
            {
                blockId: 2,
                blockTitle: "박민기222",
                blockCategory: "청자",
            },
        ],
    };

    const [selectCategory, setSelectCategory] = useState(
        promptExample.promptCategory,
    );
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    function handleButton() {
        const data = {
            title: title || promptExample.promptTitle,
            description: description || promptExample.promptDescription,
            category: selectCategory,
        };
        onApi(data);
        close();
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    {state === "fix" ? (
                        <H3>게시글 정보 수정하기</H3>
                    ) : (
                        <H3>프롬프트 공유하기</H3>
                    )}
                    <button onClick={close}>닫기</button>
                </div>

                <div className={styles.blockSection}>
                    {promptExample.selectPromptAtom.map((block) => (
                        <MakeBlockPreview key={block.blockId} props={block} />
                    ))}
                </div>
                <div className={styles.titleSection}>
                    <H4>게시글제목</H4>
                    <input
                        type="text"
                        className={styles.inputTextBox}
                        placeholder={promptExample.promptTitle}
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div className={styles.titleSection}>
                    <H4>프롬프트 설명</H4>
                    <input
                        type="text"
                        className={styles.inputTextBox}
                        placeholder={promptExample.promptDescription}
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
                <div className={styles.titleSection}>
                    <H4>프롬프트 카테고리</H4>
                    <CategoryButton
                        selectCategory={selectCategory}
                        setSelectCategory={setSelectCategory}
                    />
                </div>
                <div>
                    {state === "fix" ? (
                        <button onClick={handleButton}>수정하기</button>
                    ) : (
                        <button onClick={handleButton}>공유하기</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PostFixOrShare;
