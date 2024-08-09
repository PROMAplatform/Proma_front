import { atom } from "recoil";

export const shortCutState = atom({
    key: "shortCutAtom",
    default: {
        value1: "default1",
        value2: "default2",
    },
});
