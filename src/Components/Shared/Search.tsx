import React, { useState } from "react";
import styled from "styled-components";
import { Search as SearchIcon } from "@material-ui/icons";

import Input from "./Input";

const StyledSearch = styled.div`
    margin-bottom: 30px;
    max-width: 600px;
    width: 100%;
`;

const Search: React.FC = (): React.ReactElement => {
    const [search, setSearch] = useState("");

    return (
        <StyledSearch>
            <Input
                name="search"
                size="big"
                type="search"
                label="Search our establishments"
                value={search}
                onChange={({ value }): void => setSearch(value)}
            >
                <SearchIcon />
            </Input>
        </StyledSearch>
    );
};

export default Search;
