import { useRecoilState, useRecoilValue } from "recoil";
import { enqueueSnackbar } from "notistack";
import {
    activeBlocksState,
    combinationsState,
    blockDetailsState,
} from "../../recoil/prompt/promptRecoilState";
import { useEffect } from "react";
import { t } from "i18next";

export const usePromptMaking = () => {
    const [combinations, setCombinations] = useRecoilState(combinationsState);
    const [activeBlocks, setActiveBlocks] = useRecoilState(activeBlocksState);
    const blockDetails = useRecoilValue(blockDetailsState);

    useEffect(() => {
        const newActiveBlocks = { ...activeBlocks };
        for (const category in newActiveBlocks) {
            newActiveBlocks[category] = newActiveBlocks[category]?.filter(
                (blockId) => combinations[category] !== blockId,
            );
        }
        setActiveBlocks(newActiveBlocks);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [combinations]);

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

        if (
            source.droppableId === "sidebar" &&
            destination.droppableId !== "sidebar"
        ) {
            handleSidebarToCombinationArea(
                destination.droppableId,
                numericBlockId,
                blockCategory,
            );
        } else if (
            source.droppableId !== "sidebar" &&
            destination.droppableId === "sidebar"
        ) {
            handleCombinationAreaToSidebar(source.droppableId, numericBlockId);
        } else if (
            source.droppableId !== "sidebar" &&
            destination.droppableId !== "sidebar"
        ) {
            handleWithinCombinationArea(
                source.droppableId,
                destination.droppableId,
                numericBlockId,
            );
        }
    };

    const handleSidebarToCombinationArea = (
        category,
        blockId,
        blockCategory,
    ) => {
        if (category !== blockCategory) {
            enqueueSnackbar(
                `${t(`promptMaking.userPromptError`)} ${blockCategory} ${t(`promptMaking.userPromptError2`)}`,
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
        blockId,
    ) => {
        if (sourceCategory !== destinationCategory) {
            enqueueSnackbar(
                `${t(`promptMaking.userPromptError3`)} ${sourceCategory}${t(`promptMaking.userPromptError4`)} ${destinationCategory}`,
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
