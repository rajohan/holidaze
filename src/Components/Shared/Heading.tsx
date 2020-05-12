import React from "react";
import styled from "styled-components";

const StyledHeading = styled.h1<{ as: string }>`
    text-align: center;
    text-transform: ${(props): string => (props.as === "h1" ? "uppercase" : "capitalize")};
    font-size: ${(props): string => (props.as === "h1" ? "24px" : "18px")};
    color: ${(props): string => (props.as === "h1" ? props.theme.colors.text : props.theme.colors.tertiary)};
    letter-spacing: ${(props): string => (props.as === "h1" ? "4px" : "2px")};
    margin-bottom: ${(props): string => (props.as === "h1" ? "8px" : "0")};
    filter: ${(props): string => props.theme.dropShadows.small};

    @media only screen and (min-width: 400px) {
        font-size: ${(props): string => (props.as === "h1" ? "28px" : "18px")};
        letter-spacing: ${(props): string => (props.as === "h1" ? "6px" : "2px")};
    }
`;

type Props = {
    size: "h1" | "h2" | "h3";
    children: React.ReactNode;
    className?: string;
};

const Heading: React.FC<Props> = ({
    size,
    children,
    className
}: React.PropsWithChildren<Props>): React.ReactElement => {
    return (
        <StyledHeading as={size} className={className}>
            {children}
        </StyledHeading>
    );
};

export default Heading;
