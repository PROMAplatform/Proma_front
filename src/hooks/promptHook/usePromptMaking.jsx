import { useRecoilState, useSetRecoilState } from "recoil";

import { enqueueSnackbar } from "notistack";
import {
  activeBlocksState,
  combinationsState,
} from "../../recoil/prompt/promptRecoilState";

export const usePromptMaking = () => {
  const [combinations, setCombinations] = useRecoilState(combinationsState);
  const setActiveBlocks = useSetRecoilState(activeBlocksState);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const [blockId, blockCategory] = draggableId.split("|");

    if (
      source.droppableId === "sidebar" &&
      destination.droppableId !== "sidebar"
    ) {
      //사이드바에서 사이드바가 아닌 곳으로 갈 때,
      handleSidebarToCombinationArea(
        destination.droppableId,
        blockId,
        blockCategory
      );
    } else if (
      source.droppableId !== "sidebar" &&
      destination.droppableId === "sidebar"
    ) {
      // 조합 창에서 사이드바로 갈 때,
      handleCombinationAreaToSidebar(source.droppableId, blockId);
    } else if (
      source.droppableId !== "sidebar" &&
      destination.droppableId !== "sidebar"
    ) {
      // 조합 창에서 조합창으로 갈 때,
      handleWithinCombinationArea(source.droppableId, destination.droppableId);
    }

    console.log("Drag ended:", result);
  };

  const handleSidebarToCombinationArea = (category, blockId, blockCategory) => {
    if (category !== blockCategory) {
      enqueueSnackbar(
        `🚀 카테고리가 일치하지 않습니다! ${blockCategory} 블럭에 넣어주세요! `
      );
      return;
    }

    setCombinations((prev) => ({
      ...prev,
      [category]: blockId,
    }));

    setActiveBlocks((prev) => ({
      ...prev,
      [category]: prev[category].filter((block) => block !== blockId),
    }));

    handleCombinationChange({
      ...combinations,
      [category]: blockId,
    });
  };

  const handleCombinationAreaToSidebar = (category, blockId) => {
    setCombinations((prev) => ({
      ...prev,
      [category]: null,
    }));

    setActiveBlocks((prev) => ({
      ...prev,
      [category]: [...prev[category], blockId],
    }));
  };

  const handleWithinCombinationArea = (sourceCategory, destinationCategory) => {
    if (sourceCategory !== destinationCategory) {
      enqueueSnackbar(
        `🚀 카테고리 간 이동은 불가능합니다! ${sourceCategory}에서 ${destinationCategory}로 이동할 수 없습니다.`
      );
      return;
    }
  };

  const handleCombinationChange = (newCombinations) => {
    console.log("새로운 조합:", newCombinations);
    console.log("조합 시도");
  };

  return { onDragEnd };
};
