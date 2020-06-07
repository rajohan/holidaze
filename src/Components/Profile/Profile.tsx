import React from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

import { CurrentUser } from "../../GraphQL/__generated__/CurrentUser";
import { CURRENT_USER_QUERY } from "../../GraphQL/Queries";
import Container1000 from "../Layout/Containers/Container1000";
import Heading from "../Shared/Heading";
import Link from "../Shared/Link";

const StyledProfile = styled.div``;

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

const Profile: React.FC = (): React.ReactElement => {
    const { data } = useQuery<CurrentUser>(CURRENT_USER_QUERY);

    if (!data || !data.user) {
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
                <title>Holidaze - Profile</title>
            </Helmet>
            <Container1000>
                <Heading size="h1">Your Profile</Heading>
                <StyledProfile>Test</StyledProfile>
                <Heading size="h1">Your Enquiries</Heading>
            </Container1000>
        </React.Fragment>
    );
};

export default Profile;
