import React, { Suspense, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

import Container1000 from "../Layout/Containers/Container1000";
import Heading from "../Shared/Heading";
import Loading from "../Shared/Loading";
import AdminEnquiries from "./AdminEnquiries";
import { useQuery } from "@apollo/client";

import { CurrentUser } from "../../GraphQL/__generated__/CurrentUser";
import { CURRENT_USER_QUERY } from "../../GraphQL/Queries";
import Link from "../Shared/Link";
import AdminNav from "./AdminNav";

const AdminEstablishments = React.lazy(() => import("./AdminEstablishments"));
const AdminMessages = React.lazy(() => import("./AdminMessages"));

const StyledNoAccess = styled.div`
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

const Admin: React.FC = (): React.ReactElement => {
    const { data } = useQuery<CurrentUser>(CURRENT_USER_QUERY);
    const [active, setActive] = useState("enquiries");

    return (
        <React.Fragment>
            <Helmet>
                <title>Holidaze - Admin</title>
            </Helmet>
            <Container1000>
                <Heading size="h1">Holidaze Admin</Heading>
                <Heading size="h2">Manage the Holidaze website</Heading>
                {!data || !data.user || data.user.accessLevel < 1 ? (
                    <React.Fragment>
                        <StyledNoAccess>
                            <p>Sorry, you are either not logged in or do not have permission to view this page</p>
                            <Link href="/">Go back to home</Link>
                        </StyledNoAccess>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <AdminNav
                            active={active}
                            onClick={setActive}
                            items={["enquiries", "messages", "establishments"]}
                        />
                        {active === "enquiries" && (
                            <Suspense fallback={<Loading text="Loading enquiries" />}>
                                <AdminEnquiries />
                            </Suspense>
                        )}
                        {active === "messages" && (
                            <Suspense fallback={<Loading text="Loading messages" />}>
                                <AdminMessages />
                            </Suspense>
                        )}
                        {active === "establishments" && (
                            <Suspense fallback={<Loading text="Loading establishments" />}>
                                <AdminEstablishments />
                            </Suspense>
                        )}
                    </React.Fragment>
                )}
            </Container1000>
        </React.Fragment>
    );
};

export default Admin;
