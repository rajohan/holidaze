import React from "react";
import styled from "styled-components";

const StyledContainer400 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    width: 100%;
    background-color: transparent;

    p {
        padding: 0 10px;

        @media only screen and (min-width: 650px) {
            padding: 0 30px;
        }

        &:first-of-type {
            margin-top: 30px;
        }

        &:not(:last-of-type) {
            margin-bottom: 30px;
        }
    }
`;

type Props = {
    children: React.ReactNode;
    className?: string;
};

const Container400: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { children, className } = props;

    return <StyledContainer400 className={className}>{children}</StyledContainer400>;
};

export default Container400;
