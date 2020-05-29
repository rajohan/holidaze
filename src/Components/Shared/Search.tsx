import React from "react";
import styled from "styled-components";
import { Search as SearchIcon } from "@material-ui/icons";
import { Formik } from "formik";

import Input from "./Form/Input/Input";
import Form from "./Form/Form";
import { useLocation } from "react-router-dom";

const StyledSearch = styled.div`
    margin-bottom: 30px;
    max-width: 600px;
    width: 100%;
    position: relative;
`;

const StyledInput = styled(Input)<{ location: string }>`
    div {
        background-color: ${(props): string =>
            props.location === "/" ? props.theme.colors.secondary60 : props.theme.colors.tertiary};
    }
`;

const SearchResults = styled.ul<{ location: string; show: boolean }>`
    display: ${(props): string => (props.show ? "block" : "none")};
    background-color: ${(props): string =>
        props.location === "/" ? props.theme.colors.secondary60 : props.theme.colors.tertiary};
    position: absolute;
    width: 100%;
    top: calc(100% - 1px);
    z-index: 100;
    padding: 0 10px 10px 10px;

    li {
        background-color: ${(props): string => props.theme.colors.secondary};
        padding: 10px;

        &:not(:first-of-type) {
            margin-top: 1px;
        }
    }
`;

const Search: React.FC = (): React.ReactElement => {
    const location = useLocation();

    return (
        <StyledSearch>
            <Formik initialValues={{ search: "" }} onSubmit={(): void => console.log("test")}>
                <Form>
                    <StyledInput
                        location={location.pathname}
                        name="search"
                        size="big"
                        type="search"
                        label="Search our establishments"
                    >
                        <SearchIcon />
                    </StyledInput>
                    <SearchResults show={false} location={location.pathname}>
                        <li>Test</li>
                        <li>Test</li>
                        <li>Test</li>
                        <li>Test</li>
                        <li>Test</li>
                    </SearchResults>
                </Form>
            </Formik>
        </StyledSearch>
    );
};

export default Search;
