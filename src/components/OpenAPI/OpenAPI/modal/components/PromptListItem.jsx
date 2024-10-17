import blockIcon from "../../../../../assets/images/blockIcon.svg";
import styles from "./PromptListItem.module.css";
import { B4 } from "../../../../../styles/font-styles";
function PromptListItem({ title, isSelected, onClick }) {
    return (
        <div
            className={`${styles.container} ${isSelected ? styles.selectedContainer : ""}`}
            onClick={onClick}
        >
            <img src={blockIcon} alt="block" />
            <B4>{title}</B4>
        </div>
    );
}

export default PromptListItem;
