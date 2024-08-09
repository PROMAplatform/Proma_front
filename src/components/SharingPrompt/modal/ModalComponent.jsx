import React from "react";
import { useModalStack } from "../../../hooks/useModalStack";
import ModalBackdrop from "./ModalBackDrop";

const ModalComponent = ({ modal }) => {
    const {
        key,
        Component,
        componentProps,
        disableBackdropClick,
        backdropTransparent,
    } = modal;
    const { remove } = useModalStack();
    const close = () => remove(key);
    return (
        <ModalBackdrop
            close={close}
            disableBackdropClick={disableBackdropClick}
            backdropTransparent={backdropTransparent}
        >
            <Component close={close} {...componentProps} />
        </ModalBackdrop>
    );
};

export default ModalComponent;
