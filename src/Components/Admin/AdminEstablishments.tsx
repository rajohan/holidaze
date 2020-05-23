import React from "react";
import { useQuery } from "@apollo/client";
import { Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

import { AdminGetAllEstablishmentsData } from "../../GraphQL/types";
import { ADMIN_GET_ALL_ESTABLISHMENTS_QUERY } from "../../GraphQL/Queries";
import Loading from "../Shared/Loading";
import Table from "../Shared/Table";

const AdminEstablishments: React.FC = (): React.ReactElement => {
    const { loading, data } = useQuery<AdminGetAllEstablishmentsData>(ADMIN_GET_ALL_ESTABLISHMENTS_QUERY);

    if (loading) {
        return <Loading text="Loading enquiries" />;
    }

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
                {data &&
                    data.getAllEstablishments.map((establishment) => (
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
