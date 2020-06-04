import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import { Lock } from "@material-ui/icons";

import {
    ForgotPasswordVerify as ForgotPasswordVerifyMutation,
    ForgotPasswordVerifyVariables
} from "../../GraphQL/__generated__/ForgotPasswordVerify";
import { FORGOT_PASSWORD_VERIFY_MUTATION } from "../../GraphQL/Mutations";
import Container500 from "../Layout/Containers/Container500";
import Heading from "../Shared/Heading";
import Success from "../Shared/Form/Success";
import Form from "../Shared/Form/Form";
import Button from "../Shared/Form/Button";
import Input from "../Shared/Form/Input/Input";
import Error from "../Shared/Form/Error";

const StyledForgotPasswordVerify = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${(props): string => props.theme.colors.secondary};
    width: 100%;
    padding: 30px;
    margin: 30px 0;
    border-radius: 2px;

    button {
        margin-top: 10px;
        align-self: center;
    }
`;

const StyledInput = styled(Input)`
    margin-bottom: 20px;
`;

const StyledError = styled(Error)`
    margin-bottom: 20px;
`;

const ForgotPasswordVerify: React.FC = (): React.ReactElement => {
    const [success, setSuccess] = useState(false);
    const { token } = useParams<{ token: string }>();
    const [showError, setShowError] = useState(false);
    const [forgotPasswordVerify, { loading }] = useMutation<
        ForgotPasswordVerifyMutation,
        ForgotPasswordVerifyVariables
    >(FORGOT_PASSWORD_VERIFY_MUTATION);

    return (
        <React.Fragment>
            <Helmet>
                <title>Holidaze - Forgot Password</title>
            </Helmet>
            <Container500>
                <Heading size="h1">Forgot Password</Heading>
                <Heading size="h2">Reset your password</Heading>
                <StyledForgotPasswordVerify>
                    {success && <Success>Your password has been successfully changed</Success>}
                    {showError && <StyledError>The reset password token is either invalid or expired.</StyledError>}
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
                        onSubmit={async (values, { resetForm }): Promise<void> => {
                            try {
                                await forgotPasswordVerify({ variables: { newPassword: values.newPassword, token } });
                                resetForm();
                                setSuccess(true);
                            } catch (error) {
                                setShowError(true);
                            }
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
                                disabled={loading}
                                onClick={(): void => {
                                    setShowError(false);
                                    setSuccess(false);
                                }}
                            >
                                Reset password
                            </Button>
                        </Form>
                    </Formik>
                </StyledForgotPasswordVerify>
            </Container500>
        </React.Fragment>
    );
};

export default ForgotPasswordVerify;
