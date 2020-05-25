import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavigationLinks = styled.ul<{ show: boolean }>`
    width: 100%;

    li {
        margin: ${(props): string => (props.show ? "10px" : "0 10px")};

        a {
            display: block;
            font-weight: 700;
            cursor: pointer;
            outline: none;
            background-color: ${(props): string => props.theme.colors.tertiary};
            color: ${(props): string => (props.show ? props.theme.colors.secondary : "transparent")};
            padding: ${(props): string => (props.show ? "10px" : "0 10px")};
            line-height: ${(props): string => (props.show ? "inherit" : "0")};
            transition: padding 0.3s, line-height 0.3s, color 0.2s, background-color 0.2s;
            transition-timing-function: linear;

            &:active,
            &:focus,
            &:hover {
                background-color: ${(props): string => props.theme.colors.tertiaryDark};
                color: ${(props): string => props.theme.colors.primary};
            }

            &.navActive {
                background-color: ${(props): string => props.theme.colors.tertiaryDark};

                &::before {
                    content: "\u27A4";
                    margin-right: 5px;
                }
            }
        }
    }
`;

type Props = {
    items: { name: string; href: string }[];
    setShow: (show: boolean) => void;
    show: boolean;
};

const NavigationLinks: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { items, setShow, show } = props;

    return (
        <StyledNavigationLinks show={show}>
            {items.map((item) => (
                <li key={`nav-${item.name}`}>
                    <NavLink
                        to={item.href}
                        exact={item.href === "/"}
                        activeClassName="navActive"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>): void => {
                            e.currentTarget.blur();
                            setShow(false);
                        }}
                    >
                        {item.name}
                    </NavLink>
                </li>
            ))}
        </StyledNavigationLinks>
    );
};

export default NavigationLinks;
