import React from "react";
import styled from "styled-components";
import { useFragment } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";

import { EstablishmentsItemGetAllEstablishments$key } from "./__generated__/EstablishmentsItemGetAllEstablishments.graphql";

const StyledEstablishmentsItem = styled.div``;

type Props = {
    getAllEstablishments: EstablishmentsItemGetAllEstablishments$key;
};

const EstablishmentsItem: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const data = useFragment<EstablishmentsItemGetAllEstablishments$key>(
        graphql`
            fragment EstablishmentsItemGetAllEstablishments on EstablishmentType {
                id
                name
                imageUrl
                maxGuests
                price
            }
        `,
        props.getAllEstablishments
    );

    return <StyledEstablishmentsItem>{data.name}</StyledEstablishmentsItem>;
};

export default EstablishmentsItem;
