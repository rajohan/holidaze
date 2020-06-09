import React from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

import { CURRENT_USER_QUERY } from "../../GraphQL/Queries";
import { CurrentUser } from "../../GraphQL/__generated__/CurrentUser";
import Container1000 from "../Layout/Containers/Container1000";
import Link from "../Shared/Link";

const User = React.lazy(() => import("./User"));
const Enquiries = React.lazy(() => import("./Enquiries"));

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
    const { data: currentUser } = useQuery<CurrentUser>(CURRENT_USER_QUERY);

    if (!currentUser || !currentUser.user) {
        return (
            <NoAccess>
                <p>Sorry, you need to be logged in to view this page</p>
                <Link href="/">Go back to home</Link>
            </NoAccess>
        );
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Holidaze - Profile</title>
            </Helmet>
            <Container1000>
                <User email={currentUser.user.email} />
                <Enquiries />
            </Container1000>
        </React.Fragment>
    );
};

export default Profile;
