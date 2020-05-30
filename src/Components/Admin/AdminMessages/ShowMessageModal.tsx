import React from "react";
import styled from "styled-components";
import moment from "moment";

import { GetAllMessages_getAllMessages } from "../../../GraphQL/__generated__/GetAllMessages";
import Modal from "../../Shared/Modal";
import Link from "../../Shared/Link";

const StyledModal = styled(Modal)`
    max-width: 500px;

    h1 {
        text-transform: capitalize;
        font-size: 18px;
        margin-bottom: 5px;

        :nth-of-type(2) {
            margin-top: 20px;
        }
    }

    span {
        margin-top: 20px;
    }

    a {
        color: ${(props): string => props.theme.colors.tertiary};

        &:focus,
        &:hover {
            color: ${(props): string => props.theme.colors.primary};
        }
    }
`;

type Props = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    message: GetAllMessages_getAllMessages;
    handleChangeStatus: (id: string, status: 0 | 1) => Promise<void>;
};

const ShowMessageModal: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { showModal, setShowModal, message, handleChangeStatus } = props;

    return (
        <StyledModal showModal={showModal} setShowModal={setShowModal}>
            <h1>Message details</h1>
            <p>Client name: {message.clientName}</p>
            <p>
                Email:{" "}
                <Link href={`mailto:${message.email}`} external={true}>
                    {message.email}
                </Link>
            </p>
            <p>Received: {moment(message.createdAt).format("DD.MM.YYYY - HH:mm")}</p>
            <p>Status: {message.status === 0 ? "Unresolved" : "Resolved"}</p>
            <h1>Message</h1>
            <p>{message.message}</p>
            <span>
                <Link onClick={(): Promise<void> => handleChangeStatus(message.id, message.status === 0 ? 1 : 0)}>
                    Mark as {message.status === 0 ? "resolved" : "unresolved"}
                </Link>
            </span>
        </StyledModal>
    );
};

export default ShowMessageModal;
