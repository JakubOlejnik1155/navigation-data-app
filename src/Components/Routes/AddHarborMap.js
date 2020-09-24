import React from "react";
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
import MapStyles from './mapStyles/MapStyles';
import DarkMapStyles from './mapStyles/DarkMapStyles';
import Pin from '../../images/maps-and-location.png'
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
    // const [markers, setMarkers] = React.useState([]);

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
        <div>

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
        </div>
    );
}