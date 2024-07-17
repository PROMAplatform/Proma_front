import React from "react";
import MyFilterSection from "./filterSection/MyFilterSection";
import SharePromptList from "../Prompt/SharePromptList";

function LikePromptList() {

    const promas = [
        { type: "캐릭터", name: "PROMPT 1", explain: "프롬프트에 대한 설명", imageurl: "test", categories: ["IT"], like: 1, preview: "미리보기"},
        { type: "캐릭터", name: "PROMPT 3", explain: "프롬프트에 대한 설명",imageurl: "test", categories: ["글쓰기"], like: 1, preview: "미리보기"},
        { type: "Task", name: "PROMPT 4", explain: "프롬프트에 대한 설명",imageurl: "test", categories: ["IT"], like: 5, preview: "미리보기"},
        { type: "Task", name: "PROMPT 7", explain: "프롬프트에 대한 설명",imageurl: "test", categories: ["예술"], like: 4, preview: "미리보기"},
    ];

    return(
        <>
            <MyFilterSection state={"like"}/>
            <SharePromptList/>
        </>
    );
}

export default LikePromptList;