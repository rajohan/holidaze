import React from "react";
import styled from "styled-components";
import moment from "moment";

const StyledEstablishmentDescription = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${(props): string => props.theme.colors.secondary};
    padding: 15px;
    border-radius: 2px;
    margin: 10px 0 0 0;
    align-items: center;
    flex: 1;

    p {
        margin-bottom: 30px;
    }

    small {
        display: flex;
        flex-direction: column;
        margin-top: auto;
        text-align: center;

        span {
            &:first-of-type {
                padding-bottom: 3px;
            }

            &:nth-of-type(2) {
                display: none;
            }
        }

        @media only screen and (min-width: 550px) {
            flex-direction: row;

            span {
                padding: 0 2px;

                &:nth-of-type(2) {
                    display: inline-block;
                }
            }
        }
    }
`;

type Props = {
    description: string;
    createdAt: Date;
    updatedAt: Date;
};

const EstablishmentDescription: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { description, createdAt, updatedAt } = props;

    return (
        <StyledEstablishmentDescription>
            <h2>Description</h2>
            <p>{description}</p>
            <small>
                <span>Establishment added: {moment(createdAt as Date).format("DD.MM.YYYY")}</span>
                <span>-</span>
                <span>Establishment last updated: {moment(updatedAt as Date).format("DD.MM.YYYY")}</span>
            </small>
        </StyledEstablishmentDescription>
    );
};

export default EstablishmentDescription;
