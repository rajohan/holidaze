import React from "react";
import styled from "styled-components";

const StyledContainer400 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    width: 100%;
    background-color: transparent;
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
