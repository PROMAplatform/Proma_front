import React, {useState} from "react";
import styles from "./SharePromptList.module.css";
import ComPromptListItem from "./ComPromptListItem";

function SharePromptList () {

    const promas = [
        { type: "캐릭터", name: "PROMPT 1", explain: "프롬프트에 대한 설명", imageurl: "test", categories: ["IT"], like: 1, preview: "미리보기"},
        { type: "Free", name: "PROMPT 2", explain: "프롬프트에 대한 설명",imageurl: "test", categories: ["게임"], like: 8, preview: "미리보기"},
        { type: "캐릭터", name: "PROMPT 3", explain: "프롬프트에 대한 설명",imageurl: "test", categories: ["글쓰기"], like: 1, preview: "미리보기"},
        { type: "Task", name: "PROMPT 4", explain: "프롬프트에 대한 설명",imageurl: "test", categories: ["IT"], like: 5, preview: "미리보기"},
        { type: "캐릭터", name: "PROMPT 5", explain: "프롬프트에 대한 설명",imageurl: "test", categories: ["건강"], like: 1, preview: "미리보기"},
        { type: "Free", name: "PROMPT 6", explain: "프롬프트에 대한 설명",imageurl: "test", categories: ["교육"], like: 2, preview: "미리보기"},
        { type: "Task", name: "PROMPT 7", explain: "프롬프트에 대한 설명",imageurl: "test", categories: ["예술"], like: 4, preview: "미리보기"},
    ];

    return(
        <div>
            <div className={styles.promptContainer}>
                {promas.map((proma, index) => (
                    <ComPromptListItem key={index}
                                       type={proma.type}
                                       explain={proma.explain}
                                       categories={proma.categories}
                                       like={proma.like}
                                       name={proma.name}
                                       imageurl={proma.imageurl}
                                       preview={proma.preview}/>))}
            </div>
        </div>
    )
}

export default SharePromptList;