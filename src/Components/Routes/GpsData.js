import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../data/styleThemes';


const Container = styled.div`
    background-color: transparent;
    color: ${props => props.state.isNightModeOn ? theme.red : theme.dark};
    width: 100%;
    padding: 5px;
    height: calc(100vh - 40px);
    display: flex;
    flex-direction: column;
`;



const GpsData = ({state}) => {

    const [gpsData, setGpsData] = useState(null);
    const [isGpsAllowed, setIsGpsAllowed] = useState(null);

    useEffect(()=>{
       console.log('start gps tracking');
        let watch = null;
            if (navigator.geolocation) {
                watch = navigator.geolocation.watchPosition(showPosition);
            } else {
                console.log("Geolocation is not supported by this browser.");
            }

        function showPosition(position) {
            setGpsData({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                heading: position.coords.heading,
                speed: position.coords.speed
            })
            console.info(position)
        }







       return ( () => {
           console.log("end tracking")
           navigator.geolocation.clearWatch(watch);
        })
    },[])




    return (
        <Container
            state={state}
        >
            <pre>{JSON.stringify(gpsData, undefined,2)}</pre>
        </Container>
     );
}

export default GpsData;