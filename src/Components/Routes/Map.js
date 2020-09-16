import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import MapStyles from './mapStyles/MapStyles';
import DarkMapStyles from './mapStyles/DarkMapStyles';




const mapContainerStyle = {
    width: '100%',
    height: 'calc(100vh - 40px)',
}
const center = {
    lat: 53.803582,
    lng: 14.382462
}
const options = {
    styles: MapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    streetViewControl: true,
}
const darkOptions = {
    styles: DarkMapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    streetViewControl: true,
}

const Map = ({state}) => {

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    })

    if (loadError) return 'Error Loading map'
    if (!isLoaded) return 'Map still Loading'

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={8}
            center={center}
            options={state.isNightModeOn ? darkOptions : options}
        >
            Map
        </GoogleMap>
     );
}

export default Map;