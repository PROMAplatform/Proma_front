import React, { useState, useEffect } from "react";
import ModalContainer from "../../../../common/ModalContainer";
import { t } from "i18next";
import PromptEvaluationChart from "./components/PromptEvaluationChart";
import { usePromptHook } from "../../../../../api/prompt/prompt";
import styles from "./EvaluationModal.module.css";

function EvaluationModal({ isOpen, onClose, promptId }) {
    const { evaluatePrompt } = usePromptHook();
    const [isEvaluated, setIsEvaluated] = useState(false);

    useEffect(() => {
        if (isOpen) {
            evaluatePrompt(promptId);
            setIsEvaluated(true);
        }
    }, [isOpen, promptId, evaluatePrompt]);

    return (
        <ModalContainer
            isOpen={isOpen}
            onClose={() => {
                onClose();
                setIsEvaluated(false);
            }}
            title={t(`sideBar.evaluation`)}
        >
            {isEvaluated ? (
                <PromptEvaluationChart promptId={promptId} />
            ) : (
                <div className={styles.loadingContainer}>
                    {t(`sideBar.evaluating`)}
                </div>
            )}
        </ModalContainer>
    );
}

export default EvaluationModal;
