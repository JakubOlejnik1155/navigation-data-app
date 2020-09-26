import React from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import MapStyles from '../../data/mapStyles/MapStyles';
import DarkMapStyles from '../../data/mapStyles/DarkMapStyles';
import Pin from '../../images/maps-and-location.png';
import NoInternetConnectionIcon from '../../images/no-wifi.svg';
import styled from 'styled-components'
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
const options = {
    styles: MapStyles,
    disableDefaultUI: true,
}
const darkOptions = {
    styles: DarkMapStyles,
    disableDefaultUI: true,
}
const StaticMap = ({state, harbor}) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    });

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
                    zoom={14}
                    center={{ lat: harbor.pos.lat, lng: harbor.pos.lng }}
                    options={state.isNightModeOn ? darkOptions : options}
                    onLoad={onMapLoad}
                >
                    <Marker
                        position={{ lat: harbor.pos.lat, lng: harbor.pos.lng }}
                        icon={{
                            url: Pin,
                            origin: new window.google.maps.Point(0, 0),
                            scaledSize: new window.google.maps.Size(40, 40),
                        }}
                    />
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

export default StaticMap;