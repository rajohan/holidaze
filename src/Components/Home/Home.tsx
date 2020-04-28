import React, { useState, Suspense } from "react";
import { useLazyLoadQuery } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";

import { HomeGetAllUsersQuery } from "./__generated__/HomeGetAllUsersQuery.graphql";
const HomeView = React.lazy(() => import("./HomeView"));

const Home: React.FC = (): React.ReactElement => {
    const [display, setDisplay] = useState(false);

    const data = useLazyLoadQuery<HomeGetAllUsersQuery>(
        graphql`
            query HomeGetAllUsersQuery {
                getAllUsers {
                    id
                    ...HomeViewGetAllUsers
                }
            }
        `,
        {},
        { fetchPolicy: "store-or-network" }
    );

    const renderUsers = (): React.ReactNode => {
        return data.getAllUsers.map((user, index) => <HomeView key={data.getAllUsers[index].id} getAllUsers={user} />);
    };

    return (
        <div>
            {!display ? (
                <button onClick={(): void => setDisplay(true)}>Click me</button>
            ) : (
                <Suspense fallback="Loading...">{renderUsers()}</Suspense>
            )}
        </div>
    );
};

export default Home;
