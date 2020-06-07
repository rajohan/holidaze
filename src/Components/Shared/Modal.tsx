import React, { useEffect, useRef } from "react";
import { enableBodyScroll, disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import styled from "styled-components";
import { Close } from "@material-ui/icons";

const StyledModal = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.8);
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 0 15px;
    max-height: calc(100vh - 30px);
    padding: 15px;
    background-color: ${(props): string => props.theme.colors.secondary};
    overflow-y: auto;
    border-radius: 2px;
    color: ${(props): string => props.theme.colors.primary};

    @media only screen and (min-width: 400px) {
        margin: 0 30px;
        max-height: calc(100vh - 60px);
    }

    .modalClose {
        width: 24px;
        height: 24px;
        position: absolute;
        top: 15px;
        right: 15px;
        cursor: pointer;
        fill: ${(props): string => props.theme.colors.text};
        transition: fill 0.3s;

        &:hover {
            fill: ${(props): string => props.theme.colors.error};
        }
    }
`;

type Props = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    children: React.ReactNode;
    className?: string;
    closeOnClickOutside?: boolean;
    onCloseButtonClick?: () => void;
};

const Modal: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { showModal, setShowModal, children, className, onCloseButtonClick, closeOnClickOutside = true } = props;

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        showModal
            ? modalRef.current && disableBodyScroll(modalRef.current)
            : modalRef.current && enableBodyScroll(modalRef.current);

        return (): void => {
            clearAllBodyScrollLocks();
        };
    }, [showModal]);

    return (
        <React.Fragment>
            {showModal && (
                <StyledModal
                    onClick={(): void => {
                        closeOnClickOutside && setShowModal(false);
                    }}
                >
                    <ModalContent ref={modalRef} className={className} onClick={(e): void => e.stopPropagation()}>
                        <Close
                            onClick={(): void => {
                                setShowModal(false);
                                onCloseButtonClick && onCloseButtonClick();
                            }}
                            className="modalClose"
                        />
                        {children}
                    </ModalContent>
                </StyledModal>
            )}
        </React.Fragment>
    );
};

export default Modal;
