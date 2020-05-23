import React from "react";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

import { GetAllMessagesData } from "../../GraphQL/types";
import { GET_ALL_MESSAGES_QUERY } from "../../GraphQL/Queries";
import Loading from "../Shared/Loading";
import Table from "../Shared/Table";

const AdminMessages: React.FC = (): React.ReactElement => {
    const { loading, data } = useQuery<GetAllMessagesData>(GET_ALL_MESSAGES_QUERY);

    if (loading) {
        return <Loading text="Loading messages" />;
    }

    return (
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
                            <Td>{message.email}</Td>
                            <Td>{moment(message.createdAt).format("DD.MM.YYYY - HH:mm")}</Td>
                            <Td>Unresolved</Td>
                            <Td>View Message</Td>
                        </Tr>
                    ))}
            </Tbody>
        </Table>
    );
};

export default AdminMessages;
