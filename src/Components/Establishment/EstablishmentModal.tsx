import React, { useState } from "react";
import styled from "styled-components";
import { Formik, FormikProps } from "formik";
import moment from "moment";
import { Event, People, Today } from "@material-ui/icons";

import Modal from "../Shared/Modal";
import Form from "../Shared/Form/Form";
import DatePicker from "../Shared/Form/DatePicker";
import Button from "../Shared/Form/Button";
import Input from "../Shared/Form/Input/Input";
import * as Yup from "yup";
import Success from "../Shared/Form/Success";
import { useMutation } from "@apollo/client";
import { NEW_ENQUIRY_MUTATION } from "../../GraphQL/Mutations";
import { NewEnquiry, NewEnquiryVariables } from "../../GraphQL/__generated__/NewEnquiry";

const StyledInput = styled(Input)`
    margin-bottom: 10px;
    width: 100%;
`;

const StyledModal = styled(Modal)`
    align-items: center;
    justify-content: center;
    max-width: 400px;

    h1 {
        font-size: 18px;
        font-weight: 700;
        text-transform: capitalize;
        margin-bottom: 15px;
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

    .enquiryPrice {
        margin-top: 10px;
        font-weight: 700;
        text-align: center;
    }

    .enquiryNewAccount {
        margin: 20px 0;
    }

    .react-date-picker {
        &__calendar--open {
            top: unset !important;
            bottom: 50% !important;
            left: 50% !important;
            transform: translate(-50%, 50%);
        }
    }
`;

type Props = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    checkOutDate: Date | string;
    checkInDate: Date | string;
    guests: number | string;
    maxGuests: number;
    establishmentId: string;
    price: number;
    resetMainForm: () => void;
};

const EstablishmentModal: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const {
        showModal,
        setShowModal,
        checkOutDate,
        checkInDate,
        guests,
        maxGuests,
        establishmentId,
        price,
        resetMainForm
    } = props;
    const [success, setSuccess] = useState(false);
    const [addEnquiry, { loading }] = useMutation<NewEnquiry, NewEnquiryVariables>(NEW_ENQUIRY_MUTATION);

    const calculateTotPrice = (price: number, guests: number, date1: Date | string, date2: Date | string): number => {
        const days = moment(date2).diff(moment(date1), "days");
        const priceWithoutDays = guests > 1 ? price * guests : price;

        return days > 1 ? priceWithoutDays * days : priceWithoutDays;
    };

    return (
        <StyledModal
            showModal={showModal}
            setShowModal={setShowModal}
            onCloseButtonClick={(): void => setSuccess(false)}
            closeOnClickOutside={false}
        >
            <h1>Finish your enquiry</h1>
            {success && <Success>Your enquiry has been successfully added.</Success>}
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    checkInDate2: checkInDate,
                    checkOutDate2: checkOutDate,
                    guests2: guests
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required("Name is required.").min(3, "Your name must be at least 3 characters."),
                    email: Yup.string().required("Email is required.").email("Invalid email address."),
                    checkInDate2: Yup.date().required("Check in date is required."),
                    checkOutDate2: Yup.date().required("Check out date is required."),
                    guests2: Yup.number()
                        .required("Number of guests is required.")
                        .min(1, "Minimum 1 guest is required")
                        .max(maxGuests, `Max ${maxGuests} guests allowed on this establishment.`)
                })}
                onSubmit={async (values, { resetForm }): Promise<void> => {
                    await addEnquiry({
                        variables: {
                            establishmentId: establishmentId,
                            clientName: values.name,
                            email: values.email,
                            checkin: values.checkInDate2,
                            checkout: values.checkOutDate2,
                            guests: values.guests2 as number
                        }
                    });
                    resetMainForm();
                    resetForm({ values: { name: "", email: "", checkInDate2: "", checkOutDate2: "", guests2: "" } });
                    setSuccess(true);
                }}
            >
                {(
                    props: FormikProps<{
                        name: string;
                        email: string;
                        checkInDate2: Date | string;
                        checkOutDate2: Date | string;
                        guests2: number | string;
                    }>
                ): React.ReactNode => (
                    <Form>
                        <StyledInput name="name" label="Your name">
                            <People />
                        </StyledInput>
                        <StyledInput name="email" label="Your email">
                            <People />
                        </StyledInput>
                        <DatePicker
                            name="checkInDate2"
                            minDate={new Date()}
                            label="Check in date"
                            onChange={(value): void => {
                                const checkOutDate =
                                    !!props.values.checkInDate2 && !!props.values.checkOutDate2
                                        ? moment(new Date(value as Date)).isBefore(new Date(props.values.checkOutDate2))
                                            ? props.values.checkOutDate2
                                            : moment(new Date(value as Date))
                                                  .add(1, "days")
                                                  .toDate()
                                        : props.values.checkOutDate2;

                                props.setFieldValue("checkInDate", value);
                                props.setFieldValue("checkOutDate", checkOutDate);
                            }}
                        >
                            <Today />
                        </DatePicker>
                        <DatePicker
                            name="checkOutDate2"
                            label="Check out date"
                            activeStartDate={
                                props.values.checkInDate2 ? new Date(props.values.checkInDate2) : new Date()
                            }
                            minDate={
                                props.values.checkInDate2
                                    ? moment(new Date(props.values.checkInDate2)).add(1, "days").toDate()
                                    : new Date()
                            }
                        >
                            <Event />
                        </DatePicker>
                        <div className="enquiryInputGroup">
                            <StyledInput
                                name="guests2"
                                label="Number of guests"
                                type="number"
                                min={1}
                                max={maxGuests}
                                step={1}
                            >
                                <People />
                            </StyledInput>
                            <Button disabled={loading} onClick={(): void => setShowModal(true)}>
                                Send Enquiry
                            </Button>
                        </div>
                        <span className="enquiryPrice">
                            Total price: $
                            {calculateTotPrice(
                                price,
                                parseInt(props.values.guests2 as string),
                                props.values.checkInDate2,
                                props.values.checkOutDate2
                            )}
                        </span>
                    </Form>
                )}
            </Formik>
            <p className="enquiryNewAccount">
                An account will be created for you on submission where you can follow the enquiry status. The account
                password will be sent to the provided email address.
            </p>
        </StyledModal>
    );
};

export default EstablishmentModal;
