import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { Formik } from "formik";
import { AttachMoney, Explore, Home, HomeWork, Image, Mail, People, RestaurantMenu } from "@material-ui/icons";

import { AdminGetAllEstablishments_getAllEstablishments } from "../../../GraphQL/__generated__/AdminGetAllEstablishments";
import { UpdateEstablishment, UpdateEstablishmentVariables } from "../../../GraphQL/__generated__/UpdateEstablishment";
import { ADMIN_GET_ALL_ESTABLISHMENTS_QUERY } from "../../../GraphQL/Queries";
import { UPDATE_ESTABLISHMENT_MUTATION } from "../../../GraphQL/Mutations";
import validationSchema from "./AddEditValidationSchema";
import Form from "../../Shared/Form/Form";
import Button from "../../Shared/Form/Button";
import Modal from "../../Shared/Modal";
import Input from "../../Shared/Form/Input/Input";
import Checkbox from "../../Shared/Form/Checkbox";
import Success from "../../Shared/Form/Success";

const StyledModal = styled(Modal)`
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

const StyledCheckbox = styled(Checkbox)`
    margin-bottom: 10px;
`;

type Props = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    establishment: AdminGetAllEstablishments_getAllEstablishments;
};

const EditEstablishmentModal: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { showModal, setShowModal, establishment } = props;

    const [success, setSuccess] = useState(false);
    const [editEstablishment, { loading }] = useMutation<UpdateEstablishment, UpdateEstablishmentVariables>(
        UPDATE_ESTABLISHMENT_MUTATION
    );

    return (
        <StyledModal
            showModal={showModal}
            setShowModal={setShowModal}
            closeOnClickOutside={false}
            onCloseButtonClick={(): void => setSuccess(false)}
        >
            <h1>Add Establishment</h1>
            {success && <Success>The establishment has been successfully edited.</Success>}
            <Formik
                initialValues={{
                    name: establishment.name,
                    email: establishment.email,
                    imageUrl: establishment.imageUrl,
                    price: establishment.price,
                    maxGuests: establishment.maxGuests,
                    googleLat: establishment.googleLat,
                    googleLong: establishment.googleLong,
                    selfCatering: establishment.selfCatering,
                    description: establishment.description
                }}
                validationSchema={validationSchema}
                onSubmit={async (values): Promise<void> => {
                    await editEstablishment({
                        variables: {
                            id: establishment.id,
                            name: values.name,
                            email: values.email,
                            imageUrl: values.imageUrl,
                            price: values.price as number,
                            maxGuests: values.maxGuests as number,
                            googleLat: values.googleLat as number,
                            googleLong: values.googleLong as number,
                            selfCatering: values.selfCatering,
                            description: values.description
                        },
                        refetchQueries: [{ query: ADMIN_GET_ALL_ESTABLISHMENTS_QUERY }],
                        awaitRefetchQueries: true
                    });
                    setSuccess(true);
                }}
            >
                <Form>
                    <StyledInput name="name" label="Name" type="text">
                        <Home />
                    </StyledInput>
                    <StyledInput name="email" label="Client email" type="email">
                        <Mail />
                    </StyledInput>
                    <StyledInput name="imageUrl" label="Image url" type="text">
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
                        <StyledInput name="googleLat" label="Latitude" type="number" min={-90} max={90} step={0.000001}>
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
                    <Button disabled={loading}>Edit establishment</Button>
                </Form>
            </Formik>
        </StyledModal>
    );
};

export default EditEstablishmentModal;
