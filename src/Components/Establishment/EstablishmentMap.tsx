import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import MapboxGl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styled from "styled-components";
import { LocationOn } from "@material-ui/icons";

import { MAPBOX_ACCESS_TOKEN, MAPBOX_GEOCODE_API } from "../../constants";

const StyledEstablishmentMap = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    margin: 10px 0 0;
    position: relative;
    height: 200px;
    z-index: 1;

    @media only screen and (min-width: 340px) {
        height: 281px;
    }

    @media only screen and (min-width: 900px) {
        margin: 0 0 0 10px;
    }

    @media only screen and (min-width: 1050px) {
        height: 337px;
    }

    .mapContainer {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        border-radius: 2px;
    }

    .mapboxgl-canvas-container {
        canvas {
            width: 100% !important;
        }
    }

    .mapboxgl-popup {
        max-width: 200px;
    }

    .mapboxgl-popup-content {
        text-align: center;
        padding: 10px 20px;
    }

    .mapboxgl-popup-close-button {
        right: 5px;
    }

    svg {
        width: 24px;
        height: 24px;
        fill: ${(props): string => props.theme.colors.error};
    }
`;

type Props = {
    long: number;
    lat: number;
    name: string;
};

const EstablishmentMap: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { lat, long, name } = props;
    const [map, setMap] = useState<MapboxGl.Map>();

    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const createMap = async (): Promise<void> => {
            if (!mapRef.current) {
                return;
            }

            const location = await fetch(
                `${MAPBOX_GEOCODE_API}${long},${lat}.json?types=address&access_token=${MAPBOX_ACCESS_TOKEN}`
            );

            const locationJson = await location.json();

            console.log(locationJson);

            const map = new MapboxGl.Map({
                accessToken: MAPBOX_ACCESS_TOKEN,
                container: mapRef.current,
                style: "mapbox://styles/mapbox/outdoors-v11",
                center: [long, lat],
                zoom: 10
            });

            const marker = document.createElement("div");
            ReactDOM.render(<LocationOn />, marker);

            new MapboxGl.Marker(marker)
                .setLngLat([long, lat])
                .setPopup(
                    new MapboxGl.Popup({ offset: 25 }).setHTML(
                        `<h3>${name}</h3><p>${
                            locationJson.features[0] ? locationJson.features[0].place_name : "Address not available"
                        }</p>`
                    )
                )
                .addTo(map);

            setMap(map);
        };

        !map && createMap();
    }, [map, long, lat, name]);

    return (
        <StyledEstablishmentMap>
            <div ref={mapRef} className="mapContainer" />
        </StyledEstablishmentMap>
    );
};

export default EstablishmentMap;
