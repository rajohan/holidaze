import React from "react";
import styled from "styled-components";

const StyledAdminNav = styled.nav`
    margin: 30px 0 0 0;
    width: 100%;
    user-select: none;

    ul {
        display: flex;
        flex-direction: column;
        align-items: center;

        @media screen and (min-width: 450px) {
            flex-direction: row;
            justify-content: center;
        }

        li {
            background-color: ${(props): string => props.theme.colors.tertiary};
            color: ${(props): string => props.theme.colors.secondary};
            padding: 10px;
            width: 100%;
            max-width: 200px;
            font-weight: 700;
            text-align: center;
            text-transform: capitalize;
            transition: background-color 0.3s;

            &:not(:last-of-type) {
                border-bottom: 1px solid ${(props): string => props.theme.colors.primary};

                @media screen and (min-width: 450px) {
                    border-bottom: none;
                    border-right: 1px solid ${(props): string => props.theme.colors.primary};
                }
            }

            &:first-of-type {
                border-top-left-radius: 2px;
                border-top-right-radius: 2px;

                @media screen and (min-width: 450px) {
                    border-top-right-radius: 0;
                    border-bottom-left-radius: 2px;
                }
            }

            &:last-of-type {
                border-bottom-left-radius: 2px;
                border-bottom-right-radius: 2px;

                @media screen and (min-width: 450px) {
                    border-top-right-radius: 2px;
                    border-bottom-left-radius: 0;
                }
            }

            &:hover {
                background-color: ${(props): string => props.theme.colors.tertiaryDark};
                cursor: pointer;
            }

            &.active {
                color: ${(props): string => props.theme.colors.primary};
                background-color: ${(props): string => props.theme.colors.secondaryDark};
                cursor: default;
            }
        }
    }
`;

type Props = {
    active: string;
    onClick: (active: string) => void;
    items: string[];
};

const AdminNav: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { active, onClick, items } = props;

    return (
        <StyledAdminNav>
            <ul>
                {items.map((item, index) => (
                    <li
                        key={`adminNavItem-${item}`}
                        className={active === items[index] ? "active" : ""}
                        onClick={(): void => onClick(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </StyledAdminNav>
    );
};

export default AdminNav;
