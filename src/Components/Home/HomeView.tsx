import React from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";

import { HomeViewGetAllUsers$key } from "./__generated__/HomeViewGetAllUsers.graphql";

type Props = {
    getAllUsers: HomeViewGetAllUsers$key;
};

const HomeView: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const data = useFragment<HomeViewGetAllUsers$key>(
        graphql`
            fragment HomeViewGetAllUsers on UserType {
                username
                id
            }
        `,
        props.getAllUsers
    );

    return (
        <div>
            {data.username} {data.id}
        </div>
    );
};

export default HomeView;
