import React from "react";
import styled from "styled-components";
import { Search as SearchIcon } from "@material-ui/icons";
import { Formik } from "formik";

import Input from "./Form/Input/Input";
import Form from "./Form/Form";

const StyledSearch = styled.div`
    margin-bottom: 30px;
    max-width: 600px;
    width: 100%;
`;

const Search: React.FC = (): React.ReactElement => {
    return (
        <StyledSearch>
            <Formik initialValues={{ search: "" }} onSubmit={(): void => console.log("test")}>
                <Form>
                    <Input name="search" size="big" type="search" label="Search our establishments">
                        <SearchIcon />
                    </Input>
                </Form>
            </Formik>
        </StyledSearch>
    );
};

export default Search;
