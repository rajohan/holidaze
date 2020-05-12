import React from "react";
import styled from "styled-components";
import { HeadsetMic, AttachMoney } from "@material-ui/icons";

import headerBackground from "../../assets/images/homeHeader.jpg";
import { ReactComponent as Logo } from "../../assets/images/logo/logoLight.svg";
import { ReactComponent as MeetBergen } from "../../assets/images/meetBergen.svg";
import Navigation from "../Layout/Navigation";
import Search from "../Shared/Search";

const StyledHomeHeader = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(to right bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${headerBackground});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    color: ${(props): string => props.theme.colors.secondary};
    width: 100%;
    padding: 15px;
    margin-bottom: 30px;

    @media only screen and (min-width: 575px) {
        padding: 30px;
    }

    .logo {
        width: 150px;
        height: auto;
        margin-right: auto;
        margin-top: 6px;

        @media only screen and (min-width: 575px) {
            margin-top: 0;
            margin-right: 0;
            width: 200px;
        }
    }

    .logoNav {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .meetBergen {
        max-width: 400px;
        width: 100%;
        margin: 35px 0;
        height: auto;

        @media only screen and (min-width: 575px) {
            margin: 65px 0;
            max-width: 500px;
        }
    }

    // .inputWrapper {
    //     background-color: ${(props): string => props.theme.colors.secondary60};
    //     border-radius: 2px;
    //     padding: 7px;
    //     margin-bottom: 30px;
    //     max-width: 600px;
    //     width: 100%;
    //
    //     @media only screen and (min-width: 575px) {
    //         padding: 10px;
    //     }
    //
    //     input {
    //         width: 100%;
    //         padding: 10px;
    //         border-radius: 2px;
    //
    //         @media only screen and (min-width: 575px) {
    //             padding: 15px;
    //         }
    //     }
    // }

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

const HomeHeader: React.FC = (): React.ReactElement => {
    return (
        <StyledHomeHeader>
            <div className="logoNav">
                <Logo className="logo" title="Holidaze" />
                <Navigation />
            </div>
            <MeetBergen className="meetBergen" title="Meet Bergen" />
            <Search />
            <span className="headerText">
                <AttachMoney /> Free Cancellation
            </span>
            <span className="headerText">
                <HeadsetMic /> 24/7 Customer Support
            </span>
        </StyledHomeHeader>
    );
};

export default HomeHeader;
