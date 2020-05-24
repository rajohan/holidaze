import React from "react";
import styled from "styled-components";

import { GetAllEstablishments_getAllEstablishments } from "../../GraphQL/__generated__/GetAllEstablishments";
import { People } from "@material-ui/icons";
import Button from "../Shared/Form/Button";

const StyledEstablishmentsItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
    background-color: ${(props): string => props.theme.colors.secondary};
    border-radius: 2px;
    position: relative;

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
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 0 10px;

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
                text-transform: capitalize;
            }
        }
    }
`;

type Props = {
    className?: string;
    establishment: GetAllEstablishments_getAllEstablishments;
};

const EstablishmentsItem: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { className, establishment } = props;

    return (
        <StyledEstablishmentsItem className={className}>
            <img src={establishment.imageUrl} alt={establishment.name} />
            <span className="establishmentPrice">${establishment.price} / Person</span>
            <div className="establishmentDetails">
                <div className="establishmentDetailsRow">
                    <span className="establishmentDetailsRowName" title={establishment.name}>
                        {establishment.name}
                    </span>
                    <span className="establishmentDetailsRowMaxGuests">
                        <People titleAccess="Max Guests" />
                        {establishment.maxGuests}
                    </span>
                </div>
                <Button href={`/establishment/${establishment.id}/${establishment.name.replace(/\s/g, "-")}`}>
                    View
                </Button>
            </div>
        </StyledEstablishmentsItem>
    );
};

export default EstablishmentsItem;
