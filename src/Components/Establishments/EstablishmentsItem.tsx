import React from "react";
import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { Favorite, People } from "@material-ui/icons";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";

import {
    ToggleEstablishmentWishlist,
    ToggleEstablishmentWishlistVariables
} from "../../GraphQL/__generated__/ToggleEstablishmentWishlist";
import { RateEstablishment, RateEstablishmentVariables } from "../../GraphQL/__generated__/RateEstablishment";
import { CurrentUser } from "../../GraphQL/__generated__/CurrentUser";
import { GetAllEstablishments_getAllEstablishments } from "../../GraphQL/__generated__/GetAllEstablishments";
import { RATE_ESTABLISHMENT_MUTATION, TOGGLE_ESTABLISHMENT_WISHLIST_MUTATION } from "../../GraphQL/Mutations";
import { GET_ALL_ESTABLISHMENTS_QUERY } from "../../GraphQL/Queries";
import Button from "../Shared/Form/Button";
import { createSlug } from "../../utils/createSlug";

const StyledEstablishmentsItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
    background-color: ${(props): string => props.theme.colors.secondary};
    border-radius: 2px;
    position: relative;

    a {
        margin-top: 10px;
    }

    img {
        width: 100%;
        height: 167px;
        object-fit: cover;
        object-position: center 65%;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;

        @media only screen and (min-width: 350px) {
            width: 313px;
            height: 207px;
        }
    }

    .establishmentPrice {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: ${(props): string => props.theme.colors.secondary60};
        padding: 5px;
        font-size: 14px;
        font-weight: 700;
    }

    .establishmentDetails {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 5px 10px 0 10px;

        span {
            display: flex;
            height: 24px;
            align-items: center;
        }

        svg {
            width: 24px;
            height: 24px;
            margin-right: 3px;
            fill: ${(props): string => props.theme.colors.primary};

            &.wishlist {
                cursor: pointer;
            }

            &.onWishlist {
                fill: ${(props): string => props.theme.colors.error};
            }
        }

        &Column {
            display: flex;
            flex-direction: column;
            max-width: calc(100% - 50px);
        }

        &Right {
            display: flex;
            align-items: center;

            &Column {
                display: flex;
                flex-direction: column;
                position: relative;
            }
        }

        &Name {
            margin-right: 10px;
            font-weight: 700;
            white-space: nowrap;
            display: inline-block !important;
            padding-top: 2px;
            overflow: hidden;
            text-overflow: ellipsis;
            text-transform: capitalize;
            text-align: left;
        }
    }
`;

const StyledRate = styled(Rate)`
    &.rc-rate {
        font-size: 24px;
        line-height: 1;
    }

    li {
        margin-right: 2px;
        line-height: 1;
        color: #000;
        cursor: ${(props): string => (props.disabled ? "default" : "pointer")};
    }
    li div {
        outline: none;
    }
`;

type Props = {
    className?: string;
    establishment: GetAllEstablishments_getAllEstablishments;
    currentUser: CurrentUser;
};

const EstablishmentsItem: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { className, establishment, currentUser } = props;

    const [toggleWishlist, { loading }] = useMutation<
        ToggleEstablishmentWishlist,
        ToggleEstablishmentWishlistVariables
    >(TOGGLE_ESTABLISHMENT_WISHLIST_MUTATION);

    const [rateEstablishment, { loading: loading2 }] = useMutation<RateEstablishment, RateEstablishmentVariables>(
        RATE_ESTABLISHMENT_MUTATION
    );

    const isOnWishlist = (): boolean => {
        if (!currentUser || !currentUser.user) {
            return false;
        }

        if (!establishment.wishlist) {
            return false;
        }

        const isOn = establishment.wishlist.filter((wishlist) => wishlist.userId === currentUser.user?.id);

        return isOn.length > 0;
    };

    const getRating = (): number => {
        let totRating = 0;

        if (!establishment.rating) {
            return totRating;
        }

        for (let i = 0; i < establishment.rating.length; i++) {
            totRating = establishment.rating[i].rating + totRating;
        }

        totRating = totRating / establishment.rating.length;

        return parseInt((totRating * 2).toFixed()) / 2;
    };

    return (
        <StyledEstablishmentsItem className={className}>
            <img src={establishment.imageUrl} alt={establishment.name} />
            <span className="establishmentPrice">${establishment.price} / Person</span>
            <div className="establishmentDetails">
                <div className="establishmentDetailsColumn">
                    <span className="establishmentDetailsName" title={establishment.name}>
                        {establishment.name}
                    </span>
                    <span>
                        <StyledRate
                            defaultValue={getRating()}
                            value={getRating()}
                            allowHalf={true}
                            onChange={async (rating): Promise<void> => {
                                if (!loading2 && currentUser && currentUser.user) {
                                    await rateEstablishment({
                                        variables: { establishmentId: establishment.id, rating },
                                        refetchQueries: [{ query: GET_ALL_ESTABLISHMENTS_QUERY }],
                                        awaitRefetchQueries: true
                                    });
                                }
                            }}
                            disabled={!(currentUser && currentUser.user) || loading2}
                        />
                    </span>
                </div>
                <div className="establishmentDetailsRight">
                    <div className="establishmentDetailsRightColumn">
                        <People titleAccess="Max Guests" />
                        <Favorite
                            titleAccess={
                                currentUser && currentUser.user
                                    ? "Wishlist"
                                    : "The wishlist feature is only available when signed in"
                            }
                            className={
                                currentUser && currentUser.user
                                    ? isOnWishlist()
                                        ? "wishlist onWishlist"
                                        : "wishlist"
                                    : ""
                            }
                            onClick={async (): Promise<void> => {
                                if (!loading && currentUser && currentUser.user) {
                                    await toggleWishlist({
                                        variables: { establishmentId: establishment.id },
                                        refetchQueries: [{ query: GET_ALL_ESTABLISHMENTS_QUERY }],
                                        awaitRefetchQueries: true
                                    });
                                }
                            }}
                        />
                    </div>
                    <div className="establishmentDetailsRightColumn">
                        <span>{establishment.maxGuests}</span>
                        <span>{establishment.wishlist ? establishment.wishlist.length : 0}</span>
                    </div>
                </div>
            </div>
            <Button href={`/establishment/${establishment.id}/${createSlug(establishment.name)}`}>View</Button>
        </StyledEstablishmentsItem>
    );
};

export default EstablishmentsItem;
