import React from "react";
import { useNavigate } from "react-router-dom";
import { H1 } from "../../../styles/font-styles";
import styles from "./ChattingMain.module.css";
import PromptCreateButton from "./Prompt/PromptCreateButton";
import characterIcon from "../../../assets/images/characterIcon.svg";
import taskIcon from "../../../assets/images/taskIcon.svg";
import freeIcon from "../../../assets/images/freeIcon.svg";
import { activeTypeState, useResetCategoriesOnTypeChange } from "../../../recoil/prompt/promptRecoilState";
import { useRecoilState } from "recoil";

function ChattingMain() {
    const navigate = useNavigate();
    const [activeType, setActiveType] = useRecoilState(activeTypeState);
    const resetCategories = useResetCategoriesOnTypeChange();

    const handlePromptCreateClick = (type) => {
        setActiveType(type);
        resetCategories();
        navigate(`/promptMaking/`);
    };

    return (
        <div className={styles.container}>
            <H1 color="purpleGradient">나만의 프롬프트 만들기</H1>
            <div className={styles.typeContainer}>
                <PromptCreateButton 
                    type="Character" 
                    icon={characterIcon} 
                    onClick={() => handlePromptCreateClick('character')} 
                />
                <PromptCreateButton 
                    type="Task/Research" 
                    icon={taskIcon} 
                    onClick={() => handlePromptCreateClick('task')} 
                />
                <PromptCreateButton 
                    type="Free" 
                    icon={freeIcon} 
                    onClick={() => handlePromptCreateClick('Free')} 
                />
            </div>
        </div>
    );
}
export default ChattingMain;