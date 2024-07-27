import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { enqueueSnackbar } from "notistack";
import {
  activeBlocksState,
  combinationsState,
  blockDetailsState,
} from "../../recoil/prompt/promptRecoilState";

export const usePromptMaking = () => {
  const [combinations, setCombinations] = useRecoilState(combinationsState);
  const setActiveBlocks = useSetRecoilState(activeBlocksState);
  const blockDetails = useRecoilValue(blockDetailsState);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const [blockId, blockCategory] = draggableId.split("|");
    const numericBlockId = parseInt(blockId);

    if (!blockDetails[numericBlockId]) {
      console.error("Block not found:", numericBlockId);
      return;
    }

    if (source.droppableId === "sidebar" && destination.droppableId !== "sidebar") {
      handleSidebarToCombinationArea(destination.droppableId, numericBlockId, blockCategory);
    } else if (source.droppableId !== "sidebar" && destination.droppableId === "sidebar") {
      handleCombinationAreaToSidebar(source.droppableId, numericBlockId);
    } else if (source.droppableId !== "sidebar" && destination.droppableId !== "sidebar") {
      handleWithinCombinationArea(source.droppableId, destination.droppableId, numericBlockId);
    }
  };

  const handleSidebarToCombinationArea = (category, blockId, blockCategory) => {
    if (category !== blockCategory) {
      enqueueSnackbar(
        `🚀 카테고리가 일치하지 않습니다! ${blockCategory} 블럭에 넣어주세요!`
      );
      return;
    }

    setCombinations((prev) => ({
      ...prev,
      [category]: blockId,
    }));

    setActiveBlocks((prev) => ({
      ...prev,
      [category]: prev[category].filter((id) => id !== blockId),
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

  const handleWithinCombinationArea = (
    sourceCategory,
    destinationCategory,
    blockId
  ) => {
    if (sourceCategory !== destinationCategory) {
      enqueueSnackbar(
        `🚀 카테고리 간 이동은 불가능합니다! ${sourceCategory}에서 ${destinationCategory}로 이동할 수 없습니다.`
      );
      return;
    }

    // 같은 카테고리 내에서의 이동이므로 아무 작업도 필요하지 않습니다.
    // 하지만 필요하다면 여기에 추가 로직을 구현할 수 있습니다.
  };

  const handleCombinationChange = (newCombinations) => {
    console.log("새로운 조합:", newCombinations);
    console.log("조합 시도");
    // 여기에 조합 변경에 따른 추가 로직을 구현할 수 있습니다.
  };

  return { onDragEnd };
};
