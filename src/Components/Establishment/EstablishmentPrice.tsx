import React from "react";
import styled from "styled-components";
import { AttachMoney } from "@material-ui/icons";

const StyledEstablishmentPrice = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${(props): string => props.theme.colors.secondary};
    padding: 15px;
    border-radius: 2px;
    margin: 10px 0 0 0;
    align-items: center;
    justify-content: center;

    span:first-of-type {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 700;
    }

    span:last-of-type {
        white-space: nowrap;
    }

    svg {
        width: 24px;
        height: 24px;
        margin: 0 -4px;
        fill: ${(props): string => props.theme.colors.primary};
    }
`;

type Props = {
    price: number;
};

const EstablishmentPrice: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { price } = props;

    return (
        <StyledEstablishmentPrice>
            <span>
                <AttachMoney />
                {price}
            </span>
            <span>Per person a night</span>
        </StyledEstablishmentPrice>
    );
};

export default EstablishmentPrice;
