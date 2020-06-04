import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import { Mail } from "@material-ui/icons";

import {
    ForgotPassword as ForgotPasswordMutation,
    ForgotPasswordVariables
} from "../../GraphQL/__generated__/ForgotPassword";
import { FORGOT_PASSWORD_MUTATION } from "../../GraphQL/Mutations";
import Container500 from "../Layout/Containers/Container500";
import Heading from "../Shared/Heading";
import Success from "../Shared/Form/Success";
import Form from "../Shared/Form/Form";
import Button from "../Shared/Form/Button";
import Input from "../Shared/Form/Input/Input";
import Error from "../Shared/Form/Error";

const StyledForgotPassword = styled.div`
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

const ForgotPassword: React.FC = (): React.ReactElement => {
    const [success, setSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [forgotPassword, { loading }] = useMutation<ForgotPasswordMutation, ForgotPasswordVariables>(
        FORGOT_PASSWORD_MUTATION
    );

    return (
        <React.Fragment>
            <Helmet>
                <title>Holidaze - Forgot Password</title>
            </Helmet>
            <Container500>
                <Heading size="h1">Forgot Password</Heading>
                <Heading size="h2">Request a password reset</Heading>
                <StyledForgotPassword>
                    {success && (
                        <Success>
                            A email with further instructions to reset you password has been sent to the email address
                            you provided.
                        </Success>
                    )}
                    {showError && (
                        <StyledError>A user with the provided email address does not exist in our systems.</StyledError>
                    )}
                    <Formik
                        initialValues={{ email: "" }}
                        validationSchema={Yup.object({
                            email: Yup.string().required("Email is required.").email("Invalid email address.")
                        })}
                        onSubmit={async (values, { resetForm }): Promise<void> => {
                            try {
                                await forgotPassword({ variables: { email: values.email } });
                                resetForm();
                                setSuccess(true);
                            } catch (error) {
                                setShowError(true);
                            }
                        }}
                    >
                        <Form>
                            <StyledInput name="email" label="Your email address" type="email">
                                <Mail />
                            </StyledInput>
                            <Button
                                disabled={loading}
                                onClick={(): void => {
                                    setShowError(false);
                                    setSuccess(false);
                                }}
                            >
                                Confirm
                            </Button>
                        </Form>
                    </Formik>
                </StyledForgotPassword>
            </Container500>
        </React.Fragment>
    );
};

export default ForgotPassword;
