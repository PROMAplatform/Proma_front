//myPage 작성, 좋아요 구분 state
import { atom } from "recoil";

export const myPageState = atom({
    key: "myPageState",
    default: "",
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet((newValue) => localStorage.setItem("myPageState", newValue));
        },
    ],
});
