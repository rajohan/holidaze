import React from "react";
import styled from "styled-components";
import { useFragment } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
import { People } from "@material-ui/icons";

import Button from "../../Shared/Button";
import { EstablishmentsCarouselItemGetAllEstablishments$key } from "./__generated__/EstablishmentsCarouselItemGetAllEstablishments.graphql";

const StyledEstablishmentsCarouselItem = styled.div`
    width: 200px;
    padding: 15px;
    position: relative;

    @media only screen and (min-width: 450px) {
        width: 250px;
    }

    @media only screen and (min-width: 850px) {
        width: 300px;
        padding: 30px 15px;
    }

    img {
        width: 100%;
        height: 133px;
        object-fit: cover;
        object-position: center 65%;
        border-radius: 2px;

        @media only screen and (min-width: 450px) {
            height: 166px;
        }

        @media only screen and (min-width: 850px) {
            height: 199px;
        }
    }

    .establishmentPrice {
        position: absolute;
        top: 25px;
        right: 25px;
        background-color: ${(props): string => props.theme.colors.secondary60};
        padding: 5px;
        font-size: 14px;
        font-weight: 700;

        @media only screen and (min-width: 850px) {
            top: 40px;
        }
    }

    .establishmentDetails {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        a {
            margin-top: 10px;
        }

        &Row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;

            &MaxGuests {
                display: flex;
                align-items: center;
                margin: 5px 3px;

                svg {
                    width: 24px;
                    height: 24px;
                    margin-right: 3px;
                    fill: ${(props): string => props.theme.colors.primary};
                }
            }

            &Name {
                margin-right: 10px;
                font-weight: 700;
                white-space: nowrap;
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
`;

type Props = {
    getAllEstablishments: EstablishmentsCarouselItemGetAllEstablishments$key;
};

const EstablishmentsCarouselItem: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const data = useFragment<EstablishmentsCarouselItemGetAllEstablishments$key>(
        graphql`
            fragment EstablishmentsCarouselItemGetAllEstablishments on EstablishmentType {
                id
                name
                imageUrl
                maxGuests
                price
            }
        `,
        props.getAllEstablishments
    );

    return (
        <StyledEstablishmentsCarouselItem>
            <img src={data.imageUrl} alt={data.name} />
            <span className="establishmentPrice">${data.price} / Person</span>
            <div className="establishmentDetails">
                <div className="establishmentDetailsRow">
                    <span className="establishmentDetailsRowName" title={data.name}>
                        {data.name}
                    </span>
                    <span className="establishmentDetailsRowMaxGuests">
                        <People />
                        {data.maxGuests}
                    </span>
                </div>
                <Button href={`/establishment/${data.id}/${data.name.replace(/\s/g, "-")}`}>View</Button>
            </div>
        </StyledEstablishmentsCarouselItem>
    );
};

export default EstablishmentsCarouselItem;
