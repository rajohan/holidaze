import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";

import { GetUser } from "../../GraphQL/__generated__/GetUser";
import { IsOnNewsletterList, IsOnNewsletterListVariables } from "../../GraphQL/__generated__/IsOnNewsletterList";
import { GET_USER_QUERY, IS_ON_NEWSLETTER_LIST_QUERY } from "../../GraphQL/Queries";
import Link from "../Shared/Link";
import Heading from "../Shared/Heading";
import Loading from "../Shared/Loading";
import EditUserModal from "./EditUserModal";
import ChangePasswordModal from "./ChangePasswordModal";

const StyledUser = styled.div`
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

type Props = {
    email: string;
};

const User: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { email } = props;
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const { data: userData, loading } = useQuery<GetUser>(GET_USER_QUERY, { notifyOnNetworkStatusChange: true });
    const { data: newsLetterData, loading: loading2 } = useQuery<IsOnNewsletterList, IsOnNewsletterListVariables>(
        IS_ON_NEWSLETTER_LIST_QUERY,
        { variables: { email }, notifyOnNetworkStatusChange: true }
    );

    return (
        <React.Fragment>
            <Heading size="h1">Your Profile</Heading>
            {loading || loading2 ? (
                <Loading text="Loading user data" />
            ) : (
                <StyledUser>
                    <div>
                        <span>Username:</span>
                        {userData && userData.getUser.username}
                    </div>
                    <div>
                        <span>Name:</span>
                        {userData && userData.getUser.name}
                    </div>
                    <div>
                        <span>Email:</span>
                        {userData && userData.getUser.email}
                    </div>
                    <div>
                        <span>Newsletters:</span>
                        {newsLetterData && newsLetterData.isOnNewsletterList.isOnNewsletterList ? "Yes" : "No"}
                    </div>
                    <Link onClick={(): void => setShowEditUserModal(true)}>Edit details</Link>
                    <Link onClick={(): void => setShowChangePasswordModal(true)}>Change password</Link>
                </StyledUser>
            )}
            {showEditUserModal && userData && newsLetterData && (
                <EditUserModal
                    showModal={showEditUserModal}
                    setShowModal={setShowEditUserModal}
                    userData={userData.getUser}
                    isOnNewsletterList={newsLetterData.isOnNewsletterList.isOnNewsletterList}
                />
            )}
            <ChangePasswordModal showModal={showChangePasswordModal} setShowModal={setShowChangePasswordModal} />
        </React.Fragment>
    );
};

export default User;
