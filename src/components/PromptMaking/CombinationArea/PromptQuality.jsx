import React from "react";
import { ReactComponent as Quality1 } from "../../../assets/images/promptQulity/quality1.svg";
import { ReactComponent as Quality2 } from "../../../assets/images/promptQulity/quality2.svg";
import { ReactComponent as Quality3 } from "../../../assets/images/promptQulity/quality3.svg";
import { ReactComponent as Quality4 } from "../../../assets/images/promptQulity/quality4.svg";
import { ReactComponent as Quality5 } from "../../../assets/images/promptQulity/quality5.svg";
import { ReactComponent as Quality6 } from "../../../assets/images/promptQulity/quality6.svg";
import { ReactComponent as Quality7 } from "../../../assets/images/promptQulity/quality7.svg";
import { ReactComponent as Quality8 } from "../../../assets/images/promptQulity/quality8.svg";
import styles from "./PromptQuality.module.css";
import { H6 } from "../../../styles/font-styles";
import { t } from "i18next";

const qualityComponents = {
    1: Quality1,
    2: Quality2,
    3: Quality3,
    4: Quality4,
    5: Quality5,
    6: Quality6,
    7: Quality7,
    8: Quality8,
};

const PromptQuality = ({ quality, total }) => {
    let QualityComponent = null;
    let comment = "";
  
    // quality 값에 따라 동적으로 컴포넌트 선택 (qualityComponents 객체에서)
    const componentIndex = Math.ceil((quality / total) * Object.keys(qualityComponents).length);
    QualityComponent = qualityComponents[componentIndex] || qualityComponents[Object.keys(qualityComponents).length]; // 범위 벗어나면 마지막 컴포넌트 사용
  
    // quality가 0이면 Quality1 컴포넌트 사용
    if (quality === 0) {
        QualityComponent = Quality1; 
    }

    const completionPercentage = calculateCompletionPercentage(quality, total);

    switch (quality) {
        case 0:
            comment = "프롬프트가 아직 없어요! 드래그 앤 드랍을 통해 프롬프트를 만들어보아요!";
            break;
        case total: 
            comment = "100% !! 완벽한 프롬프트가 완성되었어요!";
            break;
        default:
            comment = `${completionPercentage}% 점점 좋은 프롬프트가 완성되고 있어요!`;
    }
  
    return (
        <div>
            <div className={styles.qualityContainer}>
                {QualityComponent && <QualityComponent className={styles.qualityComponent} />}
                <H6>{t(`comment`)}</H6>
            </div>
        </div>
    );
};

function calculateCompletionPercentage(quality, total) {
    switch (total) {
        case 1:
            return [0, 100][quality] || 0;
        case 4:
            return [0, 24, 48, 72, 100][quality] || 0; 
        case 6:
            return [0, 17, 33, 50, 67, 83, 100][quality] || 0; 
        case 7:
            return [0, 14, 29, 43, 57, 71, 86, 100][quality] || 0; 
        default:
            return 0;
    }
}
  

export default PromptQuality;