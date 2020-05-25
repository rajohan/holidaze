import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/images/logo/logoLight.svg";
import Navigation from "./Navigation/Navigation";

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props): string => props.theme.colors.tertiary};
    padding: 10px;
    position: relative;
    margin-bottom: 30px;

    @media only screen and (min-width: 400px) {
        padding: 20px;
    }

    .logo {
        width: 143px;
        height: auto;

        @media only screen and (min-width: 400px) {
            width: 200px;
        }
    }
`;

const Header: React.FC = (): React.ReactElement => {
    return (
        <StyledHeader>
            <Link to="/">
                <Logo className="logo" title="Holidaze" />
            </Link>
            <Navigation />
        </StyledHeader>
    );
};

export default Header;
