import React, { useState } from "react";
import styled from "styled-components";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { Event, People, Today } from "@material-ui/icons";

import Form from "../Shared/Form/Form";
import DatePicker from "../Shared/Form/DatePicker";
import Input from "../Shared/Form/Input/Input";
import Button from "../Shared/Form/Button";

const EstablishmentModal = React.lazy(() => import("./EstablishmentModal"));

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
        text-align: center;
    }

    .enquiryInputGroup {
        display: flex;
        flex-direction: column;
        align-items: center;

        @media only screen and (min-width: 950px) {
            flex-direction: row;
            align-items: flex-start;
        }

        button {
            margin-top: 10px;
            padding: 16px 0;

            @media only screen and (min-width: 950px) {
                margin: 0 0 10px 10px;
            }
        }
    }
`;

type Props = {
    maxGuests: number;
    establishmentId: string;
    price: number;
};

const EstablishmentEnquiry: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { maxGuests, establishmentId, price } = props;
    const [showModal, setShowModal] = useState(false);
    const [reset, setReset] = useState<() => void>();
    const [formValues, setFormValues] = useState({ checkInDate: "", checkOutDate: "", guests: "" });

    const calculateTotPrice = (price: number, guests: number, date1: Date | string, date2: Date | string): number => {
        const days = moment(date2).diff(moment(date1), "days");
        const priceWithoutDays = guests > 1 ? price * guests : price;

        return days > 1 ? priceWithoutDays * days : priceWithoutDays;
    };

    return (
        <React.Fragment>
            <StyledEstablishmentEnquiry>
                <h2>Enquiry this establishment</h2>
                <Formik
                    initialValues={{ checkInDate: "", checkOutDate: "", guests: "" }}
                    validationSchema={Yup.object({
                        checkInDate: Yup.date().required("Check in date is required."),
                        checkOutDate: Yup.date().required("Check out date is required."),
                        guests: Yup.number()
                            .required("Number of guests is required.")
                            .min(1, "Minimum 1 guest is required")
                            .max(maxGuests, `Max ${maxGuests} guests allowed on this establishment.`)
                    })}
                    onSubmit={(values, { resetForm }): void => {
                        setFormValues(values);
                        setReset(() => resetForm);
                        setShowModal(true);
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
                                            ? moment(new Date(value as Date)).isBefore(
                                                  new Date(props.values.checkOutDate)
                                              )
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
                                activeStartDate={
                                    props.values.checkInDate ? new Date(props.values.checkInDate) : new Date()
                                }
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
                            <span className="enquiryPrice">
                                Total price: $
                                {calculateTotPrice(
                                    price,
                                    parseInt(props.values.guests as string),
                                    props.values.checkInDate,
                                    props.values.checkOutDate
                                )}
                            </span>
                        </Form>
                    )}
                </Formik>
            </StyledEstablishmentEnquiry>
            <EstablishmentModal
                showModal={showModal}
                setShowModal={setShowModal}
                checkInDate={new Date(formValues.checkInDate)}
                checkOutDate={new Date(formValues.checkOutDate)}
                guests={parseInt(formValues.guests)}
                maxGuests={maxGuests}
                establishmentId={establishmentId}
                price={price}
                resetMainForm={(): void => {
                    reset && reset();
                    setFormValues({ checkInDate: "", checkOutDate: "", guests: "" });
                }}
            />
        </React.Fragment>
    );
};

export default EstablishmentEnquiry;
