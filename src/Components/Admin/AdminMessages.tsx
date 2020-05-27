import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import styled from "styled-components";
import { Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

import { GetAllMessages, GetAllMessages_getAllMessages } from "../../GraphQL/__generated__/GetAllMessages";
import { GET_ALL_MESSAGES_QUERY } from "../../GraphQL/Queries";
import Loading from "../Shared/Loading";
import Table from "../Shared/Table";
import Link from "../Shared/Link";
import Modal from "../Shared/Modal";
import { CHANGE_MESSAGE_STATUS } from "../../GraphQL/Mutations";
import { ChangeMessageStatus, ChangeMessageStatusVariables } from "../../GraphQL/__generated__/ChangeMessageStatus";

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

const AdminMessages: React.FC = (): React.ReactElement => {
    const { loading, data } = useQuery<GetAllMessages>(GET_ALL_MESSAGES_QUERY);
    const [changeStatus] = useMutation<ChangeMessageStatus, ChangeMessageStatusVariables>(CHANGE_MESSAGE_STATUS);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState<GetAllMessages_getAllMessages>();

    const handleChangeStatus = async (id: string, status: 0 | 1): Promise<void> => {
        await changeStatus({
            variables: { id, status },
            optimisticResponse: {
                changeMessageStatus: {
                    __typename: "ContactType",
                    id: id,
                    status: status
                }
            }
        });

        setModalData((prevState) => ({
            ...(prevState as GetAllMessages_getAllMessages),
            status: status
        }));
    };

    if (loading) {
        return <Loading text="Loading messages" />;
    }

    return (
        <React.Fragment>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Client Name</Th>
                        <Th>Email</Th>
                        <Th>Received</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data &&
                        data.getAllMessages.map((message) => (
                            <Tr key={`message-${message.id}`}>
                                <Td>{message.clientName}</Td>
                                <Td>
                                    <Link href={`mailto:${message.email}`} external={true}>
                                        {message.email}
                                    </Link>
                                </Td>
                                <Td>{moment(message.createdAt).format("DD.MM.YYYY - HH:mm")}</Td>
                                <Td>{message.status === 0 ? "Unresolved" : "Resolved"}</Td>
                                <Td>
                                    <Link
                                        onClick={(): void => {
                                            setModalData(message);
                                            setShowModal(true);
                                        }}
                                    >
                                        View Message
                                    </Link>{" "}
                                    /{" "}
                                    {message.status === 0 ? (
                                        <Link onClick={(): Promise<void> => handleChangeStatus(message.id, 1)}>
                                            Resolved
                                        </Link>
                                    ) : (
                                        <Link onClick={(): Promise<void> => handleChangeStatus(message.id, 0)}>
                                            Unresolved
                                        </Link>
                                    )}
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
            <StyledModal showModal={showModal} setShowModal={setShowModal}>
                <h1>Message details</h1>
                <p>Client name: {modalData?.clientName}</p>
                <p>
                    Email:{" "}
                    <Link href={`mailto:${modalData?.email}`} external={true}>
                        {modalData?.email}
                    </Link>
                </p>
                <p>Received: {moment(modalData?.createdAt).format("DD.MM.YYYY - HH:mm")}</p>
                <p>Status: {modalData?.status === 0 ? "Unresolved" : "Resolved"}</p>
                <h1>Message</h1>
                <p>{modalData?.message}</p>
                <span>
                    <Link
                        onClick={(): Promise<void> =>
                            handleChangeStatus(modalData?.id as string, modalData?.status === 0 ? 1 : 0)
                        }
                    >
                        Mark as {modalData?.status === 0 ? "resolved" : "unresolved"}
                    </Link>
                </span>
            </StyledModal>
        </React.Fragment>
    );
};

export default AdminMessages;
