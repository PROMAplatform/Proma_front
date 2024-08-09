// recoilState.js
import {atom} from "recoil";


export const communityPromptListState = atom({
    key: "communityPromptListState",
    default: [],
});

export const communityPromptListPageState = atom({
    key: "communityPromptListPageState",
    default: {
        currentPage : 0,
        totalPages : 0,
        pageSize : 0,
        totalItems : 0,
        currentItems : 0,
    },
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
    default: {
        pomptId: 0,
        promptMethod: '',
        promptTitle: '',
        promptCategory: '',
        promptDescription: '',
        promptPreview: '',
        listPromptAtom: [],
    },
});

export const modalStackState = atom({
    key: 'modalStackState',
    default: [],
});

export const isLoadingCommunityState = atom({
   key: 'isLoadingCommunity',
   default: false,
});

export const stateChange = atom({
   key : 'stateChange',
   default: 0,
});