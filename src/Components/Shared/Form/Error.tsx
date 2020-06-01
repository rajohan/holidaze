import React from "react";
import styled from "styled-components";

const StyledError = styled.div`
    background-color: ${(props): string => props.theme.colors.error};
    color: ${(props): string => props.theme.colors.white};
    padding: 15px;
    border-radius: 5px;
    font-size: 16px;
    width: 100%;
    text-align: center;
    animation: fadeIn 1s;

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
    className?: string;
};

const Error: React.FC<Props> = ({ children, className }: React.PropsWithChildren<Props>): React.ReactElement => {
    return <StyledError className={className}>{children}</StyledError>;
};

export default Error;
