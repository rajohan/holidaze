import React, { useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { Mail, Chat, Face } from "@material-ui/icons";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";

import Container400 from "../Layout/Containers/Container500";
import Heading from "../Shared/Heading";
import Form from "../Shared/Form/Form";
import Input from "../Shared/Form/Input/Input";
import Button from "../Shared/Form/Button";

const Success = React.lazy(() => import("../Shared/Form/Success"));

const StyledContact = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${(props): string => props.theme.colors.secondary};
    width: 100%;
    padding: 30px;
    margin: 30px 0;
    border-radius: 2px;

    button {
        margin-top: 10px;
        align-self: center;
    }
`;

const StyledInput = styled(Input)`
    margin-bottom: 20px;
`;

const Contact: React.FC = (): React.ReactElement => {
    const [success, setSuccess] = useState(false);

    return (
        <React.Fragment>
            <Helmet>
                <title>Holidaze - Contact</title>
            </Helmet>
            <Container400>
                <Heading size="h1">Contact us</Heading>
                <Heading size="h2">Get an answer within 24 hours</Heading>
                <StyledContact>
                    {success && <Success>Your message has been successfully sent.</Success>}
                    <Formik
                        initialValues={{ name: "", email: "", message: "" }}
                        validationSchema={Yup.object({
                            name: Yup.string()
                                .required("Name is required.")
                                .min(3, "Your name must be at least 3 characters."),
                            email: Yup.string().required("Email is required.").email("Invalid email address."),
                            message: Yup.string()
                                .required("Message is required.")
                                .min(10, "The message must be at least 10 characters.")
                        })}
                        onSubmit={(values, { resetForm }): void => {
                            resetForm();
                            setSuccess(true);
                            console.log(values);
                        }}
                    >
                        <Form>
                            <StyledInput name="name" label="Your name" type="text">
                                <Face />
                            </StyledInput>
                            <StyledInput name="email" label="Your email address" type="email">
                                <Mail />
                            </StyledInput>
                            <StyledInput name="message" label="Your message" type="textarea">
                                <Chat />
                            </StyledInput>
                            <Button onClick={(): void => setSuccess(false)}>Send Message</Button>
                        </Form>
                    </Formik>
                </StyledContact>
            </Container400>
        </React.Fragment>
    );
};

export default Contact;
