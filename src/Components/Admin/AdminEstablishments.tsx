import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

import { AdminGetAllEstablishments } from "../../GraphQL/__generated__/AdminGetAllEstablishments";
import { DeleteEstablishment, DeleteEstablishmentVariables } from "../../GraphQL/__generated__/DeleteEstablishment";
import { ADMIN_GET_ALL_ESTABLISHMENTS_QUERY } from "../../GraphQL/Queries";
import { DELETE_ESTABLISHMENT_MUTATION } from "../../GraphQL/Mutations";
import Loading from "../Shared/Loading";
import Table from "../Shared/Table";
import Link from "../Shared/Link";
import Modal from "../Shared/Modal";
import Button from "../Shared/Form/Button";

const StyledDeleteEstablishmentModal = styled(Modal)`
    align-items: center;
    max-width: 600px;

    h1 {
        font-size: 18px;
        margin: 0 30px 10px 30px;
        text-align: center;
    }

    p {
        color: ${(props): string => props.theme.colors.error};
        text-align: center;
    }

    .buttonsWrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 20px;

        @media only screen and (min-width: 450px) {
            flex-direction: row;
        }
    }

    .confirmButton {
        background-color: ${(props): string => props.theme.colors.success};
        margin: 10px;

        &:focus,
        &:hover {
            background-color: ${(props): string => props.theme.colors.successDark};
        }
    }

    .errorButton {
        background-color: ${(props): string => props.theme.colors.error};
        margin: 10px;

        &:focus,
        &:hover {
            background-color: ${(props): string => props.theme.colors.errorDark};
        }
    }
`;

const AdminEstablishments: React.FC = (): React.ReactElement => {
    const { loading, data } = useQuery<AdminGetAllEstablishments>(ADMIN_GET_ALL_ESTABLISHMENTS_QUERY);
    const [deleteEstablishment, { loading: loading2 }] = useMutation<DeleteEstablishment, DeleteEstablishmentVariables>(
        DELETE_ESTABLISHMENT_MUTATION
    );
    const [establishmentToDelete, setEstablishmentToDelete] = useState<{ id: string; name: string }>({
        id: "",
        name: ""
    });
    const [showModal, setShowModal] = useState(false);

    if (loading && !data) {
        return <Loading text="Loading enquiries" />;
    }

    return (
        <React.Fragment>
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
                                    Edit /{" "}
                                    <Link
                                        onClick={(): void => {
                                            setEstablishmentToDelete({
                                                id: establishment.id,
                                                name: establishment.name
                                            });
                                            setShowModal(true);
                                        }}
                                    >
                                        Delete
                                    </Link>
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
            {showModal && (
                <StyledDeleteEstablishmentModal showModal={showModal} setShowModal={setShowModal}>
                    <h1>Are you sure you want to delete {establishmentToDelete.name}?</h1>
                    <p>Warning: This will also delete all enquiries associated with this establishment</p>
                    <div className="buttonsWrapper">
                        <Button
                            className="confirmButton"
                            disabled={loading2}
                            onClick={async (): Promise<void> => {
                                await deleteEstablishment({
                                    variables: { id: establishmentToDelete.id },
                                    refetchQueries: [{ query: ADMIN_GET_ALL_ESTABLISHMENTS_QUERY }],
                                    awaitRefetchQueries: true
                                });
                                setShowModal(false);
                            }}
                        >
                            Yes
                        </Button>
                        <Button disabled={loading2} className="errorButton" onClick={(): void => setShowModal(false)}>
                            No
                        </Button>
                    </div>
                </StyledDeleteEstablishmentModal>
            )}
        </React.Fragment>
    );
};

export default AdminEstablishments;
