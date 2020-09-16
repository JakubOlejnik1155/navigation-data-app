import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import MapStyles from './mapStyles/MapStyles';
import DarkMapStyles from './mapStyles/DarkMapStyles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import { theme } from '../../data/styleThemes';

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
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    })

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
            center={center}
            options={state.isNightModeOn ? darkOptions : options}
        >
            Map
        </GoogleMap>
     );
}

export default Map;