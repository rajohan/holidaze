import React from "react";
import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { Formik } from "formik";

import { LOGIN_MUTATION } from "../../GraphQL/Mutations";
import { LoginResponse } from "../../GraphQL/types";
import { LOCAL_STORAGE_AUTH_TOKEN } from "../../constants";
import Input from "../Shared/Form/Input/Input";
import Button from "../Shared/Form/Button";
import Form from "../Shared/Form/Form";

const StyledLogin = styled.div``;

const Login: React.FC = (): React.ReactElement => {
    const [login, { loading }] = useMutation<LoginResponse>(LOGIN_MUTATION);

    return (
        <StyledLogin>
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={(values): void => {
                    login({ variables: { username: values.username, password: values.password } })
                        .then((response) => {
                            if (response.data) {
                                localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN, response.data.login.authToken);
                            }
                        })
                        .catch((error) => console.log(error));
                }}
            >
                <Form>
                    <Input name="username" label="Username" />
                    <Input name="password" type="password" label="Password" />
                    <Button disabled={loading}>Login</Button>
                </Form>
            </Formik>
        </StyledLogin>
    );
};

export default Login;
