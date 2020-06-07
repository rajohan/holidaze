import React, { PropsWithChildren } from "react";
import styled from "styled-components";

import Link from "./Link";

const StyledBreadcrumb = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 16px;
    margin-bottom: 20px;
    width: 100%;
    max-width: 500px;
    text-transform: capitalize;
    background-color: ${(props): string => props.theme.colors.secondary};
    padding: 20px;
    border-radius: 2px;
    align-items: center;

    @media only screen and (min-width: 500px) {
        flex-direction: row;
    }

    @media only screen and (min-width: 900px) {
        max-width: 100%;
    }

    @media only screen and (min-width: 950px) {
        max-width: 890px;
    }

    @media only screen and (min-width: 1050px) {
        max-width: 100%;
    }

    span {
        margin: 0 8px;
        transform: rotate(90deg);

        @media only screen and (min-width: 500px) {
            transform: rotate(0deg);
        }
    }
`;

type Props = {
    append?: string;
    paths: { to: string; text: string }[];
};

const Breadcrumb: React.FC<Props> = ({ paths, append }: PropsWithChildren<Props>): React.ReactElement => {
    const renderBreadcrumb = (): React.ReactNode => {
        return paths.map((path, index) => {
            return index === 0 ? (
                <Link href={path.to} key={`path-${index}`}>
                    {path.text}
                </Link>
            ) : (
                <React.Fragment key={`path-${index}`}>
                    <span>&#x27A4;</span>
                    <Link href={path.to} key={`path-${index}`}>
                        {path.text}
                    </Link>
                </React.Fragment>
            );
        });
    };

    return (
        <StyledBreadcrumb>
            {renderBreadcrumb()}
            {append && (
                <React.Fragment>
                    <span>&#x27A4;</span>
                    {append}
                </React.Fragment>
            )}
        </StyledBreadcrumb>
    );
};

export default Breadcrumb;
