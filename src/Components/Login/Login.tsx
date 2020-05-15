import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
import { Disposable } from "relay-runtime";

import { LoginMutation, LoginMutationResponse } from "./__generated__/LoginMutation.graphql";
import Input from "../Shared/Input";
import Button from "../Shared/Button";

const StyledLogin = styled.div``;

const Login: React.FC = (): React.ReactElement => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [commit, isInFlight] = useMutation<LoginMutation>(graphql`
        mutation LoginMutation($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                authToken
            }
        }
    `);

    const mutationConfig = {
        variables: {
            username: username,
            password: password
        },
        onCompleted: (response: LoginMutationResponse): void => {
            console.log("Data:", response.login.authToken);
        },
        onError: (error: Error): void => console.log(error)
    };

    return (
        <StyledLogin>
            <Input
                name="username"
                label="Username"
                value={username}
                onChange={({ value }): void => setUsername(value)}
            />
            <Input
                name="password"
                type="password"
                label="Password"
                value={password}
                onChange={({ value }): void => setPassword(value)}
            />
            <Button disabled={isInFlight} onClick={(): Disposable => commit(mutationConfig)}>
                Login
            </Button>
        </StyledLogin>
    );
};

export default Login;
