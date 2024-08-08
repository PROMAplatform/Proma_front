import React, {useEffect} from 'react';
import {useRecoilValue} from "recoil";
import {modalStackState} from "../../../recoil/community/communityRecoilState";

const ModalBackdrop = ({ close, disableBackdropClick, backdropTransparent, children }) => {
    const modalStack = useRecoilValue(modalStackState);

    useEffect(() => {
        // 모달이 열릴 때 body 스크롤 막기
        document.body.style.overflow = modalStack.length > 0 ? 'hidden' : '';

        return () => {
            // useEffect clean-up function: 모달이 닫힐 때 또는 modalStack이 빈 배열일 때 body 스크롤 복원
            document.body.style.overflow = '';
        };
    }, [modalStack]);

    const handleClick = (e) => {
        if (!disableBackdropClick && e.target === e.currentTarget) {
            close();
        }
    };

    return (
        <div
            className="modal-backdrop"
            onClick={handleClick}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: backdropTransparent ? 'transparent' : 'rgba(0, 0, 0, 0.5)',
                zIndex: 999,
            }}
        >
            {children}
        </div>
    );
};

export default ModalBackdrop;