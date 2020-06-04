import React from "react";
import styled from "styled-components";

import { GetAllEstablishments_getAllEstablishments } from "../../../GraphQL/__generated__/GetAllEstablishments";
import EstablishmentsItem from "../../Establishments/EstablishmentsItem";

const StyledEstablishmentsCarouselItem = styled(EstablishmentsItem)`
    display: block;
    width: 200px;
    padding: 15px;
    position: relative;
    border-radius: 0;
    text-align: center;

    @media only screen and (min-width: 450px) {
        width: 250px;
    }

    @media only screen and (min-width: 850px) {
        width: 300px;
        padding: 30px 15px;
    }

    img {
        height: 133px;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;

        @media only screen and (min-width: 450px) {
            height: 166px;
        }

        @media only screen and (min-width: 850px) {
            height: 199px;
        }
    }

    .establishmentPrice {
        top: 25px;
        right: 25px;

        @media only screen and (min-width: 850px) {
            top: 40px;
        }
    }

    .establishmentDetails {
        padding: 0;
        max-width: 170px;

        @media only screen and (min-width: 450px) {
            max-width: 220px;
        }

        @media only screen and (min-width: 850px) {
            max-width: 270px;
        }
    }
`;

type Props = {
    establishment: GetAllEstablishments_getAllEstablishments;
};

const EstablishmentsCarouselItem: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    return <StyledEstablishmentsCarouselItem establishment={props.establishment} />;
};

export default EstablishmentsCarouselItem;
