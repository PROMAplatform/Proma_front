import styles from "./APISpecification.module.css";
import { B1, B3 } from "../../../../styles/font-styles";

function APISpecification() {
    return (
        <div className={styles.container}>
            <B1>PROMA API 명세서</B1>
            <div className={styles.contentContainer}>
                <B3>API 기본 정보</B3>
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
            </div>
            <div className={styles.contentContainer}>
                <B3>요청 변수</B3>
                <div>
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
                            <td>Y</td>
                            <td>사용 로그 구분을 위한 값</td>
                        </tr>
                        <tr className={styles.dataContainer}>
                            <td>apiToken</td>
                            <td>string</td>
                            <td>Y</td>
                            <td>발급받은 api token 값</td>
                        </tr>
                        <tr className={styles.dataContainer}>
                            <td>secretKey</td>
                            <td>string</td>
                            <td>Y</td>
                            <td>발급받은 secret key 값</td>
                        </tr>
                        <tr className={styles.dataContainer}>
                            <td>messageQuestion</td>
                            <td>string</td>
                            <td>Y</td>
                            <td>질문 내용</td>
                        </tr>
                    </table>
                    <p className={styles.annotation}>
                        *userLoginId를 통해 사용자들의 채팅 히스토리가 구분
                        됩니다.
                    </p>
                </div>
            </div>
            <div className={styles.contentContainer}>
                <B3>출력 결과</B3>
                <table className={styles.tableContainer}>
                    <tr className={styles.headContainer}>
                        <th>필드</th>
                        <th>타입</th>
                        <th>설명</th>
                    </tr>
                    <tr className={styles.dataContainer}>
                        <td>responseDto</td>
                        <td>object</td>
                        <td>응답 데이터 객체</td>
                    </tr>
                    <tr className={styles.dataContainer}>
                        <td>messageAnswer</td>
                        <td>string</td>
                        <td>응답 데이터에 포함된 메시지 내용</td>
                    </tr>
                    <tr className={styles.dataContainer}>
                        <td>error</td>
                        <td>object | null</td>
                        <td>오류 정보 객체</td>
                    </tr>
                    <tr className={styles.dataContainer}>
                        <td>success</td>
                        <td>boolean</td>
                        <td>요청 성공 여부</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default APISpecification;
