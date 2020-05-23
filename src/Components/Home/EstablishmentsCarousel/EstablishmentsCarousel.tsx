import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Carousel from "react-simply-carousel";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";

import { GET_ALL_ESTABLISHMENTS_QUERY } from "../../../GraphQL/Queries";
import { GetAllEstablishmentsData } from "../../../GraphQL/types";
import Button from "../../Shared/Form/Button";
import EstablishmentsCarouselItem from "./EstablishmentsCarouselItem";
import Loading from "../../Shared/Loading";

const StyledEstablishmentsCarousel = styled.div`
    background-color: ${(props): string => props.theme.colors.secondary};
    margin: 30px 0;
    border-radius: 2px;
    max-width: 100%;

    svg {
        width: 36px;
        height: 36px;
        fill: ${(props): string => props.theme.colors.primary};

        @media only screen and (min-width: 450px) {
            width: 48px;
            height: 48px;
        }
    }
`;

const StyledButton = styled(Button)`
    margin-bottom: 30px;
`;

const EstablishmentsCarousel: React.FC = (): React.ReactElement => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const { loading, data } = useQuery<GetAllEstablishmentsData>(GET_ALL_ESTABLISHMENTS_QUERY);

    const renderEstablishments = (): React.ReactNode => {
        return (
            data &&
            data.getAllEstablishments.map((establishment) => (
                <EstablishmentsCarouselItem key={`${establishment.id}`} establishment={establishment} />
            ))
        );
    };

    return loading ? (
        <Loading text="Loading establishments" />
    ) : (
        <React.Fragment>
            <StyledEstablishmentsCarousel>
                <Carousel
                    containerProps={{
                        style: {
                            width: "100%"
                        }
                    }}
                    activeSlideIndex={currentSlideIndex}
                    onRequestChange={setCurrentSlideIndex}
                    backwardBtnProps={{
                        children: <NavigateBefore />,
                        style: {
                            outline: "none"
                        }
                    }}
                    forwardBtnProps={{
                        children: <NavigateNext />,
                        style: {
                            outline: "none"
                        }
                    }}
                    itemsToShow={1}
                    responsiveProps={[
                        { minWidth: 702, maxWidth: 1075, itemsToShow: 2 },
                        { minWidth: 1075, itemsToShow: 3 }
                    ]}
                    speed={400}
                >
                    {renderEstablishments()}
                </Carousel>
            </StyledEstablishmentsCarousel>
            <StyledButton href="/establishments">view all establishments</StyledButton>
        </React.Fragment>
    );
};

export default EstablishmentsCarousel;
