import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    currentPromptState,
    promptListState,
} from "../../recoil/prompt/promptRecoilState";

function useGlobalShortcuts() {
    const promptList = useRecoilValue(promptListState);
    const setCurrentPrompt = useSetRecoilState(currentPromptState);

    useEffect(() => {
        const handleKeyDown = (event) => {
            // Windows와 Mac 모두에서 작동하도록 수정
            const isModifierKey = event.altKey || event.metaKey;
            const isShift = event.shiftKey;
            console.log(event.key);
            if (isModifierKey && isShift) {
                switch (event.key) {
                    case "1":
                    case "2":
                    case "3":
                        const index = parseInt(event.key) - 1;
                        console.log(`Ctrl/Cmd + Shift + ${event.key}`);
                        if (promptList[index]) {
                            setCurrentPrompt({
                                id: promptList[index].promptId,
                                name: promptList[index].promptTitle,
                            });
                        }
                        event.preventDefault(); // 브라우저 기본 동작 방지
                        break;
                    default:
                        return; // 다른 키 조합은 무시
                }
            }
        };

        // 이벤트 리스너를 문서 레벨에 추가
        document.addEventListener("keydown", handleKeyDown, true);

        return () => {
            document.removeEventListener("keydown", handleKeyDown, true);
        };
    }, [promptList, setCurrentPrompt]);
}

export default useGlobalShortcuts;
