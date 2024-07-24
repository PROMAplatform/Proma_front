import { useEffect } from "react";
import { shortCutState } from "../../recoil/util/utilRecoilState";
import { useRecoilState } from "recoil";

function useGlobalShortcuts() {
  const [shortCutAtom, setShortCutAtom] = useRecoilState(shortCutState);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isCmdOrCtrl = event.metaKey || event.ctrlKey;
      // cmd (macOS) 또는 ctrl

      // Cmd/Ctrl + Shift + A
      if (isCmdOrCtrl && event.shiftKey && event.key === "A") {
        setShortCutAtom((prevValue) => ({
          ...prevValue,
          value1: "changed1",
        }));
      }
      // Cmd/Ctrl + Shift + B
      if (isCmdOrCtrl && event.shiftKey && event.key === "B") {
        setShortCutAtom((prevValue) => ({
          ...prevValue,
          value2: "changed2",
        }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShortCutAtom]);

  return shortCutAtom;
}

export default useGlobalShortcuts;
