import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled.button`
    display: inline-block;
    background-color: ${(props): string => props.theme.colors.tertiary};
    color: ${(props): string => props.theme.colors.secondary};
    padding: 9px 15px;
    border-radius: 2px;
    outline: none;
    text-transform: capitalize;
    font-size: 15px;
    letter-spacing: 0.5px;
    font-weight: 700;
    transition: background-color 0.2s;
    user-select: none;
    text-align: center;
    min-width: 150px;

    @media only screen and (min-width: 400px) {
        font-size: 16px;
    }

    &:disabled {
        pointer-events: none;
        opacity: 0.4;
    }

    &:focus,
    &:hover {
        background-color: ${(props): string => props.theme.colors.tertiaryDark};
        transform: translateY(-2px);
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: ${(props): string => props.theme.boxShadows.button};
    }

    &:active {
        transform: translateY(0);
        box-shadow: none;
    }
`;

type Props = {
    href?: string;
    external?: boolean;
    target?: "_blank";
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
};

const Button: React.FC<Props> = (props: PropsWithChildren<Props>): React.ReactElement => {
    const { href, external = false, disabled = false, target, onClick, children, className } = props;

    const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>): void => {
        e.currentTarget.blur();
        onClick && onClick();
    };

    if (external && href) {
        return (
            <StyledButton
                as="a"
                href={href}
                target={target}
                rel={target && "noopener noreferrer"}
                onClick={handleOnClick}
                className={className}
            >
                {children}
            </StyledButton>
        );
    } else if (href) {
        return (
            <StyledButton as={Link} to={href} onClick={handleOnClick} className={className}>
                {children}
            </StyledButton>
        );
    } else {
        return (
            <StyledButton onClick={handleOnClick} disabled={disabled} className={className}>
                {children}
            </StyledButton>
        );
    }
};

export default Button;
