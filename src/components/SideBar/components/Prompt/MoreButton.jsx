import React, { useEffect, useState, useRef } from "react";
import CustomIconButton from "../../../common/CustomIconButton";
import { ReactComponent as MoreIcon } from "../../../../assets/images/moreIcon.svg";
import editIcon from "../../../../assets/images/editIcon.svg";
import trashIcon from "../../../../assets/images/trashIcon.svg";
import shareIcon from "../../../../assets/images/shareIcon.svg";
import evaluateIcon from "../../../../assets/images/evaluateIcon.svg";
import EditPromptInfoModal from "./Modal/EditPromptInfoModal";
import DeletePromptModal from "./Modal/DeletePromptModal";
import SharePromptModal from "./Modal/SharePromptModal";
import styles from "./MoreButton.module.css";
import { B6 } from "../../../../styles/font-styles";
import { t } from "i18next";
import EvaluationModal from "./Modal/EvaluationModal";

const MoreButton = ({ promptId }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);
    const menuRef = useRef(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);

    const handleClickOutside = (event) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
        ) {
            setShowMenu(false); // 메뉴 외부를 클릭하면 메뉴를 닫음
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (showMenu && buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            setMenuPosition({
                top: (buttonRect.bottom + buttonRect.top) / 2,
                left: buttonRect.right,
            });
        }
    }, [showMenu]);

    const handleButtonClick = () => {
        setShowMenu((prevShowMenu) => !prevShowMenu);
    };

    const handleEditClick = () => {
        setIsEditModalOpen(true);
        setShowMenu(false);
    };

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
        setShowMenu(false);
    };

    const handleShareClick = () => {
        setIsShareModalOpen(true);
        setShowMenu(false);
    };

    const handleEvaluation = () => {
        setIsEvaluationModalOpen(true);
        setShowMenu(false);
    };

    function MenuComponent({ icon, title, onClick }) {
        return (
            <div className={styles.menuButtonContainer} onClick={onClick}>
                <div className={styles.menu}>
                    <img className={styles.icon} src={icon} alt="icon" />
                    <B6 color="gray6">{title}</B6>
                </div>
            </div>
        );
    }

    function MenuContainer() {
        return (
            <div
                ref={menuRef}
                style={{ top: menuPosition.top, left: menuPosition.left }}
                className={styles.menuContainer}
            >
                <MenuComponent
                    icon={editIcon}
                    title={t(`sideBar.patch`)}
                    onClick={handleEditClick}
                />
                <MenuComponent
                    icon={trashIcon}
                    title={t(`sideBar.delete`)}
                    onClick={handleDeleteClick}
                />
                <MenuComponent
                    icon={shareIcon}
                    title={t(`sideBar.share`)}
                    onClick={handleShareClick}
                />
                <MenuComponent
                    icon={evaluateIcon}
                    title={t(`sideBar.evaluation`)}
                    onClick={handleEvaluation}
                />
            </div>
        );
    }

    return (
        <div className={styles.iconContainer} ref={buttonRef}>
            <CustomIconButton icon={MoreIcon} onClick={handleButtonClick} />
            {showMenu && <MenuContainer />}
            {prompt && (
                <SharePromptModal
                    isOpen={isShareModalOpen}
                    onClose={() => setIsShareModalOpen(false)}
                    promptId={promptId}
                />
            )}
            {prompt && (
                <DeletePromptModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    promptId={promptId}
                />
            )}
            {prompt && (
                <EditPromptInfoModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    promptId={promptId}
                />
            )}
            {prompt && (
                <EvaluationModal
                    isOpen={isEvaluationModalOpen}
                    onClose={() => setIsEvaluationModalOpen(false)}
                    promptId={promptId}
                />
            )}
        </div>
    );
};

export default MoreButton;
