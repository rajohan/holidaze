import React from "react";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

import Table from "../Shared/Table";
import Loading from "../Shared/Loading";
import { GetAllEnquiriesData } from "../../GraphQL/types";
import { GET_ALL_ENQUIRIES_QUERY } from "../../GraphQL/Queries";

const AdminEnquiries: React.FC = (): React.ReactElement => {
    const { loading, data } = useQuery<GetAllEnquiriesData>(GET_ALL_ENQUIRIES_QUERY);

    if (loading) {
        return <Loading text="Loading enquiries" />;
    }

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Client Name</Th>
                    <Th>Email</Th>
                    <Th>Establishment</Th>
                    <Th>Check In</Th>
                    <Th>Check Out</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data &&
                    data.getAllEnquiries.map((enquiry) => (
                        <Tr key={`enquiry-${enquiry.id}`}>
                            <Td>{enquiry.clientName}</Td>
                            <Td>{enquiry.email}</Td>
                            <Td>{enquiry.establishment.name}</Td>
                            <Td>{moment(enquiry.checkin).format("DD.MM.YYYY")}</Td>
                            <Td>{moment(enquiry.checkout).format("DD.MM.YYYY")}</Td>
                            <Td>Pending</Td>
                            <Td>Accept / Decline</Td>
                        </Tr>
                    ))}
            </Tbody>
        </Table>
    );
};

export default AdminEnquiries;
