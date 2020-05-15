import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavigationBox = styled.ul<{ show: boolean }>`
    background-color: ${(props): string => props.theme.colors.secondary};
    filter: ${(props): string => props.theme.dropShadows.small};
    position: absolute;
    right: 0;
    width: 250px;
    z-index: 1000;
    margin-top: 20px;
    padding: ${(props): string => (props.show ? "5px" : "0 5px")};
    visibility: ${(props): string => (props.show ? "visible" : "hidden")};
    opacity: ${(props): string => (props.show ? "1" : "0")};
    transition: background-color 0.3s, margin 0.3s, padding 0.3s, visibility 0.3s, opacity 0.3s;
    transition-timing-function: linear;

    @media only screen and (min-width: 350px) {
        width: 300px;
    }

    li {
        margin: ${(props): string => (props.show ? "10px" : "0 10px")};

        &::before {
            content: "";
            border-left: 12px solid transparent;
            border-right: 12px solid transparent;
            border-bottom: 14px solid ${(props): string => props.theme.colors.secondary};
            position: absolute;
            top: -14px;
            right: 10px;
        }

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
    show: boolean;
    setShow: (show: boolean) => void;
    navRef: React.RefObject<HTMLDivElement>;
};

const NavigationBox: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { items, show, setShow, navRef } = props;

    // Close navigation menu on mouse click outside the component
    useEffect(() => {
        const handleMouseDownOutsideComponent = (event: MouseEvent): void => {
            if (navRef.current) {
                !navRef.current.contains(event.target as Node) && setShow(false);
            }
        };

        document.addEventListener("mousedown", handleMouseDownOutsideComponent);

        return (): void => {
            document.removeEventListener("mousedown", handleMouseDownOutsideComponent);
        };
    }, [navRef, setShow]);

    return (
        <StyledNavigationBox show={show}>
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
        </StyledNavigationBox>
    );
};

export default NavigationBox;
