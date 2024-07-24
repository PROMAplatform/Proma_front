import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styles from "./promptMakingPage.module.css";

import CombinationArea from "../components/PromptMaking/CombinationArea";
import { SnackbarProvider } from "notistack";
import PromptMakingSidebar from "../components/PromptMaking/PromptMakingSideBar";
import FinalPromptArea from "../components/PromptMaking/FinalPromptArea";
import { usePromptMaking } from "../hooks/promptHook/usePromptMaking";

const PromptMakingPage = () => {
  const { onDragEnd } = usePromptMaking();

  return (
    <SnackbarProvider maxSnack={3}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.app}>
          <PromptMakingSidebar />
          <CombinationArea />
          <FinalPromptArea />
        </div>
      </DragDropContext>
    </SnackbarProvider>
  );
};

export default PromptMakingPage;
