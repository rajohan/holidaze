import React from "react";
import styled from "styled-components";
import { useLazyLoadQuery } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";

import EstablishmentsItem from "./EstablishmentsItem";
import { EstablishmentsGetAllEstablishmentsQuery } from "./__generated__/EstablishmentsGetAllEstablishmentsQuery.graphql";

const StyledEstablishments = styled.div``;

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

    return <StyledEstablishments>{renderEstablishments()}</StyledEstablishments>;
};

export default Establishments;
