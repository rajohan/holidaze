import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

import { GET_ALL_ENQUIRIES_QUERY } from "../../GraphQL/Queries";
import { CHANGE_ENQUIRY_STATUS_MUTATION } from "../../GraphQL/Mutations";
import { ChangeEnquiryStatus, ChangeEnquiryStatusVariables } from "../../GraphQL/__generated__/ChangeEnquiryStatus";
import { GetAllEnquiries } from "../../GraphQL/__generated__/GetAllEnquiries";
import Table from "../Shared/Table";
import Loading from "../Shared/Loading";
import Link from "../Shared/Link";
import { createSlug } from "../../utils/createSlug";
import styled from "styled-components";

const Error = styled.div`
    background-color: ${(props): string => props.theme.colors.secondary};
    padding: 20px;
    width: 100%;
    text-align: center;
    border-radius: 2px;
    margin: 20px 0;
`;

const AdminEnquiries: React.FC = (): React.ReactElement => {
    const { loading, data } = useQuery<GetAllEnquiries>(GET_ALL_ENQUIRIES_QUERY);
    const [changeStatus] = useMutation<ChangeEnquiryStatus, ChangeEnquiryStatusVariables>(
        CHANGE_ENQUIRY_STATUS_MUTATION
    );

    const handleChangeStatus = async (id: string, status: 1 | 2): Promise<void> => {
        await changeStatus({
            variables: { id, status },
            optimisticResponse: {
                changeEnquiryStatus: {
                    __typename: "EnquiryType",
                    id: id,
                    status: status
                }
            }
        });
    };

    if (loading && !data) {
        return <Loading text="Loading enquiries" />;
    }

    if (data && data.getAllEnquiries.length < 1) {
        return <Error>No enquiries could be found</Error>;
    }

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Client Name</Th>
                    <Th>Email</Th>
                    <Th>Establishment</Th>
                    <Th>Guests</Th>
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
                            <Td>{enquiry.user.name}</Td>
                            <Td>
                                <Link href={`mailto:${enquiry.user.email}`} external={true}>
                                    {enquiry.user.email}
                                </Link>
                            </Td>
                            <Td>
                                <Link
                                    href={`/establishment/${enquiry.establishment.id}/${createSlug(
                                        enquiry.establishment.name
                                    )}`}
                                >
                                    {enquiry.establishment.name}
                                </Link>
                            </Td>
                            <Td>{enquiry.guests}</Td>
                            <Td>{moment(enquiry.checkin).format("DD.MM.YYYY")}</Td>
                            <Td>{moment(enquiry.checkout).format("DD.MM.YYYY")}</Td>
                            <Td>{enquiry.status === 0 ? "Pending" : enquiry.status === 1 ? "Accepted" : "Declined"}</Td>
                            <Td>
                                {enquiry.status !== 1 && (
                                    <Link onClick={(): Promise<void> => handleChangeStatus(enquiry.id, 1)}>Accept</Link>
                                )}
                                {enquiry.status === 0 && " / "}
                                {enquiry.status !== 2 && (
                                    <Link onClick={(): Promise<void> => handleChangeStatus(enquiry.id, 2)}>
                                        Decline
                                    </Link>
                                )}
                            </Td>
                        </Tr>
                    ))}
            </Tbody>
        </Table>
    );
};

export default AdminEnquiries;
