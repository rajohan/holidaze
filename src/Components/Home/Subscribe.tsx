import React from "react";
import styled from "styled-components";
import { Mail } from "@material-ui/icons";
import { Formik } from "formik";

import Input from "../Shared/Form/Input/Input";
import Button from "../Shared/Form/Button";
import Form from "../Shared/Form/Form";

const StyledSubscribe = styled.div`
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
    }
`;

const Subscribe: React.FC = (): React.ReactElement => {
    return (
        <StyledSubscribe>
            <Formik initialValues={{ subscribeEmail: "" }} onSubmit={(): void => console.log("test")}>
                <Form>
                    <StyledInput name="subscribeEmail" label="Your email address" type="email">
                        <Mail />
                    </StyledInput>
                    <Button>Subscribe</Button>
                </Form>
            </Formik>
        </StyledSubscribe>
    );
};

export default Subscribe;
