import React from "react";
import styled from "styled-components";
import { Table as ReactTable } from "react-super-responsive-table";

const StyledTable = styled(ReactTable)<{ breakpoint: number }>`
    margin: 30px 0;
    width: 100%;

    table,
    thead,
    th,
    td,
    tr {
        display: block;
    }

    tbody {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
        justify-content: center;
        grid-gap: 10px;
    }

    thead tr {
        position: absolute;
        top: -9999px;
        left: -9999px;
    }

    .pivoted {
        border: none;
        position: relative;
        padding: 0 10px;
        background-color: ${(props): string => props.theme.colors.secondary};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        a {
            display: inline;
            color: ${(props): string => props.theme.colors.tertiary};

            &:focus,
            &:hover {
                color: ${(props): string => props.theme.colors.primary};
            }
        }

        &:first-of-type {
            border-top-left-radius: 2px;
            border-top-right-radius: 2px;
            padding-top: 10px;
        }

        &:last-of-type {
            border-bottom-left-radius: 2px;
            border-bottom-right-radius: 2px;
            padding-bottom: 10px;
        }
    }

    .tdBefore {
        display: inline-block;
        font-weight: 700;

        &::after {
            content: ":";
            margin-right: 5px;
        }
    }

    @media screen and (min-width: ${(props): string => props.breakpoint}px) {
        border-radius: 2px;
        border-collapse: collapse;
        border-style: hidden;
        overflow: hidden;

        table {
            display: table;
        }

        thead {
            display: table-header-group;
        }

        tbody {
            display: table-row-group;
        }

        tr {
            display: table-row;
        }

        thead tr {
            position: unset;
            top: unset;
            left: unset;
        }

        th,
        td {
            display: table-cell;
        }

        .tdBefore {
            display: none;
        }

        th,
        .pivoted {
            border: 1px solid ${(props): string => props.theme.colors.primary};
            text-align: left;
            padding: 5px 10px;
            white-space: pre-wrap;
            overflow-wrap: break-word;

            &:first-of-type {
                border-top-left-radius: unset;
                border-top-right-radius: unset;
                padding-top: 5px;
            }

            &:last-of-type {
                border-bottom-left-radius: unset;
                border-bottom-right-radius: unset;
                padding-bottom: 5px;
            }
        }

        th {
            background-color: ${(props): string => props.theme.colors.tertiary};
            color: ${(props): string => props.theme.colors.secondary};
        }
    }
`;

type Props = {
    children: React.ReactNode;
    breakpoint?: number;
    className?: string;
};

const Table: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    return (
        <StyledTable breakpoint={props.breakpoint || 1000} className={props.className}>
            {props.children}
        </StyledTable>
    );
};

export default Table;
