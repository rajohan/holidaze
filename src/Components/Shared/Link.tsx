import React from "react";
import { Link as ReactLink } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled.a`
    display: inline-block;
    color: ${(props): string => (props.color === "dark" ? props.theme.colors.primary : props.theme.colors.secondary)};
    outline: none;
    position: relative;
    font-weight: 400;
    font-style: italic;
    white-space: nowrap;

    &::after {
        right: 0;
    }

    &::before,
    &::after {
        content: "";
        border-bottom: 1px solid
            ${(props): string => (props.color === "dark" ? props.theme.colors.tertiary : props.theme.colors.primary)};
        position: absolute;
        bottom: 0;
        width: 0;
        transition: width 0.2s linear;
    }

    &:focus,
    &:hover {
        color: ${(props): string =>
            props.color === "dark" ? props.theme.colors.tertiary : props.theme.colors.primary};
        transition: color 0.2s, transform 0.2s;
        transform: translateY(-2px);

        &::before,
        &::after {
            width: 50%;
        }
    }

    &:active {
        transform: translateY(0);
    }
`;

type Props = {
    href?: string;
    className?: string;
    external?: boolean;
    target?: "_blank";
    onClick?: (e: React.MouseEvent) => void;
    color?: "dark" | "light";
};

const Link: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { href, external = false, color = "dark", target, children, className, onClick } = props;

    if (!href) {
        return (
            <StyledLink onClick={onClick} className={className} color={color}>
                {children}
            </StyledLink>
        );
    }

    return external ? (
        <StyledLink
            href={href}
            target={target}
            rel={target && "noopener noreferrer"}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>): void => {
                e.currentTarget.blur();
                onClick && onClick(e);
            }}
            className={className}
            color={color}
        >
            {children}
        </StyledLink>
    ) : (
        <StyledLink
            as={ReactLink}
            to={href}
            className={className}
            color={color}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>): void => {
                e.currentTarget.blur();
                onClick && onClick(e);
            }}
        >
            {children}
        </StyledLink>
    );
};

export default Link;
