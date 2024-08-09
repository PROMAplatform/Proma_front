import React from "react";
import { useRecoilValue } from "recoil";
import { modalStackState } from "../../../recoil/community/communityRecoilState";
import ModalComponent from "./ModalComponent";

const ModalStack = () => {
    const modalStack = useRecoilValue(modalStackState);
    return modalStack.map((modal) => (
        <ModalComponent key={modal.key} modal={modal} />
    ));
};

export default ModalStack;
