import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { useQuery } from "@apollo/client";

import { CURRENT_USER_QUERY, GET_ALL_ESTABLISHMENTS_QUERY } from "../../GraphQL/Queries";
import { GetAllEstablishments } from "../../GraphQL/__generated__/GetAllEstablishments";
import { CurrentUser } from "../../GraphQL/__generated__/CurrentUser";
import Link from "../Shared/Link";
import EstablishmentsItem from "../Establishments/EstablishmentsItem";
import Loading from "../Shared/Loading";
import Container1000 from "../Layout/Containers/Container1000";
import Heading from "../Shared/Heading";

const StyledWishlist = styled.div`
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

const NoItems = styled.div`
    background-color: ${(props): string => props.theme.colors.secondary};
    padding: 20px;
    width: 100%;
    max-width: 600px;
    border-radius: 2px;
    text-align: center;
    margin: 30px 0;
`;

const NoAccess = styled.div`
    background-color: ${(props): string => props.theme.colors.secondary};
    padding: 20px;
    width: 100%;
    max-width: 600px;
    border-radius: 2px;
    text-align: center;
    margin: 30px 0;

    p {
        margin-bottom: 30px;
    }
`;

const Wishlist: React.FC = (): React.ReactElement => {
    const { data: currentUser } = useQuery<CurrentUser>(CURRENT_USER_QUERY);
    const { data, loading } = useQuery<GetAllEstablishments>(GET_ALL_ESTABLISHMENTS_QUERY);

    const renderEstablishments = (): React.ReactNode => {
        const establishments =
            data &&
            data.getAllEstablishments &&
            data.getAllEstablishments.filter(
                (establishment) =>
                    establishment.wishlist?.findIndex((wishlist) => wishlist.userId === currentUser?.user?.id) !== -1
            );

        if (!establishments || establishments.length < 1) {
            return <NoItems>No establishments is on your wishlist</NoItems>;
        }

        return (
            <StyledWishlist>
                {establishments.map((establishment) => (
                    <EstablishmentsItem
                        key={`${establishment.id}`}
                        establishment={establishment}
                        currentUser={currentUser as CurrentUser}
                    />
                ))}
            </StyledWishlist>
        );
    };

    if (!currentUser || !currentUser.user) {
        return (
            <React.Fragment>
                <NoAccess>
                    <p>Sorry, you need to be logged in to view this page</p>
                    <Link href="/">Go back to home</Link>
                </NoAccess>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Holidaze - Wishlist</title>
            </Helmet>
            <Container1000>
                <Heading size="h1">Your wishlist</Heading>
                <Heading size="h2">Establishments on your wishlist</Heading>
                {loading ? <Loading text="Loading your wishlist" /> : renderEstablishments()}
            </Container1000>
        </React.Fragment>
    );
};

export default Wishlist;
