import React from "react";
import styled from "styled-components";

const StyledHeading = styled.h1<{ as: string }>`
    text-align: center;
    text-transform: capitalize;
    font-size: ${(props): string => (props.as === "h1" ? "24px" : props.as === "h2" ? "18px" : "16px")};
    font-weight: 700;
    color: ${(props): string => (props.as === "h2" ? props.theme.colors.tertiaryLight : props.theme.colors.secondary)};
    margin-bottom: ${(props): string => (props.as === "h1" ? "8px" : "0")};
    letter-spacing: ${(props): string => (props.as === "h1" ? "4px" : "2px")};
    filter: ${(props): string => props.theme.dropShadows.small};

    @media only screen and (min-width: 650px) {
        font-size: ${(props): string => (props.as === "h1" ? "28px" : props.as === "h2" ? "18px" : "16px")};
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
