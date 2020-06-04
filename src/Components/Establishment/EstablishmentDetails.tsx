import React from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "@apollo/client";
import { Favorite, People, RestaurantMenu } from "@material-ui/icons";

import { CurrentUser } from "../../GraphQL/__generated__/CurrentUser";
import {
    ToggleEstablishmentWishlist,
    ToggleEstablishmentWishlistVariables
} from "../../GraphQL/__generated__/ToggleEstablishmentWishlist";
import { GetEstablishment_getEstablishment_wishlist } from "../../GraphQL/__generated__/GetEstablishment";
import { CURRENT_USER_QUERY, GET_ESTABLISHMENT_QUERY } from "../../GraphQL/Queries";
import { TOGGLE_ESTABLISHMENT_WISHLIST_MUTATION } from "../../GraphQL/Mutations";

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
        position: relative;

        svg {
            width: 24px;
            height: 24px;
            fill: ${(props): string => props.theme.colors.primary};
            margin-left: 5px;

            &.wishlist {
                cursor: pointer;
            }

            &.onWishlist {
                fill: ${(props): string => props.theme.colors.error};
            }
        }
    }
`;

type Props = {
    maxGuests: number;
    selfCatering: boolean;
    establishmentId: string;
    wishlist: GetEstablishment_getEstablishment_wishlist[] | null;
};

const EstablishmentDetails: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { maxGuests, selfCatering, establishmentId, wishlist } = props;
    const { data } = useQuery<CurrentUser>(CURRENT_USER_QUERY);
    const [toggleWishlist, { loading }] = useMutation<
        ToggleEstablishmentWishlist,
        ToggleEstablishmentWishlistVariables
    >(TOGGLE_ESTABLISHMENT_WISHLIST_MUTATION);

    const isOnWishlist = (): boolean => {
        if (!data || !data.user) {
            return false;
        }

        if (!wishlist) {
            return false;
        }

        const isOn = wishlist.filter((wishlist) => wishlist.userId === data.user?.id);

        return isOn.length > 0;
    };

    return (
        <StyledEstablishmentDetails>
            <span>Rating: N/A</span>
            <span>
                Max Guests: {maxGuests} <People />
            </span>
            <span>
                Wishlists: {wishlist ? wishlist.length : 0}{" "}
                <Favorite
                    titleAccess={data && data.user ? "" : "The wishlist feature is only available when signed in"}
                    className={data && data.user ? (isOnWishlist() ? "wishlist onWishlist" : "wishlist") : ""}
                    onClick={async (): Promise<void> => {
                        if (!loading && data && data.user) {
                            await toggleWishlist({
                                variables: { establishmentId },
                                refetchQueries: [
                                    { query: GET_ESTABLISHMENT_QUERY, variables: { id: establishmentId } }
                                ],
                                awaitRefetchQueries: true
                            });
                        }
                    }}
                />
            </span>
            <span>
                Self Catering: {selfCatering ? "Yes" : "No"} <RestaurantMenu />
            </span>
        </StyledEstablishmentDetails>
    );
};

export default EstablishmentDetails;
