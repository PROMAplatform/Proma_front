import React, { useEffect, useState } from "react";
import { useOpenAPIHook } from "../../../api/business/openAPI";
import { openapiListState } from "../../../recoil/openapi/openapiState";
import CopyButton from "../CopyButton";
import { useRecoilValue } from "recoil";
import { H4 } from "../../../styles/font-styles";
import PromptDetailModal from "../PromptDetailModal";
import styles from "./PromaAPIList.module.css";
function PromaAPIList() {
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedPromptId, setSelectedPromptId] = useState(null);
    const { fetchOpenAPIList, makeOpenAPI } = useOpenAPIHook();
    const openapiList = useRecoilValue(openapiListState);

    useEffect(() => {
        const fetchDate = async () => {
            await fetchOpenAPIList();
        };
        fetchDate();
    }, [openapiList]);

    const handleTitleClick = (id) => {
        setSelectedPromptId(id);
        setIsDetailModalOpen(true);
    };

    const reissueOpenAPI = (prompt) => {
        const fetchData = async () => {
            await makeOpenAPI(prompt.promptId);
        };
        fetchData();
        alert(`[${prompt.promptTitle}] API가 재발행되었습니다! `);
    };

    return (
        <div className={styles.container}>
            <H4>PROMA API 목록 관리</H4>
            <table>
                <colgroup>
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "50%" }} />
                    <col style={{ width: "auto" }} />
                    <col style={{ width: "auto" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>프롬프트 이름</th>
                        <th colSpan="2">키 정보</th>
                        <th>재발급</th>
                    </tr>
                </thead>
                <tbody>
                    {openapiList.map((prompt, index) => (
                        <React.Fragment key={prompt.promptId}>
                            <tr key={index}>
                                <td
                                    className={styles.titleContainer}
                                    rowSpan="3"
                                    onClick={() =>
                                        handleTitleClick(prompt.promptId)
                                    }
                                >
                                    {prompt.promptTitle}
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.categoryContainer}>
                                    apiToken : {prompt.apiToken}
                                </td>
                                <td className={styles.copyContainer}>
                                    <CopyButton
                                        category="apiToken"
                                        text={prompt.apiToken}
                                    />
                                </td>
                                <td
                                    rowSpan="2"
                                    className={styles.reissueContainer}
                                >
                                    <button
                                        onClick={() => reissueOpenAPI(prompt)}
                                        className={styles.reissueButton}
                                    >
                                        재발급
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.categoryContainer}>
                                    secretKey : {prompt.secretKey}
                                </td>
                                <td className={styles.copyContainer}>
                                    <CopyButton
                                        category="secretKey"
                                        text={prompt.secretKey}
                                    />
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <PromptDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                promptId={selectedPromptId}
            />
        </div>
    );
}
export default PromaAPIList;
