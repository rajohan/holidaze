import React from "react";
import styled from "styled-components";

import Link from "../Shared/Link";

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    width: 100%;
    background-color: ${(props): string => props.theme.colors.tertiary};
    color: ${(props): string => props.theme.colors.secondary};

    small {
        font-size: 14px;

        &:first-of-type {
            margin-bottom: 5px;
        }
    }
`;

const Footer: React.FC = (): React.ReactElement => {
    return (
        <StyledFooter>
            <small>Website created by Raymond Johannessen</small>
            <small>
                Copyright &copy; 2020{" "}
                <Link color="light" href="/">
                    Holidaze.com
                </Link>
            </small>
        </StyledFooter>
    );
};

export default Footer;
