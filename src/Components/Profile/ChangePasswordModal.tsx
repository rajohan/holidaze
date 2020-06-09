import React, { useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import { Lock } from "@material-ui/icons";

import Form from "../Shared/Form/Form";
import Button from "../Shared/Form/Button";
import Modal from "../Shared/Modal";
import Success from "../Shared/Form/Success";
import Input from "../Shared/Form/Input/Input";

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

const StyledInput = styled(Input)`
    margin-bottom: 10px;
`;

type Props = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
};

const ChangePasswordModal: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { showModal, setShowModal } = props;
    const [success, setSuccess] = useState(false);

    return (
        <StyledModal
            showModal={showModal}
            setShowModal={setShowModal}
            closeOnClickOutside={false}
            onCloseButtonClick={(): void => setSuccess(false)}
        >
            <h1>Change Password</h1>
            {success && <Success>Your password has been successfully changed</Success>}
            <Formik
                initialValues={{ newPassword: "", newPassword2: "" }}
                validationSchema={Yup.object({
                    newPassword: Yup.string()
                        .required("Password is required.")
                        .min(6, "The password must be minimum 6 characters"),
                    newPassword2: Yup.string()
                        .required("Repeat password is required")
                        .equals([Yup.ref("newPassword")], "Passwords do not match")
                })}
                onSubmit={async (_, { resetForm }): Promise<void> => {
                    resetForm();
                    setSuccess(true);
                }}
            >
                <Form>
                    <StyledInput name="newPassword" label="New password" type="password">
                        <Lock />
                    </StyledInput>
                    <StyledInput name="newPassword2" label="Repeat new password" type="password">
                        <Lock />
                    </StyledInput>
                    <Button
                        onClick={(): void => {
                            setSuccess(false);
                        }}
                    >
                        Change password
                    </Button>
                </Form>
            </Formik>
        </StyledModal>
    );
};

export default ChangePasswordModal;
