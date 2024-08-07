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
      const ctrlOrCmd = event.ctrlKey || event.metaKey;
      const isShift = event.shiftKey;

      if (ctrlOrCmd && isShift) {
        switch (event.key) {
          case "1":
            console.log("Alt/Option + Shift + 1");
            if (promptList[0]) {
              setCurrentPrompt({
                id: promptList[0].promptId,
                name: promptList[0].promptTitle,
              });
            }
            break;
          case "2":
            console.log("Alt/Option + Shift + 2");
            if (promptList[1]) {
              setCurrentPrompt({
                id: promptList[1].promptId,
                name: promptList[1].promptTitle,
              });
            }
            break;
          case "3":
            console.log("Alt/Option + Shift + 3");
            if (promptList[2]) {
              setCurrentPrompt({
                id: promptList[2].promptId,
                name: promptList[2].promptTitle,
              });
            }
            break;
          default:
            return; // 다른 키 조합은 무시
        }
        event.preventDefault(); // 브라우저 기본 동작 방지
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [promptList, setCurrentPrompt]);
}

export default useGlobalShortcuts;
