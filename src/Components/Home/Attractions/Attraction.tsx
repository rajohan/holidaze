import React from "react";
import styled from "styled-components";
import Heading from "../../Shared/Heading";
import Button from "../../Shared/Form/Button";

const StyledAttraction = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
    background-color: ${(props): string => props.theme.colors.secondary};
    border-radius: 2px;

    img {
        width: 100%;
        height: 167px;
        object-fit: cover;
        object-position: top;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;

        @media only screen and (min-width: 350px) {
            width: 313px;
            height: 207px;
        }
    }

    p {
        padding: 10px 20px;
        width: 100%;

        &:last-of-type {
            flex: 1;
            padding-bottom: 20px;
        }
    }

    h3 {
        color: ${(props): string => props.theme.colors.primary};
        filter: none;
        letter-spacing: normal;
        margin-top: 10px;
    }
`;

type Props = {
    attraction: {
        header: string;
        p1: string;
        p2: string;
        img: string;
        link: string;
    };
};

const Attraction: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { header, p1, p2, img, link } = props.attraction;

    return (
        <StyledAttraction>
            <img src={img} alt={header} />
            <Heading size="h3">{header}</Heading>
            <p>{p1}</p>
            <p>{p2}</p>
            <Button href={link} external={true} target="_blank">
                Learn More
            </Button>
        </StyledAttraction>
    );
};

export default Attraction;
