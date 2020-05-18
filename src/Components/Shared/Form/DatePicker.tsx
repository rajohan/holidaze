import React, { useState } from "react";
import ReactDatePicker from "react-date-picker";
import { useField } from "formik";
import styled from "styled-components";

const StyledDatePickerWithLabel = styled.div<{ value: string; isCalendarOpen: boolean }>`
    position: relative;
    width: 100%;

    label {
        display: flex;
        align-items: center;
        position: absolute;
        user-select: none;
        cursor: text;
        top: -4px;
        left: 12px;
        color: ${(props): string => (props.isCalendarOpen ? props.theme.colors.tertiary : props.theme.colors.primary)};
        font-size: ${(props): string => (props.value || props.isCalendarOpen ? "13px" : "inherit")};
        font-weight: ${(props): number => (props.value || props.isCalendarOpen ? 700 : 400)};
        transform: translateY(${(props): string => (props.value || props.isCalendarOpen ? "9px" : "calc(50% + 5px)")});
        transition: transform 0.2s, font-size 0.2s, color 0.2s;

        svg {
            width: ${(props): string => (props.value || props.isCalendarOpen ? "18px" : "24px")};
            height: ${(props): string => (props.value || props.isCalendarOpen ? "18px" : "24px")};
            margin-right: 5px;
            fill: ${(props): string =>
                props.isCalendarOpen ? props.theme.colors.tertiary : props.theme.colors.primary};
        }
    }
`;

const StyledDatePicker = styled(ReactDatePicker)<{ isCalendarOpen: boolean }>`
    background-color: ${(props): string => props.theme.colors.white};
    margin-bottom: 10px;
    border-radius: 2px;
    width: 100%;

    .react-date-picker {
        &__wrapper {
            height: 50px;
            padding: 0 10px;
            border: 2px solid ${(props): string => props.theme.colors.tertiary};
            border-radius: 2px;
            align-items: center;
        }

        &__inputGroup {
            cursor: text;
            width: 100%;
            margin-top: ${(props): string => (props.value || props.isCalendarOpen ? "15px" : "0")};

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

            &__leadingZero {
                margin-left: 2px;
            }

            &__day,
            &__month,
            &__year,
            &__divider {
                background-color: transparent !important;
                opacity: ${(props): number => (props.value || props.isCalendarOpen ? 1 : 0)};
            }
        }

        &__calendar--open {
            top: unset !important;
            bottom: calc(100% + 3px) !important;
            left: 50% !important;
            transform: translateX(-50%);
        }
    }

    .react-calendar {
        color: ${(props): string => props.theme.colors.primary};

        &__month-view__days__day {
            &--weekend {
                color: ${(props): string => props.theme.colors.primary};
            }

            &--neighboringMonth {
                color: #757575 !important;
            }
        }

        &__tile {
            &--now {
                background-color: ${(props): string => props.theme.colors.secondary};
                color: ${(props): string => props.theme.colors.primary};

                &:disabled {
                    color: ${(props): string => props.theme.colors.primary};
                }

                &:enabled:hover,
                &:enabled:focus {
                    color: ${(props): string => props.theme.colors.black};
                    background-color: ${(props): string => props.theme.colors.secondaryDark};
                }
            }

            &--active {
                color: ${(props): string => props.theme.colors.white} !important;
                background-color: ${(props): string => props.theme.colors.tertiary} !important;

                &:hover {
                    background-color: ${(props): string => props.theme.colors.tertiaryDark} !important;
                }
            }
        }
    }
`;

type Props = {
    name: string;
    children?: React.ReactNode;
    minDate?: Date;
    activeStartDate?: Date;
    label?: string;
    onChange?: (value: Date | Date[]) => void;
};

const DatePicker: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { children, name, minDate, label, activeStartDate, onChange } = props;
    const [, meta, helpers] = useField(props.name);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <StyledDatePickerWithLabel value={meta.value} isCalendarOpen={isOpen}>
            <StyledDatePicker
                name={name}
                calendarIcon={null}
                dayPlaceholder="Day"
                monthPlaceholder="Month"
                yearPlaceholder="Year"
                format="dd-MM-y"
                showLeadingZeros={true}
                clearIcon={null}
                minDate={minDate}
                showFixedNumberOfWeeks={true}
                onCalendarOpen={(): void => setIsOpen(true)}
                onCalendarClose={(): void => setIsOpen(false)}
                isCalendarOpen={isOpen}
                isOpen={isOpen}
                activeStartDate={activeStartDate}
                value={meta.value}
                onChange={(value): void => {
                    onChange ? onChange(value) : helpers.setValue(value);
                }}
                onClick={(): void => setIsOpen(true)}
            />
            {label && (
                <label htmlFor={name} onClick={(): void => setIsOpen(true)}>
                    {children} {label}
                </label>
            )}
        </StyledDatePickerWithLabel>
    );
};

export default DatePicker;
