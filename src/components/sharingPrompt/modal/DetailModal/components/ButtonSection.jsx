import React, {useState} from 'react';
import styles from "./ButtonSection.module.css";
import DeletePromptModal from "../../DeleteModal/DeletePromptModal";
import {useRecoilValue} from "recoil";
import {myPageState} from "../../../../../recoil/community/myPageRecoilState";
import PostFixOrShare from "../../FixAndShareModal/PostFixOrShare";

function ButtonSection({postId, onClose, onApi}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const isMyPageState = useRecoilValue(myPageState);

    function handleScrap() {
        // 실제 스크랩 로직 (API 호출 등)
        onClose();
        console.log("프로젝트 게시글 스크랩 : ", postId);
    }

    function handleDelete() {
        // 실제 삭제 로직 (API 호출 등)
        onClose();
        console.log("프로젝트 게시글 삭제 : ", postId);
    }

    function handleFix(data) {
        // 실제 수정 로직 (API 호출 등)
        console.log({
            "postTitle" : data.title,
            "postDescription" : data.description,
            "post_category" : data.category,
        });

        onClose();
        console.log("프로젝트 게시글 수정 : ", postId);
    }

    //모달을 열기 위한 상태
    function handlePromptClick() {setIsModalOpen(true);}
    function handleEditClick() {setIsEditModalOpen(true);}

    return (
        <div>
            {isMyPageState === "write" &&
                <div className={styles.buttonSection}>
                    <button onClick={handleEditClick}>수정하기</button>
                    <button onClick={handlePromptClick}>삭제하기</button>
                </div>
            }
            {(isMyPageState === "" || isMyPageState === "like") &&
                <button onClick={handleScrap}>스크랩하기</button>
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