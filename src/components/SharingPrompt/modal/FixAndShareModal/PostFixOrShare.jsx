import React, {useState} from 'react';
import styles from "./PostFixOrShare.module.css";
import MakeBlockPreview from "../components/MakeBlockPreview";
import CategoryButton from "../../components/FilterComponents/CategoryButton";
import {H3, H4} from "../../../../styles/font-styles";
import ModalButton from "../../../common/ModalButton";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {makePromptDetailState, stateChange} from "../../../../recoil/community/communityRecoilState";
import {isLoadingState} from "../../../../recoil/chatting/chattingRecoilState";
import {ReactComponent as ExitIcon} from "../../../../assets/images/exitIcon.svg";
import {t} from "i18next";

function PostFixOrShare({close, onApi, state}) {
    const promptExample = useRecoilValue(makePromptDetailState);
    const setStateChange = useSetRecoilState(stateChange);
    const isLoading = useRecoilValue(isLoadingState);
    const [selectCategory, setSelectCategory] = useState(promptExample.promptCategory);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const predefinedColors = [
        "var(--block-main-color)",
        "var(--block-purple)",
        "var(--block-pink)",
        "var(--block-red)",
        "var(--block-orange)",
        "var(--block-green)",
        "var(--blokc-blue)"
    ];

    const predefinedBlockShapes = [1, 2, 3, 4, 5, 6, 7];

    const categoryStyles = {};
    const categories = [
        ...new Set(promptExample.listPromptAtom.map((block) => block.blockCategory)),
    ];

    categories.forEach((category, index) => {
        categoryStyles[category] = {
            color: predefinedColors[index % predefinedColors.length],
            shape: predefinedBlockShapes[index % predefinedBlockShapes.length],
        };
    });

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
        setStateChange(prevValue => prevValue + 1);
        onApi(data);
        close();
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.modalTitle}>
                        {state === "fix" ? <H3>{t(`community.postFix`)}</H3>
                            : <H3>{t(`community.promptShare`)}</H3>
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
                                promptExample.listPromptAtom.map((block) => <MakeBlockPreview
                                    categoryStyles={categoryStyles} block={block} key={block.blockId} size={"small"}/>)
                            ) : (
                                <>데이터가 없습니다.</>
                            )}
                        </div>
                    </>
                )}

                <div className={styles.titleSection}>
                    <H4>{t(`community.postTitle`)}</H4>
                    <input
                        type="text"
                        className={styles.inputTextBox}
                        placeholder={promptExample.promptTitle}
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div className={styles.titleSection}>
                    <H4>{t(`community.postDescription`)}</H4>
                    <textarea
                        className={styles.inputTextBoxEx}
                        placeholder={promptExample.promptDescription}
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
                <div className={styles.titleSection}>
                    <H4>{t(`community.postCategory`)}</H4>
                    <CategoryButton
                        selectCategory={selectCategory}
                        setSelectCategory={setSelectCategory}
                    />
                </div>
                <div className={styles.buttonSection}>
                    {state === "fix" ? <ModalButton title={t(`sideBar.patch`)} variant={'primary'} onClick={handleButton}/>
                        : <ModalButton title={t(`community.share`)} variant={'primary'} onClick={handleButton}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default PostFixOrShare;
