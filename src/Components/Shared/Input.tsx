import React from "react";
import styled from "styled-components";

const StyledInput = styled.div<{ value: string; size: "small" | "big" }>`
    position: relative;
    padding: ${(props): string => (props.size === "big" ? "7px" : "2px")};
    background-color: ${(props): string =>
        props.size === "big" ? props.theme.colors.secondary60 : props.theme.colors.tertiary};
    border-radius: 2px;

    @media only screen and (min-width: 575px) {
        padding: ${(props): string => (props.size === "big" ? "10px" : "2px")};
    }

    label {
        display: flex;
        align-items: center;
        position: absolute;
        user-select: none;
        cursor: text;
        top: ${(props): string => (props.size === "big" ? "3px" : "-2px")};
        left: ${(props): string => (props.size === "big" ? "17px" : "12px")};
        color: ${(props): string => props.theme.colors.primary};
        font-size: ${(props): string => (props.value ? "13px" : "inherit")};
        font-weight: ${(props): number => (props.value ? 700 : 400)};
        transform: translateY(${(props): string => (props.value ? "6px" : "calc(50% + 5px)")});
        transition: transform 0.2s, font-size 0.2s, color 0.2s;

        svg {
            width: ${(props): string => (props.value ? "18px" : "24px")};
            height: ${(props): string => (props.value ? "18px" : "24px")};
            margin-right: 5px;
            fill: ${(props): string => props.theme.colors.primary};
        }

        @media only screen and (min-width: 575px) {
            top: ${(props): string => (props.size === "big" ? "6px" : "-2px")};
            left: ${(props): string => (props.size === "big" ? "20px" : "12px")};
        }
    }

    input,
    textarea {
        background-color: ${(props): string => props.theme.colors.white};
        color: ${(props): string => props.theme.colors.primary};
        padding: 0 10px;
        border-radius: 2px;
        outline: none;
        width: 100%;

        &:focus + label {
            transform: translateY(6px);
            font-size: 13px;
            font-weight: 700;
            color: ${(props): string => props.theme.colors.tertiary};

            svg {
                width: 18px;
                height: 18px;
                fill: ${(props): string => props.theme.colors.tertiary};
            }
        }
    }

    input {
        height: 50px;
        padding-top: ${(props): string => (props.value ? "15px" : "0")};

        &:focus {
            padding-top: 15px;
        }
    }

    textarea {
        min-height: 170px;
        padding-top: ${(props): string => (props.value ? "25px" : "0")};

        &:focus {
            padding-top: 25px;
        }
    }

    // Remove autofill color in chrome and edge
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        -webkit-text-fill-color: ${(props): string => props.theme.colors.text};
        box-shadow: 0 0 0 30px ${(props): string => props.theme.colors.white} inset;
        caret-color: ${(props): string => props.theme.colors.text};
        padding-top: 15px;

        + label {
            transform: translateY(4px);
            font-size: 13px;
            font-weight: 700;
            color: ${(props): string => props.theme.colors.tertiary};
        }
    }
`;

export type Props = {
    name: string;
    value?: string;
    type?: "text" | "number" | "email" | "tel" | "password" | "search" | "url" | "textarea";
    size?: "small" | "big";
    label?: string;
    onChange?: ({ name, value }: { name: string; value: string }) => void;
    onBlur?: ({ name, value }: { name: string; value: string }) => void;
    className?: string;
    children?: React.ReactNode;
};

const Input: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const {
        name = "",
        type = "text",
        size = "small",
        value = "",
        label,
        onChange,
        onBlur,
        className,
        children
    } = props;

    return (
        <StyledInput value={value} className={className} size={size}>
            {type === "textarea" ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={(e): void => onChange && onChange({ name, value: e.target.value })}
                    onBlur={(): void => onBlur && onBlur({ name, value })}
                />
            ) : (
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={(e): void => onChange && onChange({ name, value: e.target.value })}
                    onBlur={(): void => onBlur && onBlur({ name, value: value })}
                />
            )}
            {label && (
                <label htmlFor={name}>
                    {children} {label}
                </label>
            )}
        </StyledInput>
    );
};

export default Input;
