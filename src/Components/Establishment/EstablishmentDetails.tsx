import React from "react";
import styled from "styled-components";
import { Favorite, People, RestaurantMenu } from "@material-ui/icons";

const StyledEstablishmentDetails = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${(props): string => props.theme.colors.secondary};
    padding: 15px;
    border-radius: 2px;
    width: 100%;
    margin: 10px 0 0 0;

    @media only screen and (min-width: 450px) {
        margin: 10px 10px 0 0;
    }

    span {
        display: flex;
        align-items: center;

        svg {
            width: 24px;
            height: 24px;
            fill: ${(props): string => props.theme.colors.primary};
            margin-left: 5px;
        }
    }
`;

type Props = {
    maxGuests: number;
    selfCatering: boolean;
};

const EstablishmentDetails: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { maxGuests, selfCatering } = props;

    return (
        <StyledEstablishmentDetails>
            <span>Rating: N/A</span>
            <span>
                Max Guests: {maxGuests} <People />
            </span>
            <span>
                Wishlists: N/A <Favorite />
            </span>
            <span>
                Self Catering: {selfCatering ? "Yes" : "No"} <RestaurantMenu />
            </span>
        </StyledEstablishmentDetails>
    );
};

export default EstablishmentDetails;
