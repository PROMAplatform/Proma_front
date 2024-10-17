import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./APISpecification.module.css";
import requestExample from "../../../locales/openapiExample/requestExample.json";
import responseExample from "../../../locales/openapiExample/responseExample.json";
import { H4, B3 } from "../../../styles/font-styles";

const CodeBlock = ({ node, inline, className, children, ...props }) => {
    return (
        <pre className={styles.codeBlock}>
            <code {...props}>{children}</code>
        </pre>
    );
};

function APISpecification() {
    const [requestContent, setRequestContent] = useState("");
    const [responseContent, setResponseContent] = useState("");
    useEffect(() => {
        // JSON 객체를 텍스트 형식으로 변환하고 마크다운 코드 블록 형식으로 감싸기
        const requestFormattedJson = `\`\`\`json\n${JSON.stringify(requestExample, null, 2)}\n\`\`\``;
        setRequestContent(requestFormattedJson);
        const responseFormattedJson = `\`\`\`json\n${JSON.stringify(responseExample, null, 2)}\n\`\`\``;
        setResponseContent(responseFormattedJson);
    }, []);

    return (
        <div className={styles.container}>
            <H4>PROMA API 명세서</H4>
            <table className={styles.tableContainer}>
                <tr className={styles.headContainer}>
                    <th>요청 URL</th>
                    <th>매서드</th>
                    <th>응답 형식</th>
                    <th>설명</th>
                </tr>
                <tr className={styles.dataContainer}>
                    <td>https://proma-ai.store/api/question</td>
                    <td>POST</td>
                    <td>JSON</td>
                    <td>PROMA API를 적용하여 채팅</td>
                </tr>
            </table>
            <div className={styles.exampleContainer}>
                <div className={styles.requestContent}>
                    <table className={styles.tableContainer}>
                        <tr className={styles.headContainer}>
                            <th>요청 변수명</th>
                            <th>타입</th>
                            <th>필수 여부</th>
                            <th>설명</th>
                        </tr>
                        <tr className={styles.dataContainer}>
                            <td>userLoginId</td>
                            <td>string</td>
                            <td>secretKey</td>
                            <td>messageQuestion</td>
                        </tr>
                        <tr className={styles.dataContainer}>
                            <td>apiToken</td>
                            <td>string</td>
                            <td>secretKey</td>
                            <td>messageQuestion</td>
                        </tr>
                        <tr className={styles.dataContainer}>
                            <td>secretKey</td>
                            <td>string</td>
                            <td>secretKey</td>
                            <td>messageQuestion</td>
                        </tr>
                        <tr className={styles.dataContainer}>
                            <td>messageQuestion</td>
                            <td>string</td>
                            <td>secretKey</td>
                            <td>messageQuestion</td>
                        </tr>
                    </table>
                </div>
                <div className={styles.responseContainer}>
                    <B3>Response Sample</B3>
                    <div className={styles.response}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code: CodeBlock,
                            }}
                        >
                            {responseContent}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default APISpecification;
