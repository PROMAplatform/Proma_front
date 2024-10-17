import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, ChevronDown } from "lucide-react";
import styles from "./ExpandableButton.module.css";

function AboutExpandableButton({ buttonText }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { t } = useTranslation();

    const handleMouseEnter = useCallback(() => {
        setIsExpanded(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsExpanded(false);
    }, []);

    return (
        <div
            className={styles.container}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className={styles.button}
                aria-haspopup="true"
                aria-expanded={isExpanded}
            >
                <Home size={18} />
                {buttonText}
                <ChevronDown
                    size={18}
                    className={isExpanded ? styles.rotated : ""}
                />
            </button>
            {isExpanded && (
                <div className={styles.expandableSection} role="menu">
                    <Link to="/" className={styles.menuItem}>
                        {t("openapi.proma")}
                    </Link>
                    <Link to="/openapi" className={styles.menuItem}>
                        {t("openapi.promaApi")}
                    </Link>
                </div>
            )}
        </div>
    );
}

export default React.memo(AboutExpandableButton);
