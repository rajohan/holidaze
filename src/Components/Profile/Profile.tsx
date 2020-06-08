import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLazyQuery, useQuery } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";

import {
    CURRENT_USER_QUERY,
    GET_ALL_ENQUIRIES_BY_USER_QUERY,
    GET_USER_QUERY,
    IS_ON_NEWSLETTER_LIST_QUERY
} from "../../GraphQL/Queries";
import { CurrentUser } from "../../GraphQL/__generated__/CurrentUser";
import { GetUser } from "../../GraphQL/__generated__/GetUser";
import { IsOnNewsletterList, IsOnNewsletterListVariables } from "../../GraphQL/__generated__/IsOnNewsletterList";
import { GetAllEnquiriesByUser } from "../../GraphQL/__generated__/GetAllEnquiriesByUser";
import Container1000 from "../Layout/Containers/Container1000";
import Heading from "../Shared/Heading";
import Link from "../Shared/Link";
import Loading from "../Shared/Loading";
import Table from "../Shared/Table";
import { Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { createSlug } from "../../utils/createSlug";

const StyledProfile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: ${(props): string => props.theme.colors.secondary};
    padding: 20px;
    margin: 10px 0 20px 0;
    width: 100%;
    max-width: 600px;
    border-radius: 2px;

    span {
        font-weight: 700;
        margin-right: 5px;
    }

    div:last-of-type {
        margin-bottom: 10px;
    }

    a:last-of-type {
        margin-top: 5px;
    }
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

const NoEnquiries = styled.div`
    background-color: ${(props): string => props.theme.colors.secondary};
    padding: 20px;
    width: 100%;
    max-width: 600px;
    text-align: center;
    border-radius: 2px;
    margin: 20px 0;
`;

const StyledTable = styled(Table)`
    max-width: 600px;
    margin-top: 10px;
`;

const Profile: React.FC = (): React.ReactElement => {
    const { data: currentUser } = useQuery<CurrentUser>(CURRENT_USER_QUERY);
    const [getUser, { data: userData }] = useLazyQuery<GetUser>(GET_USER_QUERY);
    const [isOnNewsLetterList, { data: isOnNewsletterListData }] = useLazyQuery<
        IsOnNewsletterList,
        IsOnNewsletterListVariables
    >(IS_ON_NEWSLETTER_LIST_QUERY);
    const [getEnquiries, { data: enquiriesData }] = useLazyQuery<GetAllEnquiriesByUser>(
        GET_ALL_ENQUIRIES_BY_USER_QUERY
    );

    useEffect(() => {
        if (currentUser?.user?.email) {
            getUser();
            isOnNewsLetterList({ variables: { email: currentUser.user.email } });
            getEnquiries();
        }
    }, [currentUser, getUser, isOnNewsLetterList, getEnquiries]);

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

    if (!userData || !isOnNewsletterListData || !enquiriesData) {
        return <Loading text="Loading user data" />;
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Holidaze - Profile</title>
            </Helmet>
            <Container1000>
                <Heading size="h1">Your Profile</Heading>
                <StyledProfile>
                    <div>
                        <span>Username:</span>
                        {userData.getUser.username}
                    </div>
                    <div>
                        <span>Name:</span>
                        {userData.getUser.name}
                    </div>
                    <div>
                        <span>Email:</span>
                        {userData.getUser.email}
                    </div>
                    <div>
                        <span>Newsletters:</span>
                        {isOnNewsletterListData.isOnNewsletterList.isOnNewsletterList ? "Yes" : "No"}
                    </div>
                    <Link onClick={(): void => console.log("edit")}>Edit details</Link>
                    <Link onClick={(): void => console.log("change")}>Change password</Link>
                </StyledProfile>
                <Heading size="h1">Your Enquiries</Heading>
                {enquiriesData.getAllEnquiriesByUser.length < 1 ? (
                    <NoEnquiries>You do not have any enquiries yet</NoEnquiries>
                ) : (
                    <StyledTable breakpoint={600}>
                        <Thead>
                            <Tr>
                                <Th>Establishment</Th>
                                <Th>Check In Date</Th>
                                <Th>Check Out Date</Th>
                                <Th>Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {enquiriesData.getAllEnquiriesByUser.map((enquiry) => (
                                <Tr key={`enquiry-${enquiry.id}`}>
                                    <Td>
                                        <Link
                                            href={`/establishment/${enquiry.establishment.id}/${createSlug(
                                                enquiry.establishment.name
                                            )}`}
                                        >
                                            {enquiry.establishment.name}
                                        </Link>
                                    </Td>
                                    <Td>{moment(enquiry.checkin).format("DD.MM.YYYY")}</Td>
                                    <Td>{moment(enquiry.checkout).format("DD.MM.YYYY")}</Td>
                                    <Td>
                                        {enquiry.status === 0
                                            ? "Pending"
                                            : enquiry.status === 1
                                            ? "Accepted"
                                            : "Declined"}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </StyledTable>
                )}
            </Container1000>
        </React.Fragment>
    );
};

export default Profile;
