import React, { PropsWithChildren } from "react";
import Link from "next/link";
import styled from "styled-components";

type Props = {
    href?: string;
    external?: boolean;
    target?: "_blank";
    onClick?: () => void;
};

const StyledButton = styled.button`
    display: inline-block;
    background-color: ${(props): string => props.theme.colors.tertiary};
    color: ${(props): string => props.theme.colors.text};
    padding: 12px 30px;
    border-radius: 3px;
    outline: none;
    text-transform: capitalize;
    font-size: 16px;
    letter-spacing: 0.5px;
    font-weight: 700;
    transition: background-color 0.2s;
    user-select: none;
    text-align: center;

    @media only screen and (min-width: 400px) {
        font-size: 15px;
    }

    &:focus,
    &:hover {
        background-color: ${(props): string => props.theme.colors.tertiaryDark};
        transform: translateY(-3px);
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: ${(props): string => props.theme.boxShadows.button};
    }

    &:active {
        transform: translateY(0);
        box-shadow: none;
    }
`;

const Button: React.FC<Props> = (props: PropsWithChildren<Props>): React.ReactElement => {
    const { href, external = false, target, onClick, children } = props;

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
            >
                {children}
            </StyledButton>
        );
    } else if (href) {
        return (
            <Link href={href} passHref>
                <StyledButton as="a" onClick={handleOnClick}>
                    {children}
                </StyledButton>
            </Link>
        );
    } else {
        return <StyledButton onClick={handleOnClick}>{children}</StyledButton>;
    }
};

export default Button;
