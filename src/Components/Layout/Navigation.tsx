import React, { useState } from "react";
import styled from "styled-components";
import { Person } from "@material-ui/icons";

const StyledNavigation = styled.nav<{ expanded: boolean }>`
    position: absolute;
    top: -2px;
    right: 0;

    .navButtons {
        display: flex;
    }

    button {
        display: flex;
        background-color: ${(props): string => props.theme.colors.secondary60};
        padding: 7px 10px;
        border-radius: 2px;
        outline: none;

        svg {
            width: 24px;
            height: 24px;
            fill: ${(props): string => props.theme.colors.primary};
        }

        .navHamburgerIcon {
            cursor: pointer;
            display: flex;
            align-items: center;
            width: 24px;
            height: 24px;
            outline: none;

            span,
            span::before,
            span::after {
                display: inline-block;
                width: 24px;
                height: 2px;
                left: 0;
            }

            span {
                position: relative;
                background-color: ${(props): string => (props.expanded ? "transparent" : props.theme.colors.primary)};

                &::before,
                &::after {
                    content: "";
                    position: absolute;
                    transition: transform 0.3s linear;
                    background-color: ${(props): string => props.theme.colors.primary};
                }

                &::before {
                    transform: rotate(${(props): number => (props.expanded ? 135 : 0)}deg);
                    top: ${(props): number => (props.expanded ? 0 : -8)}px;
                }

                &::after {
                    transform: rotate(${(props): number => (props.expanded ? -135 : 0)}deg);
                    top: ${(props): number => (props.expanded ? 0 : 8)}px;
                }
            }
        }

        &:focus,
        &:hover {
            svg {
                fill: ${(props): string => props.theme.colors.tertiary};
            }

            .navHamburgerIcon {
                span {
                    background-color: ${(props): string =>
                        props.expanded ? "transparent" : props.theme.colors.tertiary};
                }

                span::before,
                span::after {
                    background-color: ${(props): string => props.theme.colors.tertiary};
                }

                span::before {
                    top: ${(props): string => (!props.expanded ? "-9px;" : "0")};
                }

                span::after {
                    top: ${(props): string => (!props.expanded ? "9px;" : "0")};
                }
            }
        }
    }

    button:first-of-type {
        margin-right: 15px;
    }
`;

const Navigation: React.FC = (): React.ReactElement => {
    const [expanded, setExpanded] = useState(false);

    return (
        <StyledNavigation expanded={expanded}>
            <div className="navButtons">
                <button onClick={(elm): void => elm.currentTarget.blur()}>
                    <Person />
                </button>
                <button
                    onClick={(elm): void => {
                        elm.currentTarget.blur();
                        setExpanded(!expanded);
                    }}
                >
                    <div className="navHamburgerIcon">
                        <span />
                    </div>
                </button>
            </div>
        </StyledNavigation>
    );
};

export default Navigation;
