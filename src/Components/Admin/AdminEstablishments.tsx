import React from "react";
import { useLazyLoadQuery } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
import { Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

import Table from "../Shared/Table";
import { AdminEstablishmentsGetAllEstablishmentsQuery } from "./__generated__/AdminEstablishmentsGetAllEstablishmentsQuery.graphql";

const AdminEstablishments: React.FC = (): React.ReactElement => {
    const data = useLazyLoadQuery<AdminEstablishmentsGetAllEstablishmentsQuery>(
        graphql`
            query AdminEstablishmentsGetAllEstablishmentsQuery {
                getAllEstablishments {
                    id
                    name
                    email
                }
            }
        `,
        {},
        { fetchPolicy: "store-or-network" }
    );

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data.getAllEstablishments.map((establishment) => (
                    <Tr key={`establishment-${establishment.id}`}>
                        <Td>{establishment.name}</Td>
                        <Td>{establishment.email}</Td>
                        <Td>Edit / Delete</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default AdminEstablishments;
