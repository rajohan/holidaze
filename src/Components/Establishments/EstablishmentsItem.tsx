import React from "react";
import styled from "styled-components";
import { Favorite, People } from "@material-ui/icons";

import { GetAllEstablishments_getAllEstablishments } from "../../GraphQL/__generated__/GetAllEstablishments";
import Button from "../Shared/Form/Button";
import { createSlug } from "../../utils/createSlug";
import { useMutation, useQuery } from "@apollo/client";
import { TOGGLE_ESTABLISHMENT_WISHLIST_MUTATION } from "../../GraphQL/Mutations";
import {
    ToggleEstablishmentWishlist,
    ToggleEstablishmentWishlistVariables
} from "../../GraphQL/__generated__/ToggleEstablishmentWishlist";
import { CURRENT_USER_QUERY, GET_ALL_ESTABLISHMENTS_QUERY } from "../../GraphQL/Queries";
import { CurrentUser } from "../../GraphQL/__generated__/CurrentUser";

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
        }
    }
`;

type Props = {
    className?: string;
    establishment: GetAllEstablishments_getAllEstablishments;
};

const EstablishmentsItem: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { className, establishment } = props;
    const { data } = useQuery<CurrentUser>(CURRENT_USER_QUERY);
    const [toggleWishlist, { loading }] = useMutation<
        ToggleEstablishmentWishlist,
        ToggleEstablishmentWishlistVariables
    >(TOGGLE_ESTABLISHMENT_WISHLIST_MUTATION);

    const isOnWishlist = (): boolean => {
        if (!data || !data.user) {
            return false;
        }

        if (!establishment.wishlist) {
            return false;
        }

        const isOn = establishment.wishlist.filter((wishlist) => wishlist.userId === data.user?.id);

        return isOn.length > 0;
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
                        <Favorite /> 21
                    </span>
                </div>
                <div className="establishmentDetailsRight">
                    <div className="establishmentDetailsRightColumn">
                        <People titleAccess="Max Guests" />
                        <Favorite
                            className={isOnWishlist() ? "wishlist onWishlist" : "wishlist"}
                            onClick={async (): Promise<void> => {
                                if (!loading) {
                                    try {
                                        await toggleWishlist({
                                            variables: { establishmentId: establishment.id },
                                            refetchQueries: [{ query: GET_ALL_ESTABLISHMENTS_QUERY }],
                                            awaitRefetchQueries: true
                                        });
                                    } catch (error) {
                                        console.log(error);
                                    }
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
