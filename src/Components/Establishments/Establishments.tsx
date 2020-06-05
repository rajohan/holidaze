import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@apollo/client";

import { CurrentUser } from "../../GraphQL/__generated__/CurrentUser";
import { GetAllEstablishments } from "../../GraphQL/__generated__/GetAllEstablishments";
import { CURRENT_USER_QUERY, GET_ALL_ESTABLISHMENTS_QUERY } from "../../GraphQL/Queries";
import Loading from "../Shared/Loading";
import Container1000 from "../Layout/Containers/Container1000";
import Heading from "../Shared/Heading";
import Search from "../Shared/Search";
import EstablishmentsItem from "./EstablishmentsItem";

const StyledEstablishments = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(265px, 100%));
    grid-gap: 30px;
    width: 100%;
    justify-content: center;
    margin: 30px 0;

    @media only screen and (min-width: 350px) {
        grid-template-columns: repeat(auto-fit, minmax(313px, 313px));
    }
`;

const Establishments: React.FC = (): React.ReactElement => {
    const { loading, data } = useQuery<GetAllEstablishments>(GET_ALL_ESTABLISHMENTS_QUERY);
    const { data: currentUser } = useQuery<CurrentUser>(CURRENT_USER_QUERY);

    const renderEstablishments = (): React.ReactNode => {
        return (
            data &&
            data.getAllEstablishments.map((establishment) => (
                <EstablishmentsItem
                    key={`${establishment.id}`}
                    establishment={establishment}
                    currentUser={currentUser as CurrentUser}
                />
            ))
        );
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Holidaze - Establishments</title>
            </Helmet>
            <Container1000>
                <Search />
                <Heading size="h1">Take a look at our establishments</Heading>
                <Heading size="h2">We got amazing establishments all over bergen</Heading>
                <StyledEstablishments>
                    {loading ? <Loading text="Loading establishments" /> : renderEstablishments()}
                </StyledEstablishments>
            </Container1000>
        </React.Fragment>
    );
};

export default Establishments;
