import React from "react";
import styled from "styled-components";
import { HeadsetMic, AttachMoney } from "@material-ui/icons";

import headerBackground from "../../assets/images/homeHeader.jpg";
import { ReactComponent as Logo } from "../../assets/images/logo/logoLight.svg";
import { ReactComponent as MeetBergen } from "../../assets/images/meetBergen.svg";
import Navigation from "../Layout/Navigation";

const StyledHeader = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(to right bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${headerBackground});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    color: ${(props): string => props.theme.colors.secondary};
    width: 100%;
    padding: 30px;

    .logo {
        width: 200px;
        height: auto;
    }

    .logoNav {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .meetBergen {
        width: 500px;
        margin: 65px 0;
        height: auto;
    }

    .inputWrapper {
        background-color: ${(props): string => props.theme.colors.secondary60};
        border-radius: 2px;
        padding: 10px;
        margin-bottom: 30px;

        input {
            width: 600px;
            padding: 15px;
            border-radius: 2px;
        }
    }

    .headerText {
        filter: ${(props): string => props.theme.dropShadows.small};

        svg {
            width: 24px;
            height: 24px;
            fill: ${(props): string => props.theme.colors.secondary};
        }

        &:last-of-type {
            margin: 8px 0 40px 0;
        }
    }
`;

const Header: React.FC = (): React.ReactElement => {
    return (
        <StyledHeader>
            <div className="logoNav">
                <Logo className="logo" title="Holidaze" />
                <Navigation />
            </div>
            <MeetBergen className="meetBergen" title="Meet Bergen" />
            <span className="inputWrapper">
                <input placeholder="Search our establishments" />
            </span>
            <span className="headerText">
                <AttachMoney /> Free Cancellation
            </span>
            <span className="headerText">
                <HeadsetMic /> 24/7 Customer Support
            </span>
        </StyledHeader>
    );
};

export default Header;
