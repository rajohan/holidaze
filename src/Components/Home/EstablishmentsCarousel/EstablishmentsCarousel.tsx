import React, { useState } from "react";
import styled from "styled-components";
import { useLazyLoadQuery } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import Carousel from "react-simply-carousel";

import { EstablishmentsCarouselGetAllEstablishmentsQuery } from "./__generated__/EstablishmentsCarouselGetAllEstablishmentsQuery.graphql";
import EstablishmentsCarouselItem from "./EstablishmentsCarouselItem";
import Button from "../../Shared/Button";

const StyledEstablishmentsCarousel = styled.div`
    background-color: ${(props): string => props.theme.colors.secondary};
    margin: 30px 0;
    border-radius: 2px;

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

    const data = useLazyLoadQuery<EstablishmentsCarouselGetAllEstablishmentsQuery>(
        graphql`
            query EstablishmentsCarouselGetAllEstablishmentsQuery {
                getAllEstablishments {
                    id
                    ...EstablishmentsCarouselItemGetAllEstablishments
                }
            }
        `,
        {},
        { fetchPolicy: "store-or-network" }
    );

    const renderEstablishments = (): React.ReactNode => {
        return data.getAllEstablishments.map((establishment, index) => (
            <EstablishmentsCarouselItem
                key={`establishment-${data.getAllEstablishments[index].id}`}
                getAllEstablishments={establishment}
            />
        ));
    };

    return (
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
