import React from "react";
import styled from "styled-components";
import { Formik, FormikProps } from "formik";
import moment from "moment";
import { Event, People, Today } from "@material-ui/icons";

import Form from "../Shared/Form/Form";
import DatePicker from "../Shared/Form/DatePicker";
import Input from "../Shared/Form/Input/Input";
import Button from "../Shared/Form/Button";

const StyledInput = styled(Input)`
    margin-bottom: 10px;
    width: 100%;
`;

const StyledEstablishmentEnquiry = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0 0 0;
    flex: 1;
    background-color: ${(props): string => props.theme.colors.secondary};
    padding: 15px;
    border-radius: 2px;

    @media only screen and (min-width: 900px) {
        margin: 10px 0 0 10px;
    }

    .enquiryPrice {
        margin-top: 20px;
        font-weight: 700;
    }

    .enquiryInputGroup {
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
`;

type Props = {
    maxGuests: number;
};

const EstablishmentEnquiry: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { maxGuests } = props;

    return (
        <StyledEstablishmentEnquiry>
            <h2>Enquiry this establishment</h2>
            <Formik
                initialValues={{ checkInDate: "", checkOutDate: "", guests: "" }}
                onSubmit={(values, { resetForm }): void => {
                    resetForm();
                    console.log(values);
                }}
            >
                {(
                    props: FormikProps<{
                        checkInDate: Date | string;
                        checkOutDate: Date | string;
                        guests: number | string;
                    }>
                ): React.ReactNode => (
                    <Form>
                        <DatePicker
                            name="checkInDate"
                            minDate={new Date()}
                            label="Check in date"
                            onChange={(value): void => {
                                const checkOutDate =
                                    !!props.values.checkInDate && !!props.values.checkOutDate
                                        ? moment(new Date(value as Date)).isBefore(new Date(props.values.checkOutDate))
                                            ? props.values.checkOutDate
                                            : moment(new Date(value as Date))
                                                  .add(1, "days")
                                                  .toDate()
                                        : props.values.checkOutDate;

                                props.setFieldValue("checkInDate", value);
                                props.setFieldValue("checkOutDate", checkOutDate);
                            }}
                        >
                            <Today />
                        </DatePicker>
                        <DatePicker
                            name="checkOutDate"
                            label="Check out date"
                            activeStartDate={props.values.checkInDate ? new Date(props.values.checkInDate) : new Date()}
                            minDate={
                                props.values.checkInDate
                                    ? moment(new Date(props.values.checkInDate)).add(1, "days").toDate()
                                    : new Date()
                            }
                        >
                            <Event />
                        </DatePicker>
                        <div className="enquiryInputGroup">
                            <StyledInput
                                name="guests"
                                label="Number of guests"
                                type="number"
                                min={1}
                                max={maxGuests}
                                step={1}
                            >
                                <People />
                            </StyledInput>
                            <Button>Continue</Button>
                        </div>
                    </Form>
                )}
            </Formik>
            <span className="enquiryPrice">Total price: $200.00</span>
        </StyledEstablishmentEnquiry>
    );
};

export default EstablishmentEnquiry;
