import React, {useEffect, useState} from 'react';
import { GoogleMap, useLoadScript, Marker} from '@react-google-maps/api'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components'
import { get } from 'idb-keyval';


import MapStyles from '../../data/mapStyles/MapStyles';
import DarkMapStyles from '../../data/mapStyles/DarkMapStyles';
import { theme } from '../../data/styleThemes';
import SailboatIcon from '../../images/sailboat.svg';
import DarkSailboatIcon from '../../images/darkmode-sailboat.svg';
import Pin from '../../images/maps-and-location.png'
import NoInternetConnectionIcon from '../../images/no-wifi.svg';


const useStyles = makeStyles(() => ({
    backdrop: {
        zIndex: 999,
        color: theme.light,
        display: 'flex',
        flexDirection: 'column'
    }
}));
const OfflineContainer = styled.div`
    width: 100%;
    height: calc(100vh - 40px);
    color: ${props => props.state.isNightModeOn ? theme.light : theme.dark};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
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
    const [harborsArray, setHarborArray] = React.useState();
    const [position, setPosition] = useState(null);
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    })

    useEffect(()=>{
        async function getHarborArray() {
            await get("harborsArray").then((array) => {
                setHarborArray(array)
            })
        }
        // eslint-disable-next-line no-unused-vars
        let a = getHarborArray();
        return () => {
            a = false;
        }
    },[])
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
        <>
        {navigator.onLine ? (
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
                                scaledSize: new window.google.maps.Size(20, 20),
                            }}
                            position={{
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            }} />
                    }
                    {harborsArray && harborsArray.map(harbor => {
                        return (
                            <Marker
                                key={harbor.name}
                                icon={{
                                    url: Pin,
                                    scaledSize: new window.google.maps.Size(25, 25)
                                }}
                                position={{
                                    lat: harbor.pos.lat,
                                    lng: harbor.pos.lng
                                }}
                            />
                        )
                    })}
                </GoogleMap>
        ):(
            <OfflineContainer state={state}>
                <img src={NoInternetConnectionIcon} alt="no-internet-connection" style={{ width: '80px', height: '80px', marginBottom: '15px' }} />
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px' }}>You need to go online to see map</p>
            </OfflineContainer>
        )}
        </>

     );
}

export default Map;