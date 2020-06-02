import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { Formik } from "formik";
import * as Yup from "yup";
import { Face, Mail, Person } from "@material-ui/icons";

import { Register as RegisterMutation, RegisterVariables } from "../../GraphQL/__generated__/Register";
import { REGISTER_MUTATION } from "../../GraphQL/Mutations";
import Container500 from "../Layout/Containers/Container500";
import Heading from "../Shared/Heading";
import Success from "../Shared/Form/Success";
import Form from "../Shared/Form/Form";
import Button from "../Shared/Form/Button";
import Input from "../Shared/Form/Input/Input";
import Checkbox from "../Shared/Form/Checkbox";
import Error from "../Shared/Form/Error";

const StyledRegister = styled.div`
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

const StyledCheckbox = styled(Checkbox)`
    margin-bottom: 10px;
    align-self: center;
`;

const StyledError = styled(Error)`
    width: calc(100%);
    margin-bottom: 20px;
`;

const Register: React.FC = (): React.ReactElement => {
    const [success, setSuccess] = useState(false);
    const [register, { loading }] = useMutation<RegisterMutation, RegisterVariables>(REGISTER_MUTATION);
    const [showSignUpError, setShowSignUpError] = useState(false);
    const [signUpError, setSignUpError] = useState("");

    return (
        <React.Fragment>
            <Helmet>
                <title>Holidaze - Sign Up</title>
            </Helmet>
            <Container500>
                <Heading size="h1">Sign up</Heading>
                <Heading size="h2">Keep control of your enquiries</Heading>
                <StyledRegister>
                    {success && (
                        <Success>
                            The user has been successfully created. Check your email for the auto generated password
                        </Success>
                    )}
                    {showSignUpError && <StyledError>{signUpError}</StyledError>}
                    <Formik
                        initialValues={{ usernameRegister: "", name: "", email: "", newsletter: false }}
                        validationSchema={Yup.object({
                            usernameRegister: Yup.string()
                                .required("Username is required.")
                                .min(3, "Username must be at least 3 characters.")
                                .max(9, "Username can be maximum 9 characters.")
                                .matches(/^[a-z0-9]+$/i, "Username can only contain letters and numbers."),
                            name: Yup.string()
                                .required("Name is required.")
                                .min(3, "Your name must be at least 3 characters."),
                            email: Yup.string().required("Email is required.").email("Invalid email address.")
                        })}
                        onSubmit={async (values, { resetForm }): Promise<void> => {
                            try {
                                await register({
                                    variables: {
                                        username: values.usernameRegister,
                                        email: values.email,
                                        name: values.name,
                                        newsletters: values.newsletter,
                                        password: ""
                                    }
                                });
                                resetForm();
                                setSuccess(true);
                            } catch (error) {
                                if (error.message === "Username Taken") {
                                    setSignUpError("Username already taken.");
                                    setShowSignUpError(true);
                                } else if (error.message === "Email Taken") {
                                    setSignUpError("Email already taken.");
                                    setShowSignUpError(true);
                                }
                            }
                        }}
                    >
                        <Form>
                            <StyledInput name="usernameRegister" label="Your username" type="text">
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
                                disabled={loading}
                                onClick={(): void => {
                                    setSuccess(false);
                                    setSignUpError("");
                                    setShowSignUpError(false);
                                }}
                            >
                                Sign Up
                            </Button>
                        </Form>
                    </Formik>
                </StyledRegister>
            </Container500>
        </React.Fragment>
    );
};

export default Register;
