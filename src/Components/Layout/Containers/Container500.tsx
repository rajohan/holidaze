import React from "react";
import styled from "styled-components";

const StyledContainer500 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 500px;
    width: 100%;
    background-color: transparent;
`;

type Props = {
    children: React.ReactNode;
    className?: string;
};

const Container500: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { children, className } = props;

    return <StyledContainer500 className={className}>{children}</StyledContainer500>;
};

export default Container500;
