import React from "react";
import { useLocation } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import styles from "./promptMakingPage.module.css";
import CombinationArea from "../components/PromptMaking/CombinationArea/CombinationArea";
import { SnackbarProvider } from "notistack";
import PromptMakingSidebar from "../components/PromptMaking/PromptMakingSideBar/PromptMakingSideBar";
import { usePromptMaking } from "../hooks/promptHook/usePromptMaking";
import PromptMakingTour from "./PromptMakingTour";
import useScreenSize from "../hooks/common/useScreenSize";
import MobileMessage from "../components/common/MobileMessage";

const PromptMakingPage = () => {
    const location = useLocation();
    const promptId = location.state?.promptId;
    const { onDragEnd } = usePromptMaking();
    const isDesktop = useScreenSize(); // 커스텀 훅 사용

    if (!isDesktop) {
        return <MobileMessage />;
    }

    return (
        <SnackbarProvider maxSnack={3}>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.app}>
                    <PromptMakingTour />
                    <PromptMakingSidebar />
                    <div className={styles.areaContainer}>
                        <CombinationArea promptId={promptId} />
                    </div>
                </div>
            </DragDropContext>
        </SnackbarProvider>
    );
};

export default PromptMakingPage;
