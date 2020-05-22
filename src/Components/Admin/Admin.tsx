import React, { Suspense } from "react";
import { Helmet } from "react-helmet-async";

import Container1000 from "../Layout/Containers/Container1000";
import Heading from "../Shared/Heading";
import Loading from "../Shared/Loading";
import AdminEnquiries from "./AdminEnquiries";

const AdminEstablishments = React.lazy(() => import("./AdminEstablishments"));
const AdminMessages = React.lazy(() => import("./AdminMessages"));

const Admin: React.FC = (): React.ReactElement => {
    return (
        <React.Fragment>
            <Helmet>
                <title>Holidaze - Admin</title>
            </Helmet>
            <Container1000>
                <Heading size="h1">Holidaze Admin</Heading>
                <Suspense fallback={<Loading text="Loading enquiries" />}>
                    <AdminEnquiries />
                </Suspense>
                <Suspense fallback={<Loading text="Loading messages" />}>
                    <AdminMessages />
                </Suspense>
                <Suspense fallback={<Loading text="Loading establishments" />}>
                    <AdminEstablishments />
                </Suspense>
            </Container1000>
        </React.Fragment>
    );
};

export default Admin;
