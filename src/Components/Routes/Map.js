import React, {useEffect, useState} from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import MapStyles from './mapStyles/MapStyles';
import DarkMapStyles from './mapStyles/DarkMapStyles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import { theme } from '../../data/styleThemes';
import SailboatIcon from '../../images/sailboat.svg';
import DarkSailboatIcon from '../../images/darkmode-sailboat.svg';

const useStyles = makeStyles(() => ({
    backdrop: {
        zIndex: 999,
        color: theme.light,
        display: 'flex',
        flexDirection: 'column'
    }
}));

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

    const classes = useStyles();
    const [position, setPosition] = useState(null);
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    })

    useEffect(()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, ()=>{
                console.error("error with GPS geolocation API")
            }, {
                enableHighAccuracy: true,
                timeout: 5 * 1000, // 5 seconds
                maximumAge: 0
            });
        } else {
            console.info("Geolocation is not supported by this browser.");
        }

        function showPosition(position) {
            console.log(position)
            setPosition(position)
        }
    },[])

    if (loadError) return 'Error Loading map'
    if (!isLoaded) return (
        <Backdrop className={classes.backdrop} open={true}>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px' }}>Loading Map...</span>
            <CircularProgress color="inherit" />
        </Backdrop>
        )

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={8}
            center={position ? {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            } : center}
            options={state.isNightModeOn ? darkOptions : options}
        >
            {position &&
                <Marker
                    icon={{
                        url: state.isNightModeOn ? DarkSailboatIcon : SailboatIcon,
                        scaledSize: new window.google.maps.Size(30,30),
                    }}
                    position={{
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }}/>
            }
        </GoogleMap>
     );
}

export default Map;