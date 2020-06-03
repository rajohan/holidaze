import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

import {
    AdminGetAllEstablishments,
    AdminGetAllEstablishments_getAllEstablishments
} from "../../../GraphQL/__generated__/AdminGetAllEstablishments";
import { ADMIN_GET_ALL_ESTABLISHMENTS_QUERY } from "../../../GraphQL/Queries";
import Loading from "../../Shared/Loading";
import Table from "../../Shared/Table";
import Link from "../../Shared/Link";
import Button from "../../Shared/Form/Button";
import { createSlug } from "../../../utils/createSlug";

const AddEstablishmentModal = React.lazy(() => import("./AddEstablishmentModal"));
const EditEstablishmentModal = React.lazy(() => import("./EditEstablishmentModal"));
const DeleteEstablishmentModal = React.lazy(() => import("./DeleteEstablishmentModal"));

const StyledButton = styled(Button)`
    margin-top: 30px;
`;

const Error = styled.div`
    background-color: ${(props): string => props.theme.colors.secondary};
    padding: 20px;
    width: 100%;
    text-align: center;
    border-radius: 2px;
    margin: 20px 0;
`;

const AdminEstablishments: React.FC = (): React.ReactElement => {
    const { loading, data } = useQuery<AdminGetAllEstablishments>(ADMIN_GET_ALL_ESTABLISHMENTS_QUERY);
    const [showAddEstablishmentModal, setShowAddEstablishmentModal] = useState(false);
    const [showEditEstablishmentModal, setShowEditEstablishmentModal] = useState(false);
    const [showDeleteEstablishmentModal, setShowDeleteEstablishmentModal] = useState(false);
    const [establishmentToEdit, setEstablishmentToEdit] = useState<AdminGetAllEstablishments_getAllEstablishments>();
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
            {data && data.getAllEstablishments.length < 1 ? (
                <Error>No establishments could be found</Error>
            ) : (
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
                                            href={`/establishment/${establishment.id}/${createSlug(
                                                establishment.name
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
                                                setEstablishmentToEdit(establishment);
                                                setShowEditEstablishmentModal(true);
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
            )}
            {showAddEstablishmentModal && (
                <AddEstablishmentModal
                    showModal={showAddEstablishmentModal}
                    setShowModal={setShowAddEstablishmentModal}
                />
            )}
            {showEditEstablishmentModal && (
                <EditEstablishmentModal
                    showModal={showEditEstablishmentModal}
                    setShowModal={setShowEditEstablishmentModal}
                    establishment={establishmentToEdit as AdminGetAllEstablishments_getAllEstablishments}
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
