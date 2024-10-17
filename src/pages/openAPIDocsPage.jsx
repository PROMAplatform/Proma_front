import PromaAPIDocs from "../components/OpenAPI/OpenAPIDocs/PromaAPIDocs";
import SquareButton from "../components/OpenAPI/components/SquareButton";
import { useNavigate } from "react-router-dom";
import styles from "./openAPIDocsPage.module.css";

function OpenAPIDocsPage() {
    const navigate = useNavigate();
    const handleMainClick = () => {
        navigate("/openapi");
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <p className={styles.header}>PROMA API Docs</p>
                <hr className={styles.line} />
                <p className={styles.headerContent}>
                    PROMA API에 대한 사용 안내를 제공합니다.
                </p>
            </div>
            <div className={styles.contentContainer}>
                <PromaAPIDocs />
                <div className={styles.buttonContainer}>
                    <SquareButton
                        title="메인으로"
                        variant="primary"
                        onClick={handleMainClick}
                    />
                </div>
            </div>
        </div>
    );
}
export default OpenAPIDocsPage;
