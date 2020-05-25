import React from "react";
import styled from "styled-components";
import { Table as ReactTable } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const StyledTable = styled(ReactTable)`
    border-radius: 2px;
    border-collapse: collapse;
    border-style: hidden;
    overflow: hidden;
    margin: 30px 0;

    th,
    td.pivoted {
        border: 1px solid ${(props): string => props.theme.colors.primary};
        text-align: left;
        padding: 5px;
    }

    th {
        background-color: ${(props): string => props.theme.colors.tertiary};
        color: ${(props): string => props.theme.colors.secondary};
    }

    td.pivoted {
        background-color: ${(props): string => props.theme.colors.secondary};
    }

    @media screen and (max-width: 40em) {
        thead tr {
            border-bottom: 2px solid transparent;
        }

        tbody tr {
            border: 1px solid transparent;
        }
    }
`;

type Props = {
    children: React.ReactNode;
};

const Table: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    return <StyledTable>{props.children}</StyledTable>;
};

export default Table;
