import React from "react";
import styled from "styled-components";
import { Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import moment from "moment";
import { useQuery } from "@apollo/client";

import { GetAllEnquiriesByUser } from "../../GraphQL/__generated__/GetAllEnquiriesByUser";
import { GET_ALL_ENQUIRIES_BY_USER_QUERY } from "../../GraphQL/Queries";
import Heading from "../Shared/Heading";
import Table from "../Shared/Table";
import Link from "../Shared/Link";
import Loading from "../Shared/Loading";
import { createSlug } from "../../utils/createSlug";

const StyledEnquiries = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
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

const Enquiries: React.FC = (): React.ReactElement => {
    const { data, loading } = useQuery<GetAllEnquiriesByUser>(GET_ALL_ENQUIRIES_BY_USER_QUERY);

    return (
        <StyledEnquiries>
            <Heading size="h1">Your Enquiries</Heading>
            {loading ? (
                <Loading text="Loading your enquiries" />
            ) : !data || data.getAllEnquiriesByUser.length < 1 ? (
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
                        {data.getAllEnquiriesByUser.map((enquiry) => (
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
                                    {enquiry.status === 0 ? "Pending" : enquiry.status === 1 ? "Accepted" : "Declined"}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </StyledTable>
            )}
        </StyledEnquiries>
    );
};

export default Enquiries;
