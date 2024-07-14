import React from "react";
import MyFilterSection from "./filterSection/MyFilterSection";
import SharePromptList from "../Prompt/SharePromptList";

function WritePromptList () {

    const promas = [
        { type: "Free", name: "PROMPT 2", explain: "프롬프트에 대한 설명",imageurl: "test", categories: ["게임"], like: 8, preview: "미리보기"},
        { type: "캐릭터", name: "PROMPT 5", explain: "프롬프트에 대한 설명",imageurl: "test", categories: ["건강"], like: 1, preview: "미리보기"},
        { type: "Free", name: "PROMPT 6", explain: "프롬프트에 대한 설명",imageurl: "test", categories: ["교육"], like: 2, preview: "미리보기"},
    ];

    return(
        <>
            <MyFilterSection state={"write"}/>
            <SharePromptList/>
        </>
    )
}

export default WritePromptList;