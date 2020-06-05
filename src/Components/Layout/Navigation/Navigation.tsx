import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Person } from "@material-ui/icons";
import { useQuery } from "@apollo/client";
import { CurrentUser } from "../../../GraphQL/__generated__/CurrentUser";
import { CURRENT_USER_QUERY } from "../../../GraphQL/Queries";

const NavigationLinks = React.lazy(() => import("./NavigationLinks"));
const NavigationUser = React.lazy(() => import("./NavigationUser"));
const NavigationBox = React.lazy(() => import("./NavigationBox"));

const StyledNavigation = styled.nav<{ showPageNav: boolean }>`
    position: relative;

    .navButtons {
        display: flex;
    }

    .navButton {
        @media only screen and (min-width: 400px) {
            position: relative;
        }

        &:first-of-type {
            margin-right: 15px;
        }

        &--custom {
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
                    background-color: ${(props): string =>
                        props.showPageNav ? "transparent" : props.theme.colors.primary};

                    &::before,
                    &::after {
                        content: "";
                        position: absolute;
                        transition: transform 0.3s linear;
                        background-color: ${(props): string => props.theme.colors.primary};
                    }

                    &::before {
                        transform: rotate(${(props): number => (props.showPageNav ? 135 : 0)}deg);
                        top: ${(props): number => (props.showPageNav ? 0 : -8)}px;
                    }

                    &::after {
                        transform: rotate(${(props): number => (props.showPageNav ? -135 : 0)}deg);
                        top: ${(props): number => (props.showPageNav ? 0 : 8)}px;
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
                            props.showPageNav ? "transparent" : props.theme.colors.tertiary};
                    }

                    span::before,
                    span::after {
                        background-color: ${(props): string => props.theme.colors.tertiary};
                    }

                    span::before {
                        top: ${(props): string => (!props.showPageNav ? "-9px;" : "0")};
                    }

                    span::after {
                        top: ${(props): string => (!props.showPageNav ? "9px;" : "0")};
                    }
                }
            }
        }
    }
`;

type Props = {
    className?: string;
};

const Navigation: React.FC = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const [showPageNav, setShowPageNav] = useState(false);
    const [showUserNav, setShowUserNav] = useState(false);
    const pageNavRef = useRef<HTMLDivElement>(null);
    const userNavRef = useRef<HTMLDivElement>(null);
    const { data } = useQuery<CurrentUser>(CURRENT_USER_QUERY);

    const items = [
        { name: "Home", href: "/" },
        { name: "All Establishments", href: "/establishments" },
        { name: "Contact", href: "/contact" }
    ];

    if (data?.user) {
        items.splice(2, 0, { name: "Your Wishlist", href: "/wishlist" });
    }

    return (
        <StyledNavigation showPageNav={showPageNav} className={props.className}>
            <div className="navButtons">
                <div className="navButton" ref={userNavRef}>
                    <button
                        className="navButton--custom"
                        onClick={(elm): void => {
                            elm.currentTarget.blur();
                            setShowUserNav(!showUserNav);
                        }}
                    >
                        <Person />
                    </button>
                    <NavigationBox show={showUserNav} setShow={setShowUserNav} navRef={userNavRef} navBoxNumber={2}>
                        <NavigationUser show={showUserNav} setShow={setShowUserNav} />
                    </NavigationBox>
                </div>
                <div className="navButton" ref={pageNavRef}>
                    <button
                        className="navButton--custom"
                        onClick={(elm): void => {
                            elm.currentTarget.blur();
                            setShowPageNav(!showPageNav);
                        }}
                    >
                        <div className="navHamburgerIcon">
                            <span />
                        </div>
                    </button>
                    <NavigationBox show={showPageNav} setShow={setShowPageNav} navRef={pageNavRef} navBoxNumber={1}>
                        <NavigationLinks items={items} show={showPageNav} setShow={setShowPageNav} />
                    </NavigationBox>
                </div>
            </div>
        </StyledNavigation>
    );
};

export default Navigation;
