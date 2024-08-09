import { atom } from "recoil";

export const messageState = atom({
    key: "messageState",
    default: [],
});

export const chattingRoomListState = atom({
    key: "chattingRoomListState",
    default: [],
});

export const currentRoomIdState = atom({
    key: "currentRoomIdState",
    default: null,
});

export const isFirstState = atom({
    key: "isFirstState",
    default: true,
});

export const isLoadingState = atom({
    key: "isLoadingState",
    default: false,
});
