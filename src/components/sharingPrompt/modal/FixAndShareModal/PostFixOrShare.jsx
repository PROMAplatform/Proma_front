import React, {useState} from 'react';
import styles from "./PostFixOrShare.module.css";
import MakeBlockPreview from "../components/MakeBlockPreview";
import useModal from "../../../../hooks/useModal";
import CategoryButton from "../../components/FilterComponents/CategoryButton";

function PostFixOrShare({isOpen, onClose, onApi, state}) {
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
                blockCategory: "화자"
            },
            {
                blockId: 2,
                blockTitle: "박민기222",
                blockCategory: "청자"
            },
        ]
    };

    const [selectCategory, setSelectCategory] = useState(promptExample.promptCategory);
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
            category: selectCategory
        };
        onApi(data);
        onClose();
    }

    const { isModalOpen, handleOverlayClick } = useModal(isOpen, onClose);
    if (!isModalOpen) return null; // 훅에서 반환된 isModalOpen 사용

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.container}>
                {state === "fix" ? <div>게시글 정보 수정하기</div>
                    : <div>프롬프트 공유하기</div>
                }
                <button onClick={onClose}>닫기</button>
                <div>
                    {promptExample.selectPromptAtom.map((block) => (
                        <MakeBlockPreview key={block.blockId} props={block}/>))}
                </div>
                <div>게시글제목</div>
                <input
                    type="text"
                    placeholder={promptExample.promptTitle}
                    value={title}
                    onChange={handleTitleChange}
                />
                <div>프롬프트 설명</div>
                <input
                    type="text"
                    placeholder={promptExample.promptDescription}
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <div>프롬프트 카테고리</div>
                <CategoryButton selectCategory={selectCategory} setSelectCategory={setSelectCategory}/>
                {state === "fix" ? <button onClick={handleButton}>수정하기</button>
                    : <button onClick={handleButton}>공유하기</button>
                }
            </div>
        </div>
    );
}

export default PostFixOrShare;