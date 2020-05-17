import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
import { Formik } from "formik";
import moment from "moment";
import DatePicker from "react-date-picker";
import { Event, People, Today, AttachMoney, RestaurantMenu, Favorite } from "@material-ui/icons";

import { EstablishmentGetEstablishmentQuery } from "./__generated__/EstablishmentGetEstablishmentQuery.graphql";
import Container1000 from "../Layout/Containers/Container1000";
import Heading from "../Shared/Heading";
import Form from "../Shared/Form/Form";
import Button from "../Shared/Form/Button";
import Input from "../Shared/Form/Input/Input";

const StyledHeading = styled(Heading)`
    letter-spacing: 2px;
    margin-bottom: 20px;
`;

const StyledInput = styled(Input)`
    margin-bottom: 10px;
    width: 100%;
`;

const StyledEstablishment = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;

    @media only screen and (min-width: 900px) {
        flex-direction: row;
        max-width: 100%;
    }

    @media only screen and (min-width: 950px) {
        max-width: 890px;
    }

    @media only screen and (min-width: 1050px) {
        max-width: 100%;
    }

    h2 {
        font-size: 17px;
        font-weight: 700;
        text-transform: capitalize;
        margin-bottom: 15px;
    }

    .establishment {
        &Column {
            display: flex;
            flex-direction: column;
            width: 100%;
            color: ${(props): string => props.theme.colors.primary};

            &:first-of-type {
                min-width: 100%;
                max-width: 100%;

                @media only screen and (min-width: 900px) {
                    min-width: 500px;
                    max-width: 500px;
                }

                @media only screen and (min-width: 1050px) {
                    min-width: 600px;
                    max-width: 600px;
                }
            }

            img {
                width: 500px;
                height: auto;
                border-radius: 2px;

                @media only screen and (min-width: 900px) {
                    width: 500px;
                    height: 281px;
                }

                @media only screen and (min-width: 1050px) {
                    width: 600px;
                    height: 337px;
                }
            }
        }

        &DetailsPrice {
            display: flex;
            flex-direction: column;

            @media only screen and (min-width: 450px) {
                flex-direction: row;
            }
        }

        &Details,
        &Price,
        &Description,
        &Map,
        &Enquiry {
            display: flex;
            flex-direction: column;
            background-color: ${(props): string => props.theme.colors.secondary};
            padding: 15px;
            border-radius: 2px;
        }

        &Details {
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
        }

        &Price,
        &Description {
            margin: 10px 0 0 0;
        }

        &Price {
            display: flex;
            flex-direction: column;
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
        }

        &Description {
            display: flex;
            flex-direction: column;
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
        }

        &Map {
            margin: 10px 0 0;

            @media only screen and (min-width: 900px) {
                margin: 0 0 0 10px;
                height: 281px;
            }

            @media only screen and (min-width: 1050px) {
                height: 337px;
            }
        }

        &Enquiry {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 10px 0 30px 0;
            flex: 1;

            @media only screen and (min-width: 900px) {
                margin: 10px 0 0 10px;
            }

            span {
                margin-top: 20px;
                font-weight: 700;
            }

            &InputGroup {
                display: flex;
                flex-direction: column;
                align-items: center;

                @media only screen and (min-width: 950px) {
                    flex-direction: row;
                    align-items: stretch;
                }

                button {
                    margin-top: 10px;

                    @media only screen and (min-width: 950px) {
                        margin: 0 0 10px 10px;
                    }
                }
            }
        }
    }
