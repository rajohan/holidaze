import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Search as SearchIcon } from "@material-ui/icons";
import { Formik } from "formik";

import { createSlug } from "../../utils/createSlug";
import Input from "./Form/Input/Input";
import Form from "./Form/Form";
import { useLocation } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_ESTABLISHMENTS_QUERY } from "../../GraphQL/Queries";
import { SearchEstablishments, SearchEstablishmentsVariables } from "../../GraphQL/__generated__/SearchEstablishments";
import Link from "./Link";

const StyledSearch = styled.div`
    margin-bottom: 30px;
    max-width: 600px;
    width: 100%;
    position: relative;
`;

const StyledInput = styled(Input)<{ location: string; showsearchresults: "true" | undefined }>`
    div {
        background-color: ${(props): string =>
            props.location === "/" ? props.theme.colors.secondary60 : props.theme.colors.secondary60};
        border-bottom-right-radius: ${(props): string => (props.showsearchresults ? "0" : "2px")};
        border-bottom-left-radius: ${(props): string => (props.showsearchresults ? "0" : "2px")};
    }
`;

const SearchResults = styled.ul<{ location: string; show: boolean }>`
    display: ${(props): string => (props.show ? "block" : "none")};
    background-color: ${(props): string =>
        props.location === "/" ? props.theme.colors.secondary60 : props.theme.colors.secondary60};
    position: absolute;
    width: 100%;
    top: 100%;
    z-index: 100;
    padding: 0 10px 10px 10px;

    li {
        background-color: ${(props): string => props.theme.colors.secondary};
        color: ${(props): string => props.theme.colors.primary};
        padding: 10px;

        &:not(:first-of-type) {
            margin-top: 1px;
        }
    }
`;

const Search: React.FC = (): React.ReactElement => {
    const location = useLocation();
    const [search, { data }] = useLazyQuery<SearchEstablishments, SearchEstablishmentsVariables>(
        SEARCH_ESTABLISHMENTS_QUERY
    );
    const [showSearchResults, setShowSearchResults] = useState(false);
    const searchWrapperRef = useRef<HTMLDivElement>(null);
    let timer: NodeJS.Timeout | null = null;

    const handleMouseDownOutsideComponent = (event: MouseEvent): void => {
        if (searchWrapperRef.current) {
            !searchWrapperRef.current.contains(event.target as Node) && setShowSearchResults(false);
        }
    };

    // Close search results on mouse click outside the component
    useEffect(() => {
        document.addEventListener("mousedown", handleMouseDownOutsideComponent);

        return (): void => {
            document.removeEventListener("mousedown", handleMouseDownOutsideComponent);
        };
    }, []);

    const handleSearch = (query: string): void => {
        timer && clearTimeout(timer);

        if (query.length > 0) {
            timer = setTimeout(async () => {
                setShowSearchResults(true);
                await search({ variables: { searchQuery: query } });
            }, 800);
        } else {
            setShowSearchResults(false);
        }
    };

    return (
        <StyledSearch ref={searchWrapperRef}>
            <Formik initialValues={{ search: "" }} onSubmit={(values): void => handleSearch(values.search)}>
                <Form>
                    <StyledInput
                        location={location.pathname}
                        name="search"
                        size="big"
                        type="search"
                        label="Search our establishments"
                        onChange={(value): void => handleSearch(value)}
                        onFocus={(): void => setShowSearchResults(true)}
                        autoComplete="off"
                        showsearchresults={showSearchResults ? "true" : undefined}
                        clearButton={true}
                    >
                        <SearchIcon />
                    </StyledInput>
                    <SearchResults show={!!data && showSearchResults} location={location.pathname}>
                        {data && data.searchEstablishments.length < 1 ? (
                            <li>No establishments matching your search could be found</li>
                        ) : (
                            data?.searchEstablishments.map((establishment) => (
                                <li key={`search-${establishment.id}`}>
                                    <Link href={`/establishment/${establishment.id}/${createSlug(establishment.name)}`}>
                                        {establishment.name}
                                    </Link>
                                </li>
                            ))
                        )}
                    </SearchResults>
                </Form>
            </Formik>
        </StyledSearch>
    );
};

export default Search;
