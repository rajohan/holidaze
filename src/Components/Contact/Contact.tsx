import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { Mail, Chat, Face } from "@material-ui/icons";

import Container400 from "../Layout/Containers/Container500";
import Heading from "../Shared/Heading";
import Form from "../Shared/Form/Form";
import Input from "../Shared/Form/Input/Input";
import Button from "../Shared/Form/Button";

const StyledContact = styled.div`
    display: flex;
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
    return (
        <Container400>
            <Heading size="h1">Contact us</Heading>
            <Heading size="h2">Get an answer within 24 hours</Heading>
            <StyledContact>
                <Formik initialValues={{ name: "", email: "", message: "" }} onSubmit={(): void => console.log("test")}>
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
                        <Button>Send Message</Button>
                    </Form>
                </Formik>
            </StyledContact>
        </Container400>
    );
};

export default Contact;
