import React from "react";
import { preloadQuery, usePreloadedQuery } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
import moment from "moment";
import { Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

import Table from "../Shared/Table";
import { AdminMessagesGetAllMessagesQuery } from "./__generated__/AdminMessagesGetAllMessagesQuery.graphql";
import { environment } from "../../relay/RelayEnvironment";

const query = graphql`
    query AdminMessagesGetAllMessagesQuery {
        getAllMessages {
            id
            clientName
            email
            createdAt
        }
    }
`;

const result = preloadQuery<AdminMessagesGetAllMessagesQuery>(
    environment,
    query,
    {},
    { fetchPolicy: "store-or-network" }
);

const AdminMessages: React.FC = (): React.ReactElement => {
    const data = usePreloadedQuery<AdminMessagesGetAllMessagesQuery>(query, result);

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
                {data.getAllMessages.map((message) => (
                    <Tr key={`message-${message.id}`}>
                        <Td>{message.clientName}</Td>
                        <Td>{message.email}</Td>
                        <Td>{moment(message.createdAt as Date).format("DD.MM.YYYY - HH:mm")}</Td>
                        <Td>Unresolved</Td>
                        <Td>View Message</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default AdminMessages;
