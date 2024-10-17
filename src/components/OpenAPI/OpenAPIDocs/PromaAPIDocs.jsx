import APISpecification from "./components/APISpecification";
import UseGuide from "./components/UseGuide";
import styles from "./PromaAPIDocs.module.css";

function PromaAPIDoce() {
    return (
        <div className={styles.container}>
            <APISpecification />
            <UseGuide />
        </div>
    );
}

export default PromaAPIDoce;
