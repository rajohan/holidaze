import React, { useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import { Face, Mail, Person } from "@material-ui/icons";

import { GetUser_getUser } from "../../GraphQL/__generated__/GetUser";
import Button from "../Shared/Form/Button";
import Input from "../Shared/Form/Input/Input";
import Checkbox from "../Shared/Form/Checkbox";
import Error from "../Shared/Form/Error";
import Modal from "../Shared/Modal";
import Success from "../Shared/Form/Success";
import Form from "../Shared/Form/Form";

const StyledInput = styled(Input)`
    margin-bottom: 10px;
`;

const StyledCheckbox = styled(Checkbox)`
    margin-bottom: 10px;
`;

const StyledError = styled(Error)`
    width: calc(100%);
    margin-bottom: 20px;
`;

const StyledModal = styled(Modal)`
    max-width: 500px;

    h1 {
        font-size: 18px;
        margin: 0 30px 10px 30px;
        text-align: center;
    }

    button {
        margin-top: 20px;
        align-self: center;
    }
`;

type Props = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    userData: GetUser_getUser;
    isOnNewsletterList: boolean;
};

const EditUserModal: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { showModal, setShowModal, userData, isOnNewsletterList } = props;
    const [showEditUserError, setShowEditUserError] = useState(false);
    const [editUserError, setEditUserError] = useState("");
    const [success, setSuccess] = useState(false);

    return (
        <StyledModal
            showModal={showModal}
            setShowModal={setShowModal}
            closeOnClickOutside={false}
            onCloseButtonClick={(): void => setSuccess(false)}
        >
            <h1>Edit User Details</h1>
            {success && <Success>The establishment has been successfully added.</Success>}
            {showEditUserError && <StyledError>{editUserError}</StyledError>}
            <Formik
                initialValues={{
                    usernameEdit: userData.username,
                    name: userData.name,
                    email: userData.email,
                    newsletter: isOnNewsletterList
                }}
                validationSchema={Yup.object({
                    usernameEdit: Yup.string()
                        .required("Username is required.")
                        .min(3, "Username must be at least 3 characters.")
                        .max(9, "Username can be maximum 9 characters.")
                        .matches(/^[a-z0-9]+$/i, "Username can only contain letters and numbers."),
                    name: Yup.string().required("Name is required.").min(3, "Your name must be at least 3 characters."),
                    email: Yup.string().required("Email is required.").email("Invalid email address.")
                })}
                onSubmit={async (_, { resetForm }): Promise<void> => {
                    try {
                        resetForm();
                        setSuccess(true);
                    } catch (error) {
                        if (error.message === "Username Taken") {
                            setEditUserError("Username already taken.");
                            setShowEditUserError(true);
                        } else if (error.message === "Email Taken") {
                            setEditUserError("Email already taken.");
                            setShowEditUserError(true);
                        }
                    }
                }}
            >
                <Form>
                    <StyledInput name="usernameEdit" label="Your username" type="text">
                        <Person />
                    </StyledInput>
                    <StyledInput name="name" label="Your name" type="text">
                        <Face />
                    </StyledInput>
                    <StyledInput name="email" label="Your email address" type="email">
                        <Mail />
                    </StyledInput>
                    <StyledCheckbox name="newsletter" label="Subscribe to newsletters" />
                    <Button
                        onClick={(): void => {
                            setSuccess(false);
                            setEditUserError("");
                            setShowEditUserError(false);
                        }}
                    >
                        Edit
                    </Button>
                </Form>
            </Formik>
        </StyledModal>
    );
};

export default EditUserModal;
