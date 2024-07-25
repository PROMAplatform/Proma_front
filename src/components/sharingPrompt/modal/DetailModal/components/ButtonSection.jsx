import React, {useState} from 'react';
import styles from "../PromptDetailModal.module.css";
import DeletePromptModal from "../../DeleteModal/DeletePromptModal";
import {useRecoilValue} from "recoil";
import {myPageState} from "../../../../../recoil/community/myPageRecoilState";
import PostFixOrShare from "../../FixAndShareModal/PostFixOrShare";

function ButtonSection({onClose}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const isMyPageState = useRecoilValue(myPageState);

    function handleDelete() {
        // 실제 삭제 로직 (API 호출 등)

        onClose();
        console.log("프로젝트 게시글 삭제");
    }

    function handleFix(data) {
        // 실제 수정 로직 (API 호출 등)
        console.log({
            "postTitle" : data.title,
            "postDescription" : data.description,
            "post_category" : data.category,
        });

        onClose();
        console.log("프로젝트 게시글 수정");
    }

    function handlePromptClick() {
        setIsModalOpen(true);
    }

    function handleEditClick() {
        setIsEditModalOpen(true);
    }


    //ToDo - 스크랩 기능 구현
    return (
        <div>
            {isMyPageState === "write" &&
                <div className={styles.buttonSection}>
                    <button onClick={handleEditClick}>수정하기</button>
                    <button onClick={handlePromptClick}>삭제하기</button>
                </div>
            }
            {(isMyPageState === "" || isMyPageState === "like") &&
                <button>스크랩하기</button>
            }
            <DeletePromptModal isOpen={isModalOpen}
                               onDelete={handleDelete}
                               onClose={() => setIsModalOpen(false)}
            />
            <PostFixOrShare isOpen={isEditModalOpen}
                            onApi={handleFix}
                            state={"fix"}
                            onClose={() => setIsEditModalOpen(false)}
            />
        </div>
    );
}

export default ButtonSection;