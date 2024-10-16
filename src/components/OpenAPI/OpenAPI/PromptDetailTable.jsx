import { B1 } from "../../../styles/font-styles";
import styles from "./PromptDetailTable.module.css";

function PromptDetailTable({ prompt }) {
    return (
        <div className={styles.container}>
            <B1>프롬프트 정보</B1>
            <table className={styles.tableContainer}>
                <tr>
                    <th>프롬프트 이름</th>
                    <td>{prompt.promptTitle}</td>
                </tr>
                <tr>
                    <th>프롬프트 설명</th>
                    <td>{prompt.promptDescription}</td>
                </tr>
                <tr>
                    <th>프롬프트 미리보기</th>
                    <td>{prompt.promptPreview}</td>
                </tr>
            </table>
        </div>
    );
}
export default PromptDetailTable;
