import styles from "./OpenAPIDocs.module.css";
import { B4 } from "../../../styles/font-styles";
import openapiStepBig1 from "../../../assets/images/openapiStep/openapiStepBig1.svg";
import openapiStepBig2 from "../../../assets/images/openapiStep/openapiStepBig2.svg";
import openapiStepBig3 from "../../../assets/images/openapiStep/openapiStepBig3.svg";
import openapiStepBig4 from "../../../assets/images/openapiStep/openapiStepBig4.svg";
import openapiStepBig5 from "../../../assets/images/openapiStep/openapiStepBig5.svg";
import openapiStepBig6 from "../../../assets/images/openapiStep/openapiStepBig6.svg";

const StepContent = ({ step, content }) => {
    return (
        <div className={styles.content}>
            <div className={styles.circle}>
                <B4 color="white">{step}</B4>
            </div>
            <div className={styles.contentText}>
                <B4>{content}</B4>
            </div>
        </div>
    );
};

function OpenAPIDocs() {
    const contents = [
        "PROMA의 OpenAPI 소개 페이지로 접속합니다.",
        "하단의 PROMA API 발급 버튼을 클릭하면 API 발급 가능한 프롬프트 목록을 확인할 수 있습니다.",
        "해당 목록 중, 원하는 프롬프트를 선택합니다",
        "발급하기 버튼을 눌러 PROMA API Key를 발급합니다.",
        "자사의 서비스 코드에 PROMA API를 적용하여 사용할 수 있습니다.",
        "PROMA의 채팅방에서 PROMA API 사용 로그를 확인할 수 있습니다.",
    ];
    return (
        <div className={styles.container}>
            <div className={styles.stepContainer}>
                <img
                    src={openapiStepBig1}
                    alt="step1"
                    className={styles.stepImage}
                />
                <img
                    src={openapiStepBig2}
                    alt="step2"
                    className={styles.stepImage}
                />
                <img
                    src={openapiStepBig3}
                    alt="step3"
                    className={styles.stepImage}
                />
                <img
                    src={openapiStepBig4}
                    alt="step4"
                    className={styles.stepImage}
                />
                <img
                    src={openapiStepBig5}
                    alt="step5"
                    className={styles.stepImage}
                />
                <img
                    src={openapiStepBig6}
                    alt="step6"
                    className={styles.stepImage}
                />
            </div>
            <div className={styles.contentContainer}>
                {contents.map((content, index) => (
                    <StepContent content={content} step={index + 1} />
                ))}
            </div>
        </div>
    );
}

export default OpenAPIDocs;
