import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";

import { EstablishmentGetEstablishmentQuery } from "./__generated__/EstablishmentGetEstablishmentQuery.graphql";

const StyledEstablishment = styled.div``;

const Establishment: React.FC = (): React.ReactElement => {
    const { id } = useParams<{ id: string }>();

    const data = useLazyLoadQuery<EstablishmentGetEstablishmentQuery>(
        graphql`
            query EstablishmentGetEstablishmentQuery($id: ID!) {
                getEstablishment(id: $id, withEnquiries: false) {
                    id
                    name
                }
            }
        `,
        { id: id },
        { fetchPolicy: "store-or-network" }
    );

    return <StyledEstablishment>{data.getEstablishment.name}</StyledEstablishment>;
};

export default Establishment;
