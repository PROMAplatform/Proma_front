import { useResetRecoilState, useSetRecoilState} from "recoil";
import {modalStackState} from "../recoil/community/communityRecoilState";

export const useModalStack = () => {
    const setModalStack = useSetRecoilState(modalStackState);

    const push = (modalComponent) => {
        setModalStack((modalStack) => [...modalStack, modalComponent]);
    }

    const remove = (key) => {
        setModalStack((modalStack) => modalStack.filter((modalComponent) => modalComponent.key !== key));
    }

    const pop = () => {
        setModalStack((modalStack) => modalStack.slice(0, -1));
    }

    const clear = useResetRecoilState(modalStackState)

    const update = (key, componentProps) => {
        setModalStack((modalStack) =>
            modalStack.map((modal) => {
                if (modal.key === key) {
                    return { ...modal, componentProps: { ...modal.componentProps, ...componentProps } };
                }
                return modal;
            })
        );
    };

    return { push, pop, remove, clear, update };
}