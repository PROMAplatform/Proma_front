// recoilState.js
import { atom } from "recoil";

export const communityPromptListState = atom({
  key: "communityPromptListState",
  default: [],
});

export const communityPromptDetailState = atom({
  key: "communityPromptDetailState",
  default: [],
});

export const makePromptListState = atom({
  key: "makePromptListState",
  default: [],
});

export const makePromptDetailState = atom({
  key: "makePromptDetailState",
  default: {},
});