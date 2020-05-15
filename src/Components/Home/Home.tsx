import React, { Suspense } from "react";

import Container1000 from "../Layout/Containers/Container1000";
import Loading from "../Shared/Loading";
import Heading from "../Shared/Heading";
import EstablishmentsCarousel from "./EstablishmentsCarousel/EstablishmentsCarousel";
import Attractions from "./Attractions/Attractions";
import Subscribe from "./Subscribe";

const Home: React.FC = (): React.ReactElement => {
    return (
        <Container1000>
            <Heading size="h1">Ready to get away from home?</Heading>
            <Heading size="h2">We got you covered with amazing establishments</Heading>
            <Suspense fallback={<Loading />}>
                <EstablishmentsCarousel />
            </Suspense>
            <Heading size="h1">Things to do while in bergen</Heading>
            <Heading size="h2">We have prepared a list with our recommendations</Heading>
            <Attractions />
            <Heading size="h1">Subscribe to our newsletters</Heading>
            <Heading size="h2">Get exclusive offers and updates on new establishments</Heading>
            <Subscribe />
        </Container1000>
    );
};

export default Home;
