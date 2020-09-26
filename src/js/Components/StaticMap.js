import React from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import MapStyles from '../../data/mapStyles/MapStyles';
import DarkMapStyles from '../../data/mapStyles/DarkMapStyles';
import Pin from '../../images/maps-and-location.png'
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
     );
}

export default StaticMap;