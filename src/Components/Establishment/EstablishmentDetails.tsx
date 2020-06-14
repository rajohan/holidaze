import React from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "@apollo/client";
import { Favorite, People, RestaurantMenu } from "@material-ui/icons";
import Rate from "react-star-picker";

import { CurrentUser } from "../../GraphQL/__generated__/CurrentUser";
import {
    ToggleEstablishmentWishlist,
    ToggleEstablishmentWishlistVariables
} from "../../GraphQL/__generated__/ToggleEstablishmentWishlist";
import {
    GetEstablishment_getEstablishment_rating,
    GetEstablishment_getEstablishment_wishlist
} from "../../GraphQL/__generated__/GetEstablishment";
import { CURRENT_USER_QUERY, GET_ALL_ESTABLISHMENTS_QUERY, GET_ESTABLISHMENT_QUERY } from "../../GraphQL/Queries";
import { RATE_ESTABLISHMENT_MUTATION, TOGGLE_ESTABLISHMENT_WISHLIST_MUTATION } from "../../GraphQL/Mutations";
import { RateEstablishment, RateEstablishmentVariables } from "../../GraphQL/__generated__/RateEstablishment";

const StyledEstablishmentDetails = styled.div<{ wishListDisabled: boolean }>`
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
                cursor: ${(props): string => (props.wishListDisabled ? "not-allowed" : "pointer")};
            }

            &.onWishlist {
                fill: ${(props): string => props.theme.colors.error};
            }
        }
    }
`;

const StyledRate = styled(Rate)`
    display: flex;

    button {
        outline: none;
    }
`;

type Props = {
    maxGuests: number;
    selfCatering: boolean;
    establishmentId: string;
    wishlist: GetEstablishment_getEstablishment_wishlist[] | null;
    rating: GetEstablishment_getEstablishment_rating[] | null;
};

const EstablishmentDetails: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { maxGuests, selfCatering, establishmentId, wishlist, rating } = props;
    const { data } = useQuery<CurrentUser>(CURRENT_USER_QUERY);
    const [toggleWishlist, { loading }] = useMutation<
        ToggleEstablishmentWishlist,
        ToggleEstablishmentWishlistVariables
    >(TOGGLE_ESTABLISHMENT_WISHLIST_MUTATION);
    const [rateEstablishment, { loading: loading2 }] = useMutation<RateEstablishment, RateEstablishmentVariables>(
        RATE_ESTABLISHMENT_MUTATION
    );

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

    const getRating = (): number => {
        let totRating = 0;

        if (!rating) {
            return totRating;
        }

        for (let i = 0; i < rating.length; i++) {
            totRating = rating[i].rating + totRating;
        }

        totRating = totRating / rating.length;

        return parseInt((totRating * 2).toFixed()) / 2;
    };

    return (
        <StyledEstablishmentDetails wishListDisabled={!(data && data.user)}>
            <span>
                Rating:{" "}
                <span
                    aria-label="Rating"
                    title={!(data && data.user) ? "The rating feature is only available when signed in." : ""}
                >
                    <StyledRate
                        value={getRating()}
                        halfStars={true}
                        onChange={async (rating: number): Promise<void> => {
                            if (!loading2 && data && data.user) {
                                await rateEstablishment({
                                    variables: { establishmentId, rating },
                                    refetchQueries: [{ query: GET_ALL_ESTABLISHMENTS_QUERY }],
                                    awaitRefetchQueries: true
                                });
                            }
                        }}
                        disabled={!(data && data.user) || loading2}
                        starRendererProps={{
                            colorActive: "#f5a623",
                            colorInactive: "#1B262C",
                            colorAdd: "#f5a623",
                            colorRemove: "#1B262C"
                        }}
                        size={24}
                    />
                </span>
            </span>
            <span>
                Max Guests: {maxGuests} <People />
            </span>
            <span>
                Wishlists: {wishlist ? wishlist.length : 0}{" "}
                <Favorite
                    titleAccess={data && data.user ? "" : "The wishlist feature is only available when signed in"}
                    className={data && data.user ? (isOnWishlist() ? "wishlist onWishlist" : "wishlist") : "wishlist"}
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
                    aria-label="Wishlist"
                />
            </span>
            <span>
                Self Catering: {selfCatering ? "Yes" : "No"} <RestaurantMenu />
            </span>
        </StyledEstablishmentDetails>
    );
};

export default EstablishmentDetails;
