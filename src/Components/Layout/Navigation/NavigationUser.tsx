import React from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { Person, Lock } from "@material-ui/icons";

import { LOCAL_STORAGE_AUTH_TOKEN } from "../../../constants";
import { CurrentUser } from "../../../GraphQL/__generated__/CurrentUser";
import { Login, LoginVariables } from "../../../GraphQL/__generated__/Login";
import { Logout } from "../../../GraphQL/__generated__/Logout";
import { CURRENT_USER_QUERY } from "../../../GraphQL/Queries";
import { LOGIN_MUTATION, LOGOUT_MUTATION } from "../../../GraphQL/Mutations";
import NavigationLinks from "./NavigationLinks";
import Form from "../../Shared/Form/Form";
import Input from "../../Shared/Form/Input/Input";
import Button from "../../Shared/Form/Button";
import Link from "../../Shared/Link";

const StyledNavigationUser = styled.div<{ show: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${(props): string => props.theme.colors.primary};

    .header {
        font-weight: 700;
        text-align: center;
        font-size: 17px;
        margin: ${(props): string => (props.show ? "10px" : "0 10px")};
        line-height: ${(props): string => (props.show ? "inherit" : "0")};
        transition: margin 0.3s, line-height 0.3s;
        transition-timing-function: linear;
    }

    .signUpForgotPassword {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        padding-bottom: ${(props): string => (props.show ? "10px" : "0")};
        transition: padding-bottom 0.3s;
        transition-timing-function: linear;
    }

    .forgotPassword {
        padding-top: ${(props): string => (props.show ? "20px" : "0")};
        transition: padding-top 0.3s;
        transition-timing-function: linear;
    }
`;

const StyledInput = styled(Input)<{ show: "true" | "false" }>`
    margin: ${(props): string => (props.show === "true" ? "10px 10px 0 10px" : "0 10px")};
    transition: margin 0.3s;
    transition-timing-function: linear;

    input {
        height: ${(props): string => (props.show === "true" ? "50px" : "0")};
        line-height: ${(props): string => (props.show === "true" ? "inherit" : "0")};
        transition: line-height 0.3s, height 0.3s;
        transition-timing-function: linear;
    }
`;

const StyledButton = styled(Button)<{ show: "true" | "false" }>`
    align-self: stretch;
    margin: ${(props): string => (props.show ? "10px 10px 0 10px" : "0 10px")};
    padding: ${(props): string => (props.show === "true" ? "9px 15px" : "0 15px")};
    line-height: ${(props): string => (props.show ? "inherit" : "0")};
    transition: margin 0.3s, padding 0.3s, background-color 0.2s, line-height 0.3s;
    transition-timing-function: linear;

    &:hover {
        box-shadow: none;
        transform: none;
    }

    &.logoutButton {
        margin: ${(props): string => (props.show ? "0 10px 10px 10px" : "0 10px")};
        text-align: left;
    }
`;

type Props = {
    show: boolean;
    setShow: (show: boolean) => void;
};

const NavigationUser: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { show, setShow } = props;
    const history = useHistory();
    const { data, client } = useQuery<CurrentUser>(CURRENT_USER_QUERY);
    const [login, { loading }] = useMutation<Login, LoginVariables>(LOGIN_MUTATION);
    const [logout, { loading: loading2 }] = useMutation<Logout>(LOGOUT_MUTATION);

    const handleLogout = async (): Promise<void> => {
        await logout();
        localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN);
        await client.resetStore();
        history.push("/");
    };

    const handleLogin = async (values: LoginVariables): Promise<void> => {
        try {
            const response = await login({ variables: { username: values.username, password: values.password } });

            if (response.data) {
                await client.resetStore();

                client.writeQuery({
                    query: CURRENT_USER_QUERY,
                    data: { user: response.data.login.user }
                });

                localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN, response.data.login.authToken);
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (!data || !data.user) {
        return (
            <StyledNavigationUser show={show}>
                <Formik initialValues={{ username: "", password: "" }} onSubmit={(values) => handleLogin(values)}>
                    <Form>
                        <p className="header">Login</p>
                        <StyledInput show={show ? "true" : "false"} name="username" label="Username / Email">
                            <Person />
                        </StyledInput>
                        <StyledInput show={show ? "true" : "false"} name="password" type="password" label="Password">
                            <Lock />
                        </StyledInput>
                        <StyledButton show={show ? "true" : "false"} disabled={loading}>
                            Login
                        </StyledButton>
                    </Form>
                </Formik>
                <div className="signUpForgotPassword">
                    <StyledButton show={show ? "true" : "false"} href="/signUp" onClick={(): void => setShow(false)}>
                        Sign Up
                    </StyledButton>
                    <Link className="forgotPassword" href="/forgotPassword" onClick={(): void => setShow(false)}>
                        Forgot password
                    </Link>
                </div>
            </StyledNavigationUser>
        );
    }

    const items = [{ name: "Profile", href: "/profile" }];

    if (data.user.accessLevel > 0) {
        items.push({ name: "Admin", href: "/admin" });
    }

    return (
        <StyledNavigationUser show={show}>
            <p className="header">Signed in as {data.user.username}</p>
            <NavigationLinks items={items} show={show} setShow={setShow} />
            <StyledButton
                className="logoutButton"
                show={show ? "true" : "false"}
                onClick={handleLogout}
                disabled={loading2}
            >
                Logout
            </StyledButton>
        </StyledNavigationUser>
    );
};

export default NavigationUser;
