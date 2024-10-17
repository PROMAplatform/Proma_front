import styles from "./PromaAPIInfo.module.css";
import { B1 } from "../../../styles/font-styles";
import CopyButton from "./components/CopyButton";
function PromaAPIInfo({ accessToken, secretKey }) {
    return (
        <div className={styles.container}>
            <B1>PROMA API 키</B1>
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
export default PromaAPIInfo;
