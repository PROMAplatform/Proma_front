import React from "react";
import { useRecoilValue } from "recoil";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";
import promaAnimation from "../../../../../../assets/animation/promaAnimation.json";

import styles from "./PromptEvaluationChart.module.css";
import {
    promptEvaluationErrorState,
    promptEvaluationLoadingState,
    promptEvaluationState,
} from "../../../../../../recoil/prompt/promptRecoilState";
import Lottie from "react-lottie";

const PromptEvaluationModal = () => {
    const evaluation = useRecoilValue(promptEvaluationState);
    const isLoading = useRecoilValue(promptEvaluationLoadingState);
    const error = useRecoilValue(promptEvaluationErrorState);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: promaAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const renderChart = () => {
        if (!evaluation) return null;
        const data = [
            { subject: "연결성", A: evaluation.promptEvaluation.Coherence },
            { subject: "일관성", A: evaluation.promptEvaluation.Consistency },
            {
                subject: "유창성",
                A: evaluation.promptEvaluation.Fluency * 1.6666,
            },
            { subject: "관련성", A: evaluation.promptEvaluation.Relevance },
        ];

        return (
            <div className={styles.chartContainer}>
                <ResponsiveContainer width="80%" height="80%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={0} domain={[0, 1]} />
                        <Radar
                            name="평가"
                            dataKey="A"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.8}
                        />
                    </RadarChart>
                </ResponsiveContainer>
                {/* {evaluation.promptEvaluation.Comment} */}
            </div>
        );
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.title}>프롬프트 평가</h2>
                {isLoading ? (
                    <div>
                        <Lottie
                            options={defaultOptions}
                            width={200}
                            height={200}
                            animationData={promaAnimation}
                        />
                        <p>
                            프롬프트 평가중입니다! 15초 내로 평가가 종료됩니다!
                        </p>
                    </div>
                ) : error ? (
                    <h2>{error}</h2>
                ) : evaluation ? (
                    <div className={styles.results}>
                        <h3>평가 결과:</h3>
                        {renderChart()}
                        <p>{evaluation.promptComment}</p>
                    </div>
                ) : (
                    <div>
                        <Lottie
                            options={defaultOptions}
                            width={200}
                            height={200}
                            animationData={promaAnimation}
                        />
                        <p>
                            프롬프트 평가중입니다! 15초 내로 평가가 종료됩니다!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PromptEvaluationModal;
