import React from "react";
import { useLazyLoadQuery } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";

import { HomeGetAllUsersQuery } from "./__generated__/HomeGetAllUsersQuery.graphql";
import HomeView from "./HomeView";

const Home: React.FC = (): React.ReactElement => {
    const data = useLazyLoadQuery<HomeGetAllUsersQuery>(
        graphql`
            query HomeGetAllUsersQuery {
                getAllUsers {
                    ...HomeView_getAllUsers
                }
            }
        `,
        {},
        { fetchPolicy: "store-or-network" }
    );

    return <HomeView user={data.getAllUsers} />;
};

export default Home;
