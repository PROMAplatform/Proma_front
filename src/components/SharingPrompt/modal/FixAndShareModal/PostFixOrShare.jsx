import React, {useState} from 'react';
import styles from "./PostFixOrShare.module.css";
import MakeBlockPreview from "../components/MakeBlockPreview";
import CategoryButton from "../../components/FilterComponents/CategoryButton";
import {H3, H4} from "../../../../styles/font-styles";
import ModalButton from "../../../common/ModalButton";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {makePromptDetailState, stateChange} from "../../../../recoil/community/communityRecoilState";
import {isLoadingState} from "../../../../recoil/chatting/chattingRecoilState";
import {categoryBlockShapesState} from "../../../../recoil/prompt/promptRecoilState";
import {ReactComponent as ExitIcon} from "../../../../assets/images/exitIcon.svg";

function PostFixOrShare({close, onApi, state}) {
    const promptExample = useRecoilValue(makePromptDetailState);
    const setStateChange = useSetRecoilState(stateChange);
    const isLoading = useRecoilValue(isLoadingState);
    const [selectCategory, setSelectCategory] = useState(promptExample.promptCategory);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const categoryBlockShapesArray = useRecoilValue(categoryBlockShapesState);
    const predefinedColors = [
        "var(--block-main-color)",
        "var(--block-purple)",
        "var(--block-pink)",
        "var(--block-red)",
        "var(--block-orange)",
        "var(--block-green)",
        "var(--blokc-blue)"
    ];

    const categoryStyles = {};
    const categories = [...new Set(promptExample.listPromptAtom.map(block => block.blockCategory))];

    categories.forEach((category, index) => {
        categoryStyles[category] = {
            color: predefinedColors[index % predefinedColors.length],
            shape: categoryBlockShapesArray[index % categoryBlockShapesArray.length][1]
        };
    });

    console.log(promptExample.listPromptAtom);

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
            category: selectCategory
        };
        setStateChange(prevValue => prevValue + 1);
        onApi(data);
        close();
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.modalTitle}>
                        {state === "fix" ? <H3>게시글 정보 수정하기</H3>
                            : <H3>프롬프트 공유하기</H3>
                        }
                    </div>
                    <div className={styles.closeButton}>
                        <ExitIcon onClick={close}/>
                    </div>
                </div>

                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <div className={styles.blockSection}>
                            {promptExample.listPromptAtom ? (
                                promptExample.listPromptAtom.
                                map((block) => <MakeBlockPreview categoryStyles={categoryStyles} block={block} key={block.blockId} size={"small"}/>)
                            ) : (
                                <>데이터가 없습니다.</>
                            )}
                        </div>
                    </>
                )}

                <div className={styles.titleSection}>
                    <H4>게시글 제목</H4>
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
                        className={styles.inputTextBoxEx}
                        placeholder={promptExample.promptDescription}
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
                <div className={styles.titleSection}>
                    <H4>프롬프트 카테고리</H4>
                    <CategoryButton selectCategory={selectCategory} setSelectCategory={setSelectCategory}/>
                </div>
                <div className={styles.buttonSection}>
                    {state === "fix" ? <ModalButton title={"수정하기"} variant={'primary'} onClick={handleButton}/>
                        : <ModalButton title={"공유하기"} variant={'primary'} onClick={handleButton}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default PostFixOrShare;