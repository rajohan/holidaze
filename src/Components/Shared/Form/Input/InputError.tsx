import React from "react";
import styled from "styled-components";

const InputErrorStyled = styled.div`
    background-color: ${(props): string => props.theme.colors.error};
    color: ${(props): string => props.theme.colors.white};
    padding: 10px;
    border-radius: 5px;
    margin: 2px 0 0 0;
    font-size: 15px;
    position: relative;
    width: 100%;
    animation: fadeIn 1s;

    &::before {
        content: "";
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid ${(props): string => props.theme.colors.error};
        position: absolute;
        top: -8px;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

type Props = {
    children: React.ReactNode;
};

const InputError: React.FC<Props> = ({ children }: React.PropsWithChildren<Props>): React.ReactElement => {
    return <InputErrorStyled>{children}</InputErrorStyled>;
};

export default InputError;
