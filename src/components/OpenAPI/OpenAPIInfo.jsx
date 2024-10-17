import styles from "./OpenAPIInfo.module.css";
import { H5 } from "../../styles/font-styles";
import CopyButton from "./CopyButton";
function OpenAPIInfo({ accessToken, secretKey }) {
    return (
        <div className={styles.container}>
            <H5>PROMA API 키</H5>
            <table>
                <tr>
                    <th>apiToken</th>
                    <td className={styles.dataContainer}>{accessToken}</td>
                    <td className={styles.copyButtonContainer}>
                        <CopyButton category="apiToken" text={accessToken} />
                    </td>
                </tr>
                <tr>
                    <th>secretKey</th>
                    <td className={styles.dataContainer}>{secretKey}</td>
                    <td className={styles.copyButtonContainer}>
                        <CopyButton category="secretKey" text={secretKey} />
                    </td>
                </tr>
            </table>
        </div>
    );
}
export default OpenAPIInfo;
