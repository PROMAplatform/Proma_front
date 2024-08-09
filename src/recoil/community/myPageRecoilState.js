//myPage 작성, 좋아요 구분 state
import { atom, selector } from 'recoil';

// localStorage 값을 가져오는 Selector
const localStorageMyPageState = selector({
    key: 'localStorageMyPageState',
    get: () => {
        return localStorage.getItem('myPageState');
    },
});

// Recoil 상태 (localStorageMyPageState Selector를 의존성으로 가짐)
export const myPageState = atom({
    key: 'myPageState',
    default: localStorageMyPageState,
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet((newValue) => localStorage.setItem('myPageState', newValue));
        },
    ],
});

// localStorage 변경 감지 및 Recoil 상태 업데이트
window.addEventListener('storage', (event) => {
    if (event.key === 'myPageState') {
        myPageState.refresh(); // Recoil 상태 강제 업데이트
    }
});
