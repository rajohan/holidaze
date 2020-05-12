import React from "react";
import styled from "styled-components";

import { attractionsData } from "./attractionsData";
import Attraction from "./Attraction";

const StyledAttractions = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(265px, 100%));
    grid-gap: 30px;
    width: 100%;
    justify-content: center;
    margin: 30px 0;

    @media only screen and (min-width: 350px) {
        grid-template-columns: repeat(auto-fit, minmax(313px, 313px));
    }
`;

const Attractions: React.FC = (): React.ReactElement => {
    return (
        <StyledAttractions>
            {attractionsData.map((attraction, index) => (
                <Attraction key={`attraction-${index}`} attraction={attraction} />
            ))}
        </StyledAttractions>
    );
};

export default Attractions;
