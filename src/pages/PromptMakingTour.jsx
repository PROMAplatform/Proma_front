import React, { useState, useEffect } from "react";
import Joyride, { STATUS } from "react-joyride";
import { getIsFirstVisited } from "../util/localStorage";

const PromptMakingTour = () => {
    const [runTour, setRunTour] = useState(true);
    const [steps, setSteps] = useState([]);

    useEffect(() => {
        const tourSteps = [
            {
                target: '[data-tour="categories"]',
                content:
                    "사이드바에서 카테고리를 선택하여 사용 가능한 블록을 확인하세요.",
                disableBeacon: true,
            },
            {
                target: '[data-tour="blocks"]',
                content: "여기서 블록을 오른쪽의 조합 영역으로 드래그하세요.",
            },
            {
                target: '[data-tour="combinationArea"]',
                content:
                    "드래그한 블록을 조합 영역의 일치하는 카테고리에 놓으세요.",
            },
            {
                target: '[data-tour="promptPreview"]',
                content:
                    "블록 배치가 되는 순간, 어떤 식으로 프롬프트가 작성되는지 확인해보세요!",
            },
            {
                target: '[data-tour="saveButton"]',
                content:
                    "블록 배치가 완료되면 여기를 클릭하여 프롬프트를 저장하세요.",
            },
        ];

        setSteps(tourSteps);
    }, []);

    const handleJoyrideCallback = (data) => {
        const { status } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setRunTour(false);
        }
    };
    
    if (!getIsFirstVisited) return null;

    return (
        <Joyride
            steps={steps}
            run={runTour}
            continuous
            showSkipButton
            showProgress
            styles={{
                options: {
                    arrowColor: 'var(--color-gray1)',
                    backgroundColor: 'var(--color-gray1)',
                    overlayColor: 'rgba(0, 0, 0, 0.5)',
                    primaryColor: 'var(--block-main-color)',
                    textColor: 'var(--color-gray9)',
                    width: 300,
                    zIndex: 1000
                },
                beacon: {
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                },
                tooltip: { 
                    padding: 20,
                    borderRadius: 10,
                },
                buttonNext: {
                    backgroundColor: 'var(--block-main-color)',
                    borderRadius: 30,
                    padding: '8px 12px',
                },
                buttonSkip: {
                    backgroundColor: "transparent",
                    color: "var(--color-gray5)",
                    border: "none",
                },
            }}
            callback={handleJoyrideCallback}
        />
    );
};

export default PromptMakingTour;