`;

const StyledDatePicker = styled(DatePicker)`
    background-color: ${(props): string => props.theme.colors.white};
    margin-bottom: 10px;
    border-radius: 2px;

    .react-date-picker {
        &__wrapper {
            height: 50px;
            padding: 0 10px;
            border: 2px solid ${(props): string => props.theme.colors.tertiary};
            border-radius: 2px;
            align-items: center;
        }

        &__inputGroup {
            order: 2;
            cursor: text;

            &__divider {
                color: ${(props): string => props.theme.colors.primary};
            }

            &__input {
                outline: none;

                &::placeholder {
                    color: ${(props): string => props.theme.colors.primary};
                }

                &:invalid {
                    background: ${(props): string => props.theme.colors.white};
                }
            }
        }

        &__clear-button {
            order: 3;
        }

        &__calendar-button {
            order: 1;
            padding: 0;
            outline: none;

            svg {
                width: 24px;
                height: 24px;
                fill: ${(props): string => props.theme.colors.primary};
                margin-right: 2px;
            }
        }
    }

    .react-calendar {
        color: ${(props): string => props.theme.colors.primary};

        &__month-view__days__day--weekend {
            color: ${(props): string => props.theme.colors.primary};
        }

        &__tile--now {
            background-color: ${(props): string => props.theme.colors.tertiary};
            color: ${(props): string => props.theme.colors.white};

            &:enabled:hover,
            &:enabled:focus {
                background-color: ${(props): string => props.theme.colors.tertiaryDark};
            }
        }
    }
`;

const Establishment: React.FC = (): React.ReactElement => {
    const { id } = useParams<{ id: string }>();

    const data = useLazyLoadQuery<EstablishmentGetEstablishmentQuery>(
        graphql`
            query EstablishmentGetEstablishmentQuery($id: ID!) {
                getEstablishment(id: $id, withEnquiries: false) {
                    id
                    name
                    imageUrl
                    price
                    maxGuests
                    googleLat
                    googleLong
                    description
                    selfCatering
                    createdAt
                    updatedAt
                }
            }
        `,
        { id: id },
        { fetchPolicy: "store-or-network" }
    );

    const {
        name,
        imageUrl,
        price,
        maxGuests,
        googleLat,
        googleLong,
        description,
        selfCatering,
        createdAt,
        updatedAt
    } = data.getEstablishment;

    return (
        <Container1000>
            <StyledHeading size="h1">{name}</StyledHeading>
            <StyledEstablishment>
                <div className="establishmentColumn">
                    <img src={imageUrl} alt={name} />
                    <div className="establishmentDetailsPrice">
                        <div className="establishmentDetails">
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
                        </div>
                        <div className="establishmentPrice">
                            <span>
                                <AttachMoney />
                                {price}
                            </span>
                            <span>Per person a night</span>
                        </div>
                    </div>
                    <div className="establishmentDescription">
                        <h2>Description</h2>
                        <p>{description}</p>
                        <small>
                            <span>Establishment added: {moment(createdAt as Date).format("DD.MM.YYYY")}</span>
                            <span>-</span>
                            <span>Establishment last updated: {moment(updatedAt as Date).format("DD.MM.YYYY")}</span>
                        </small>
                    </div>
                </div>
                <div className="establishmentColumn">
                    <div className="establishmentMap">
                        {googleLong} {googleLat}
                    </div>
                    <div className="establishmentEnquiry">
                        <h2>Enquiry this establishment</h2>
                        <Formik
                            initialValues={{ checkInDate: "", checkOutDate: "", guests: "" }}
                            onSubmit={(values, { resetForm }): void => {
                                resetForm();
                                console.log(values);
                            }}
                        >
                            <Form>
                                <StyledDatePicker
                                    name="checkInDate"
                                    calendarIcon={<Today />}
                                    dayPlaceholder="Day"
                                    monthPlaceholder="Month"
                                    yearPlaceholder="Year"
                                    format="dd-MM-y"
                                    showLeadingZeros={true}
                                    clearIcon={null}
                                    minDate={new Date()}
                                />
                                <StyledDatePicker
                                    name="checkOutDate"
                                    calendarIcon={<Event />}
                                    dayPlaceholder="Day"
                                    monthPlaceholder="Month"
                                    yearPlaceholder="Year"
                                    format="dd-MM-y"
                                    showLeadingZeros={true}
                                    clearIcon={null}
                                    minDate={new Date()}
                                />
                                <div className="establishmentEnquiryInputGroup">
                                    <StyledInput name="guests" label="Number of guests" type="number">
                                        <People />
                                    </StyledInput>
                                    <Button>Send Message</Button>
                                </div>
                            </Form>
                        </Formik>
                        <span>Total price: $200.00</span>
                    </div>
                </div>
            </StyledEstablishment>
        </Container1000>
    );
};

export default Establishment;
