import styles from "./UseGuide.module.css";
import OpenAPIDocs from "./OpenAPIDocs/OpenAPIDocs";
import { H4 } from "../../styles/font-styles";

function UseGuide() {
    return (
        <div className={styles.container}>
            <H4>PROMA API 사용 가이드</H4>
            <OpenAPIDocs />
        </div>
    );
}
export default UseGuide;
