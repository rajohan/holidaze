import React, { useState } from "react";
import styled from "styled-components";
import { Mail } from "@material-ui/icons";

import Input from "../Shared/Input";
import Button from "../Shared/Button";

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
        flex-direction: row;
        align-items: stretch;
        justify-content: center;
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
    const [email, setEmail] = useState("");

    return (
        <StyledSubscribe>
            <StyledInput
                name="subscribeEmail"
                label="Your email address"
                type="email"
                value={email}
                onChange={({ value }): void => setEmail(value)}
            >
                <Mail />
            </StyledInput>
            <Button>Subscribe</Button>
        </StyledSubscribe>
    );
};

export default Subscribe;
