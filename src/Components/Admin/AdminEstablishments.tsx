import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Home, Mail, AttachMoney, People, Image, HomeWork, Explore, RestaurantMenu } from "@material-ui/icons";
import { Formik } from "formik";
import * as Yup from "yup";
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
import Form from "../Shared/Form/Form";
import Input from "../Shared/Form/Input/Input";
import Checkbox from "../Shared/Form/Checkbox";

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

const StyledNewEditEstablishmentModal = styled(Modal)`
    max-width: 500px;

    h1 {
        font-size: 18px;
        margin: 0 30px 10px 30px;
        text-align: center;
    }

    button {
        margin-top: 20px;
    }

    .inputGroup {
        display: flex;
        flex-direction: column;

        @media only screen and (min-width: 400px) {
            flex-direction: row;
        }

        div {
            width: 100%;

            @media only screen and (min-width: 400px) {
                &:first-of-type {
                    margin-right: 10px;
                }
            }
        }
    }
`;

const StyledInput = styled(Input)`
    margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
    margin-top: 30px;
`;

const StyledCheckbox = styled(Checkbox)`
    margin-bottom: 10px;
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
    const [showModal2, setShowModal2] = useState(false);

    if (loading && !data) {
        return <Loading text="Loading enquiries" />;
    }

    return (
        <React.Fragment>
            <StyledButton onClick={(): void => setShowModal2(true)}>Add new establishment</StyledButton>
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
                                            setShowModal2(true);
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
            {showModal2 && (
                <StyledNewEditEstablishmentModal
                    showModal={showModal2}
                    setShowModal={setShowModal2}
                    closeOnClickOutside={false}
                >
                    <h1>Add Establishment</h1>
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            imageUrl: "",
                            price: "",
                            maxGuests: "",
                            googleLat: "",
                            googleLong: "",
                            selfCatering: false,
                            description: ""
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string()
                                .required("Name is required.")
                                .min(3, "The name must be at least 3 characters."),
                            email: Yup.string().required("Email is required.").email("Invalid email address."),
                            imageUrl: Yup.string().required("Image url is required").url("Invalid image url."),
                            price: Yup.number().required("Price is required.").min(1, "Minimum price 1$ is required"),
                            maxGuests: Yup.number()
                                .required("Number of max guests is required.")
                                .min(1, "Minimum 1 max guests is required"),
                            googleLat: Yup.number()
                                .required("Latitude is required")
                                .min(-90, "The latitude must me minimum -90")
                                .max(90, "The latitude can not be above 90"),
                            googleLong: Yup.number()
                                .required("Longitude is required")
                                .min(-180, "The longitude must me minimum -180")
                                .max(180, "The latitude can not be above 180"),
                            description: Yup.string()
                                .required("Description is required.")
                                .min(10, "The description must be at least 10 characters.")
                        })}
                        onSubmit={async (values): Promise<void> => {
                            console.log(values);
                        }}
                    >
                        <Form>
                            <StyledInput name="name" label="Name" type="text">
                                <Home />
                            </StyledInput>
                            <StyledInput name="email" label="Client email" type="email">
                                <Mail />
                            </StyledInput>
                            <StyledInput name="imageUrl" label="Image url" type="email">
                                <Image />
                            </StyledInput>
                            <div className="inputGroup">
                                <StyledInput name="price" label="Price" type="number" min={1}>
                                    <AttachMoney />
                                </StyledInput>
                                <StyledInput name="maxGuests" label="Max guests" type="number" min={1}>
                                    <People />
                                </StyledInput>
                            </div>
                            <div className="inputGroup">
                                <StyledInput
                                    name="googleLat"
                                    label="Latitude"
                                    type="number"
                                    min={-90}
                                    max={90}
                                    step={0.000001}
                                >
                                    <Explore />
                                </StyledInput>
                                <StyledInput
                                    name="googleLong"
                                    label="Longitude"
                                    type="number"
                                    min={-180}
                                    max={180}
                                    step={0.000001}
                                >
                                    <Explore />
                                </StyledInput>
                            </div>
                            <StyledCheckbox name="selfCatering" label="Self Catering">
                                <RestaurantMenu />
                            </StyledCheckbox>
                            <StyledInput name="description" label="Description" type="textarea">
                                <HomeWork />
                            </StyledInput>
                            <Button>Send Message</Button>
                        </Form>
                    </Formik>
                </StyledNewEditEstablishmentModal>
            )}
        </React.Fragment>
    );
};

export default AdminEstablishments;
