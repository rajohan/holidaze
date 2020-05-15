import React from "react";
import styled from "styled-components";

import Container400 from "./Container500";

const StyledContainer1000 = styled(Container400)`
    max-width: 1000px;
`;

type Props = {
    children: React.ReactNode;
    className?: string;
};

const Container1000: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { children, className } = props;

    return <StyledContainer1000 className={className}>{children}</StyledContainer1000>;
};

export default Container1000;
