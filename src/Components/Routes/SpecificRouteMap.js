import React from 'react';
import { GoogleMap, useLoadScript, Polyline, Marker} from '@react-google-maps/api'
import MapStyles from './mapStyles/MapStyles';
import DarkMapStyles from './mapStyles/DarkMapStyles';
import SailSVG from '../../images/startTripPin.svg'
import DockSVG from '../../images/endTripPin.svg'

const mapContainerStyle = {
    width: '100%',
    height: '100%',
}
const options = {
    styles: MapStyles,
    disableDefaultUI: true,
}
const darkOptions = {
    styles: DarkMapStyles,
    disableDefaultUI: true,
}
const RouteOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
}


const centerFromArray = (array) => {
    let lat=0, lng=0;
    array.forEach(element => {
       lat += element[0];
        lng += element[1];
    });
    lat /= array.length
    lng /= array.length
    return{
        lat,
        lng
    }
}
const refactorArray = (array) => {
    let newObjectArray = [];
    array.forEach(element => {
        newObjectArray.push({ lat: element[0], lng: element[1] })
    })
    return newObjectArray;
}


const SpecificRouteMap = ({state, trip}) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    })
    if (loadError) return 'Error Loading map'
    if (!isLoaded) return (
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px' }}>Loading Map...</span>
    )
    return (
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={6}
                center={centerFromArray(trip.coordsArray)}
                options={state.isNightModeOn ? darkOptions : options}
            >
            <Polyline
                path={refactorArray(trip.coordsArray)}
                options={RouteOptions}
            />
            <Marker
                icon={{
                    url: SailSVG,
                    scaledSize: new window.google.maps.Size(30, 30),
                }}
                position={{
                    lat: trip.coordsArray[0][0],
                    lng: trip.coordsArray[0][1]
                }} />
            <Marker
                icon={{
                    url: DockSVG,
                    scaledSize: new window.google.maps.Size(30, 30),
                }}
                position={{
                    lat: trip.coordsArray[trip.coordsArray.length-1][0],
                    lng: trip.coordsArray[trip.coordsArray.length-1][1]
                }} />
            </GoogleMap>
     );
}

export default SpecificRouteMap;