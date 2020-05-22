import React, { useContext } from "react";
import styled from "styled-components";
import { useMutation } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
import { Formik } from "formik";

import { LoginMutation, LoginMutationResponse } from "./__generated__/LoginMutation.graphql";
import { setAuthToken } from "../../store/actions";
import { StoreContext } from "../../store";
import Input from "../Shared/Form/Input/Input";
import Button from "../Shared/Form/Button";
import Form from "../Shared/Form/Form";

const StyledLogin = styled.div``;

const Login: React.FC = (): React.ReactElement => {
    const { dispatch } = useContext(StoreContext);

    const [commit, isInFlight] = useMutation<LoginMutation>(graphql`
        mutation LoginMutation($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                authToken
            }
        }
    `);

    const mutationConfig = {
        onCompleted: (response: LoginMutationResponse): void => {
            dispatch(setAuthToken(response.login.authToken));
        },
        onError: (error: Error): void => console.log(error)
    };

    return (
        <StyledLogin>
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={(values): void => {
                    commit({ ...mutationConfig, variables: { ...values } });
                }}
            >
                <Form>
                    <Input name="username" label="Username" />
                    <Input name="password" type="password" label="Password" />
                    <Button disabled={isInFlight}>Login</Button>
                </Form>
            </Formik>
        </StyledLogin>
    );
};

export default Login;
