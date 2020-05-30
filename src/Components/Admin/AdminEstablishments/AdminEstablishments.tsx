import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

import { AdminGetAllEstablishments } from "../../../GraphQL/__generated__/AdminGetAllEstablishments";
import { ADMIN_GET_ALL_ESTABLISHMENTS_QUERY } from "../../../GraphQL/Queries";
import Loading from "../../Shared/Loading";
import Table from "../../Shared/Table";
import Link from "../../Shared/Link";
import Button from "../../Shared/Form/Button";

const AddEstablishmentModal = React.lazy(() => import("./AddEstablishmentModal"));
const DeleteEstablishmentModal = React.lazy(() => import("./DeleteEstablishmentModal"));

const StyledButton = styled(Button)`
    margin-top: 30px;
`;

const AdminEstablishments: React.FC = (): React.ReactElement => {
    const { loading, data } = useQuery<AdminGetAllEstablishments>(ADMIN_GET_ALL_ESTABLISHMENTS_QUERY);
    const [showDeleteEstablishmentModal, setShowDeleteEstablishmentModal] = useState(false);
    const [showAddEstablishmentModal, setShowAddEstablishmentModal] = useState(false);
    const [establishmentToDelete, setEstablishmentToDelete] = useState<{ id: string; name: string }>({
        id: "",
        name: ""
    });

    if (loading && !data) {
        return <Loading text="Loading enquiries" />;
    }

    return (
        <React.Fragment>
            <StyledButton onClick={(): void => setShowAddEstablishmentModal(true)}>Add new establishment</StyledButton>
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
                                <Td>
                                    <Link
                                        href={`/establishment/${establishment.id}/${establishment.name.replace(
                                            /\s/g,
                                            "-"
                                        )}`}
                                    >
                                        {establishment.name}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link href={`mailto:${establishment.email}`} external={true}>
                                        {establishment.email}
                                    </Link>
                                </Td>
                                <Td>
                                    <Link
                                        onClick={(): void => {
                                            setShowAddEstablishmentModal(true);
                                        }}
                                    >
                                        Edit
                                    </Link>{" "}
                                    /{" "}
                                    <Link
                                        onClick={(): void => {
                                            setEstablishmentToDelete({
                                                id: establishment.id,
                                                name: establishment.name
                                            });
                                            setShowDeleteEstablishmentModal(true);
                                        }}
                                    >
                                        Delete
                                    </Link>
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
            {showAddEstablishmentModal && (
                <AddEstablishmentModal
                    showModal={showAddEstablishmentModal}
                    setShowModal={setShowAddEstablishmentModal}
                />
            )}
            {showDeleteEstablishmentModal && (
                <DeleteEstablishmentModal
                    showModal={showDeleteEstablishmentModal}
                    setShowModal={setShowDeleteEstablishmentModal}
                    establishment={establishmentToDelete}
                    setEstablishment={setEstablishmentToDelete}
                />
            )}
        </React.Fragment>
    );
};

export default AdminEstablishments;
