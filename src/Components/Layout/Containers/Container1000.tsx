import React from "react";
import styled from "styled-components";

import Container400 from "./Container400";

const StyledContainer800 = styled(Container400)`
    max-width: 1020px;
`;

type Props = {
    children: React.ReactNode;
    className?: string;
};

const Container800: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { children, className } = props;

    return <StyledContainer800 className={className}>{children}</StyledContainer800>;
};

export default Container800;
