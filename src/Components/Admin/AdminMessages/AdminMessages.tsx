import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

import { GetAllMessages, GetAllMessages_getAllMessages } from "../../../GraphQL/__generated__/GetAllMessages";
import { ChangeMessageStatus, ChangeMessageStatusVariables } from "../../../GraphQL/__generated__/ChangeMessageStatus";
import { CHANGE_MESSAGE_STATUS_MUTATION } from "../../../GraphQL/Mutations";
import { GET_ALL_MESSAGES_QUERY } from "../../../GraphQL/Queries";
import Loading from "../../Shared/Loading";
import Table from "../../Shared/Table";
import Link from "../../Shared/Link";

const ShowMessageModal = React.lazy(() => import("./ShowMessageModal"));

const AdminMessages: React.FC = (): React.ReactElement => {
    const { loading, data } = useQuery<GetAllMessages>(GET_ALL_MESSAGES_QUERY);
    const [changeStatus] = useMutation<ChangeMessageStatus, ChangeMessageStatusVariables>(
        CHANGE_MESSAGE_STATUS_MUTATION
    );
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState<GetAllMessages_getAllMessages>();

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

        setMessage((prevState) => ({
            ...(prevState as GetAllMessages_getAllMessages),
            status: status
        }));
    };

    if (loading && !data) {
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
                                            setMessage(message);
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
            {showModal && (
                <ShowMessageModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    message={message as GetAllMessages_getAllMessages}
                    handleChangeStatus={handleChangeStatus}
                />
            )}
        </React.Fragment>
    );
};

export default AdminMessages;
