import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./PromptMakingSidebar.module.css";
import { H4, B5 } from "../../../styles/font-styles";
import PromptValueBlock from "../../common/Prompt/PromptValueBlock";
import {
    activeBlocksState,
    activeCategoryState,
    availableCategoriesState,
    categoryColorsState,
    blockDetailsState,
    categoryBlockShapesState,
} from "../../../recoil/prompt/promptRecoilState";
import logo from "../../../assets/logos/promaLogoSmall.svg";
import CreateBlockModal from "./CreateBlockModal";
import { usePromptHook } from "../../../api/prompt/prompt";
import { getLocalPromptMethod } from "../../../util/localStorage";
import { t } from "i18next";

const PromptMakingSidebar = () => {
    const [activeCategory, setActiveCategory] =
        useRecoilState(activeCategoryState);
    const activeBlocks = useRecoilValue(activeBlocksState);
    const categories = useRecoilValue(availableCategoriesState);
    const categoryColors = useRecoilValue(categoryColorsState);
    const categoryBlockShapes = useRecoilValue(categoryBlockShapesState);
    const blockDetails = useRecoilValue(blockDetailsState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const localPromptMethod = getLocalPromptMethod();
    const { fetchBlocks } = usePromptHook();

    const getActiveColor = () => {
        return categoryColors[activeCategory] || "purple";
    };

    const handleBlockCreated = () => {
        fetchBlocks(localPromptMethod);
    };

    useEffect(() => {
        handleBlockCreated();
        console.log("blocks 불러오기");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.container}>
            <img
                alt="sideBar 헤더 로고"
                src={logo}
                className={styles.promaLogo}
            />
            <div className={styles.promptTitle}>
                <H4>PROMA prompt</H4>
            </div>
            <div className={styles.sidebar}>
                <div className={styles.categories} data-tour="categories">
                    {categories.map((category) => (
                        <div
                            key={category}
                            className={`${styles.category} ${
                                activeCategory === category ? styles.active : ""
                            }`}
                            onClick={() => setActiveCategory(category)}
                            style={{
                                "--category-color": categoryColors[category],
                                "--category-active-color": `${categoryColors[category]}33`,
                            }}
                        >
                            <B5 color="white">{category}</B5>
                        </div>
                    ))}
                </div>
                <div
                    className={`${styles.blocksContainer} ${styles.tourTarget}`}
                    style={{ "--active-color": getActiveColor() }}
                >
                    <Droppable droppableId="sidebar">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={styles.blocks}
                                data-tour="blocks"
                            >
                                {activeBlocks[activeCategory]?.map(
                                    (blockId, index) => {
                                        const block = blockDetails[blockId];
                                        return (
                                            <Draggable
                                                key={blockId}
                                                draggableId={`${blockId}|${activeCategory}`}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={styles.block}
                                                    >
                                                        <PromptValueBlock
                                                            color={
                                                                categoryColors[
                                                                    activeCategory
                                                                ]
                                                            }
                                                            value={
                                                                block.blockValue
                                                            }
                                                            variant={
                                                                categoryBlockShapes[
                                                                    activeCategory
                                                                ]
                                                            }
                                                            size="medium"
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    },
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <button
                        className={styles.addButton}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <B5 color="blockMainColor">
                            {t(`promptMaking.blockMake`)}
                        </B5>
                    </button>
                </div>
                <CreateBlockModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    categories={categories}
                    onBlockCreated={handleBlockCreated}
                />
            </div>
        </div>
    );
};

export default PromptMakingSidebar;
