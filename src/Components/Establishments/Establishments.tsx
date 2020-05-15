import React from "react";
import styled from "styled-components";
import { useLazyLoadQuery } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";

import EstablishmentsItem from "./EstablishmentsItem";
import { EstablishmentsGetAllEstablishmentsQuery } from "./__generated__/EstablishmentsGetAllEstablishmentsQuery.graphql";
import Container1000 from "../Layout/Containers/Container1000";
import Heading from "../Shared/Heading";
import Search from "../Shared/Search";

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
    const data = useLazyLoadQuery<EstablishmentsGetAllEstablishmentsQuery>(
        graphql`
            query EstablishmentsGetAllEstablishmentsQuery {
                getAllEstablishments {
                    id
                    ...EstablishmentsItemGetAllEstablishments
                }
            }
        `,
        {},
        { fetchPolicy: "store-or-network" }
    );

    const renderEstablishments = (): React.ReactNode => {
        return data.getAllEstablishments.map((establishment, index) => (
            <EstablishmentsItem
                key={`establishment-${data.getAllEstablishments[index].id}`}
                getAllEstablishments={establishment}
            />
        ));
    };

    return (
        <Container1000>
            <Search />
            <Heading size="h1">Take a look at our establishments</Heading>
            <Heading size="h2">We got amazing establishments all over bergen</Heading>
            <StyledEstablishments>{renderEstablishments()}</StyledEstablishments>
        </Container1000>
    );
};

export default Establishments;
