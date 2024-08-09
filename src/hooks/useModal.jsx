import { useEffect, useCallback, useState } from "react";

function useModal(isOpen, onClose) {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);

    const handleOverlayClick = useCallback(
        (e) => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        },
        [onClose],
    );

    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    return { isModalOpen, setIsModalOpen, handleOverlayClick };
}

export default useModal;
