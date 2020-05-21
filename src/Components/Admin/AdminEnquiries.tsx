import React from "react";
import { useLazyLoadQuery } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
import moment from "moment";
import { Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

import Table from "../Shared/Table";
import { AdminEnquiriesGetAllEnquiriesQuery } from "./__generated__/AdminEnquiriesGetAllEnquiriesQuery.graphql";

const AdminEnquiries: React.FC = (): React.ReactElement => {
    const data = useLazyLoadQuery<AdminEnquiriesGetAllEnquiriesQuery>(
        graphql`
            query AdminEnquiriesGetAllEnquiriesQuery {
                getAllEnquiries(withEstablishment: true) {
                    id
                    clientName
                    email
                    checkin
                    checkout

                    establishment {
                        id
                        name
                    }
                }
            }
        `,
        {},
        { fetchPolicy: "store-or-network" }
    );

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
                {data.getAllEnquiries.map((enquiry) => (
                    <Tr key={`enquiry-${enquiry.id}`}>
                        <Td>{enquiry.clientName}</Td>
                        <Td>{enquiry.email}</Td>
                        <Td>{enquiry.establishment.name}</Td>
                        <Td>{moment(enquiry.checkin as Date).format("DD.MM.YYYY")}</Td>
                        <Td>{moment(enquiry.checkout as Date).format("DD.MM.YYYY")}</Td>
                        <Td>Pending</Td>
                        <Td>Accept / Decline</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default AdminEnquiries;
