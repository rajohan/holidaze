import React from "react";
import styled from "styled-components";
import { useField } from "formik";

const StyledCheckbox = styled.div<{ checked: boolean }>`
    display: flex;
    align-items: center;
    user-select: none;
    padding-left: 12px;

    svg {
        width: 24px;
        height: 24px;
        margin-right: 5px;
        fill: ${(props): string => props.theme.colors.primary};
    }

    label {
        position: relative;
        background-color: ${(props): string => props.theme.colors.white};
        margin-left: 5px;
        padding: 10px;
        border-radius: 2px;
        border: 2px solid ${(props): string => props.theme.colors.tertiary};
        cursor: pointer;

        input {
            position: absolute;
            top: 0;
            right: 0;
            width: 0;
            height: 0;
            opacity: 0;

            &:focus + span,
            &:hover + span {
                background-color: ${(props): string =>
                    props.checked ? props.theme.colors.tertiary : props.theme.colors.secondaryDark};
            }
        }

        span {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: ${(props): string => (props.checked ? props.theme.colors.tertiary : "transparent")};
            transition: background-color 0.2s;

            &::after {
                content: "";
                position: absolute;
                display: ${(props): string => (props.checked ? "block" : "none")};
                left: 50%;
                top: calc(50% - 2px);
                transform: translate(-50%, -50%) rotate(45deg);
                width: 8px;
                height: 12px;
                border: solid ${(props): string => props.theme.colors.white};
                border-width: 0 3px 3px 0;
            }
        }
    }
`;

type Props = {
    name: string;
    label?: string;
    children?: React.ReactNode;
    className?: string;
};

const Checkbox: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { name, label, children, className, ...rest } = props;

    const [field, meta] = useField({ ...props, type: "checkbox" });

    return (
        <StyledCheckbox className={className} checked={meta.value}>
            {children}
            {label && label + ":"}
            <label htmlFor={name}>
                <input {...field} {...rest} id={name} name={name} type="checkbox" />
                <span />
            </label>
        </StyledCheckbox>
    );
};

export default Checkbox;
