import React from "react";
import styled from "styled-components";

const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    margin: 0 15px;

    @media only screen and (min-width: 850px) {
        margin: 0 30px;
    }
`;

type Props = {
    children: React.ReactNode;
};

const Main: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    return <StyledMain>{props.children}</StyledMain>;
};

export default Main;
