import React from "react";
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
import styled from 'styled-components';


import MapStyles from '../../data/mapStyles/MapStyles';
import DarkMapStyles from '../../data/mapStyles/DarkMapStyles';
import Pin from '../../images/maps-and-location.png'
import NoInternetConnectionIcon from '../../images/no-wifi.svg';
import { theme } from '../../data/styleThemes';


const OfflineContainer = styled.div`
    width: 100%;
    height: 250px;
    color: ${props => props.state.isNightModeOn ? theme.light : theme.dark};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const mapContainerStyle = {
    height: "250px",
    width: "100%",
};
const center = {
    lat: 24.932186114629094,
    lng: -45.52104291977667
};
const options = {
    styles: MapStyles,
    disableDefaultUI: true,
}
const darkOptions = {
    styles: DarkMapStyles,
    disableDefaultUI: true,
}

export default function AddHarborMap({state, position, setPosition}) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    });
    const onMapClick = React.useCallback((e) => {
        setPosition({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <>
            {navigator.onLine ? (
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={2}
                    center={center}
                    options={state.isNightModeOn ? darkOptions : options}
                    onClick={onMapClick}
                    onLoad={onMapLoad}
                >
                    {position && (
                        <Marker
                            draggable
                            onDragEnd={onMapClick}
                            position={{ lat: position.lat, lng: position.lng }}
                            icon={{
                                url: Pin,
                                origin: new window.google.maps.Point(0, 0),
                                scaledSize: new window.google.maps.Size(40, 40),
                            }}
                        />
                    )}
                </GoogleMap>
            ) : (
                <OfflineContainer state={state}>
                    <img src={NoInternetConnectionIcon} alt="no-internet-connection" style={{ width: '40px', height: '40px', marginBottom: '15px' }} />
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px' }}>You need to go online to see map</p>
                </OfflineContainer>
            )}

        </>
    );
}