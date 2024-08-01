import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styles from "./promptMakingPage.module.css";

import CombinationArea from "../components/PromptMaking/CombinationArea/CombinationArea";
import { SnackbarProvider } from "notistack";
import PromptMakingSidebar from "../components/PromptMaking/PromptMakingSideBar/PromptMakingSideBar";
import { usePromptMaking } from "../hooks/promptHook/usePromptMaking";

const PromptMakingPage = () => {
  const { onDragEnd } = usePromptMaking();

  return (
    <SnackbarProvider maxSnack={3}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.app}>
          <PromptMakingSidebar />
          <div className={styles.areaContainer}>
            <CombinationArea />
          </div>
        </div>
      </DragDropContext>
    </SnackbarProvider>
  );
};

export default PromptMakingPage;
