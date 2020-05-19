import React, { Suspense } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";

import { EstablishmentGetEstablishmentQuery } from "./__generated__/EstablishmentGetEstablishmentQuery.graphql";
import Container1000 from "../Layout/Containers/Container1000";
import Heading from "../Shared/Heading";
import EstablishmentEnquiry from "./EstablishmentEnquiry";
import EstablishmentDetails from "./EstablishmentDetails";
import EstablishmentDescription from "./EstablishmentDescription";
import EstablishmentPrice from "./EstablishmentPrice";
import Loading from "../Shared/Loading";
const EstablishmentMap = React.lazy(() => import("./EstablishmentMap"));

const StyledLoading = styled(Loading)`
    flex: 1;
    background-color: ${(props): string => props.theme.colors.secondary};
    border-radius: 2px;
    margin: 0 0 0 10px;
    justify-content: center;
`;

const StyledHeading = styled(Heading)`
    letter-spacing: 2px;
    margin-bottom: 20px;
`;

const StyledEstablishment = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    margin-bottom: 30px;

    @media only screen and (min-width: 900px) {
        flex-direction: row;
        max-width: 100%;
    }

    @media only screen and (min-width: 950px) {
        max-width: 890px;
    }

    @media only screen and (min-width: 1050px) {
        max-width: 100%;
    }

    h2 {
        font-size: 17px;
        font-weight: 700;
        text-transform: capitalize;
        margin-bottom: 15px;
    }

    .establishment {
        &Column {
            display: flex;
            flex-direction: column;
            width: 100%;
            color: ${(props): string => props.theme.colors.primary};

            &:first-of-type {
                min-width: 100%;
                max-width: 100%;

                @media only screen and (min-width: 900px) {
                    min-width: 500px;
                    max-width: 500px;
                }

                @media only screen and (min-width: 1050px) {
                    min-width: 600px;
                    max-width: 600px;
                }
            }

            img {
                width: 500px;
                height: auto;
                border-radius: 2px;
                object-fit: cover;
                object-position: center;

                @media only screen and (min-width: 900px) {
                    width: 500px;
                    height: 281px;
                }

                @media only screen and (min-width: 1050px) {
                    width: 600px;
                    height: 337px;
                }
            }
        }

        &DetailsPrice {
            display: flex;
            flex-direction: column;

            @media only screen and (min-width: 450px) {
                flex-direction: row;
            }
        }
    }
`;

const Establishment: React.FC = (): React.ReactElement => {
    const { id } = useParams<{ id: string }>();

    const data = useLazyLoadQuery<EstablishmentGetEstablishmentQuery>(
        graphql`
            query EstablishmentGetEstablishmentQuery($id: ID!) {
                getEstablishment(id: $id, withEnquiries: false) {
                    id
                    name
                    imageUrl
                    price
                    maxGuests
                    googleLat
                    googleLong
                    description
                    selfCatering
                    createdAt
                    updatedAt
                }
            }
        `,
        { id: id },
        { fetchPolicy: "store-or-network" }
    );

    const {
        name,
        imageUrl,
        price,
        maxGuests,
        googleLat,
        googleLong,
        description,
        selfCatering,
        createdAt,
        updatedAt
    } = data.getEstablishment;

    return (
        <Container1000>
            <StyledHeading size="h1">{name}</StyledHeading>
            <StyledEstablishment>
                <div className="establishmentColumn">
                    <img src={imageUrl} alt={name} />
                    <div className="establishmentDetailsPrice">
                        <EstablishmentDetails maxGuests={maxGuests} selfCatering={selfCatering} />
                        <EstablishmentPrice price={price} />
                    </div>
                    <EstablishmentDescription
                        description={description}
                        createdAt={createdAt as Date}
                        updatedAt={updatedAt as Date}
                    />
                </div>
                <div className="establishmentColumn">
                    <Suspense fallback={<StyledLoading color="dark" text="Loading map" />}>
                        <EstablishmentMap long={googleLong} lat={googleLat} name={name} />
                    </Suspense>
                    <EstablishmentEnquiry maxGuests={maxGuests} />
                </div>
            </StyledEstablishment>
        </Container1000>
    );
};

export default Establishment;
