import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { Mail } from "@material-ui/icons";
import { Formik } from "formik";
import * as Yup from "yup";

import { ADD_TO_NEWSLETTER_MUTATION } from "../../GraphQL/Mutations";
import { AddToNewsletter, AddToNewsletterVariables } from "../../GraphQL/__generated__/AddToNewsletter";
import Input from "../Shared/Form/Input/Input";
import Button from "../Shared/Form/Button";
import Form from "../Shared/Form/Form";
import Success from "../Shared/Form/Success";

const StyledSubscribe = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 2px;
    padding: 30px 30px;
    margin: 30px;
    width: 100%;
    max-width: 312px;
    background-color: ${(props): string => props.theme.colors.secondary};

    @media only screen and (min-width: 703px) {
        max-width: 656px;
        padding: 60px 30px;
    }

    @media only screen and (min-width: 1075px) {
        max-width: 1000px;
    }

    button {
        margin-top: 20px;

        @media only screen and (min-width: 703px) {
            margin-top: 0;
        }
    }

    form {
        flex-direction: column;
        align-items: center;

        @media only screen and (min-width: 703px) {
            flex-direction: row;
            justify-content: center;
            align-items: stretch;
        }
    }
`;

const StyledInput = styled(Input)`
    max-width: 500px;
    width: 100%;
    margin-right: 0;

    @media only screen and (min-width: 703px) {
        margin-right: 20px;
        height: 54px;
    }
`;

const StyledSuccess = styled(Success)`
    max-width: 500px;
`;

const Subscribe: React.FC = (): React.ReactElement => {
    const [success, setSuccess] = useState(false);
    const [subscribe, { loading }] = useMutation<AddToNewsletter, AddToNewsletterVariables>(ADD_TO_NEWSLETTER_MUTATION);

    return (
        <StyledSubscribe>
            {success && <StyledSuccess>Thanks! You are now subscribed to our newsletters.</StyledSuccess>}
            <Formik
                initialValues={{ subscribeEmail: "" }}
                validationSchema={Yup.object({
                    subscribeEmail: Yup.string().required("Email is required.").email("Invalid email address.")
                })}
                onSubmit={async (values, { resetForm }): Promise<void> => {
                    await subscribe({ variables: { email: values.subscribeEmail } });
                    resetForm();
                    setSuccess(true);
                }}
            >
                <Form>
                    <StyledInput name="subscribeEmail" label="Your email address" type="email">
                        <Mail />
                    </StyledInput>
                    <Button disabled={loading} onClick={(): void => setSuccess(false)}>
                        Subscribe
                    </Button>
                </Form>
            </Formik>
        </StyledSubscribe>
    );
};

export default Subscribe;
