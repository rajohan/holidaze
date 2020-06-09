import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { Formik } from "formik";
import { AttachMoney, Explore, Home, HomeWork, Image, Mail, People, RestaurantMenu } from "@material-ui/icons";

import { AddEstablishment, AddEstablishmentVariables } from "../../../GraphQL/__generated__/AddEstablishment";
import { ADMIN_GET_ALL_ESTABLISHMENTS_QUERY } from "../../../GraphQL/Queries";
import { ADD_ESTABLISHMENT_MUTATION } from "../../../GraphQL/Mutations";
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
};

const AddEstablishmentModal: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { showModal, setShowModal } = props;

    const [success, setSuccess] = useState(false);
    const [addEstablishment, { loading }] = useMutation<AddEstablishment, AddEstablishmentVariables>(
        ADD_ESTABLISHMENT_MUTATION
    );

    return (
        <StyledModal
            showModal={showModal}
            setShowModal={setShowModal}
            closeOnClickOutside={false}
            onCloseButtonClick={(): void => setSuccess(false)}
        >
            <h1>Add Establishment</h1>
            {success && <Success>The establishment has been successfully added.</Success>}
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    imageUrl: "",
                    price: "" as number | string,
                    maxGuests: "" as number | string,
                    googleLat: "" as number | string,
                    googleLong: "" as number | string,
                    selfCatering: false,
                    description: ""
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }): Promise<void> => {
                    await addEstablishment({
                        variables: {
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
                    resetForm();
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
                    <Button disabled={loading}>Add establishment</Button>
                </Form>
            </Formik>
        </StyledModal>
    );
};

export default AddEstablishmentModal;
