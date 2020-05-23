import React, { Suspense } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

import { GetEstablishmentData } from "../../GraphQL/types";
import { GET_ESTABLISHMENT_QUERY } from "../../GraphQL/Queries";
import Loading from "../Shared/Loading";
import Container1000 from "../Layout/Containers/Container1000";
import Heading from "../Shared/Heading";
import EstablishmentEnquiry from "./EstablishmentEnquiry";
import EstablishmentDetails from "./EstablishmentDetails";
import EstablishmentDescription from "./EstablishmentDescription";
import EstablishmentPrice from "./EstablishmentPrice";

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

    const { loading, data } = useQuery<GetEstablishmentData>(GET_ESTABLISHMENT_QUERY, {
        variables: { id: id }
    });

    if (loading || !data) {
        return <Loading text="Loading establishment" />;
    }

    const {
        getEstablishment: {
            name,
            imageUrl,
            description,
            createdAt,
            updatedAt,
            googleLat,
            googleLong,
            maxGuests,
            selfCatering,
            price
        }
    } = data;

    return (
        <React.Fragment>
            <Helmet>
                <title>Holidaze - {name}</title>
            </Helmet>
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
                            createdAt={createdAt}
                            updatedAt={updatedAt}
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
        </React.Fragment>
    );
};

export default Establishment;
