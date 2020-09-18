import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../data/styleThemes';
import formatcoords from 'formatcoords';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Permission from '../../images/shield.svg';

const useStyles = makeStyles(() => ({
    backdrop: {
        zIndex: 999,
        color: theme.light,
        display: 'flex',
        flexDirection: 'column'
    },
}));

const Container = styled.div`
    background-color: transparent;
    color: ${props => props.state.isNightModeOn ? theme.red : theme.dark};
    width: 100%;
    padding: 5px;
    height: calc(100vh - 40px);
    display: flex;
    flex-direction: column;
    @media (orientation: landscape) {
        flex-direction: row;
     }
    `;
const SogContainer = styled.div`
    background-color: transparent;
    border-radius: 5px;
    border: 2px solid ${props => props.state.isNightModeOn ? theme.red : theme.dark};
    flex-grow: 2;
    margin-bottom: 5px;

    @media (orientation: landscape) {
        margin-bottom: 0px;
        margin-right: 5px;
     }

    display flex;
    flex-direction: column;
`;
const SogPlusmax = styled.div`
    // background-color: lightblue;
    flex-grow: 2;

    display flex;
    flex-direction: column;
    @media (orientation: landscape) {
        flex-direction: row;
     }
`;
const Sog = styled.div`
     flex-grow: 1;
     position: relative;
     display: flex;
     justify-content: center;
     align-items: center;
`;
const SogText = styled.span`
     text-transform: uppercase;
     font-family: Poppins, sans-serif;
     color: ${props => props.state.isNightModeOn ? theme.red : theme.dark};
     position: absolute;
     top: 0px;
     left: 4px;
`;
const SogContent = styled.span`
     font-family: Poppins, sans-serif;
     color: ${props => props.state.isNightModeOn ? theme.red : theme.dark};
     font-size: 90px;
`;
const MaxAvg = styled.div`
    flex-grow: 1;
    // background-color: gray;
    margin: 0 5px 0 5px;
    padding: 5px;
    border-radius: 5px;
    border: 2px solid ${props => props.state.isNightModeOn ? theme.red : theme.dark};
    display: flex;
    flex-direction: row;
    @media (orientation: landscape){
        flex-direction: column;
        margin: 5px;
    }
`;
const MAContainer = styled.div`
    position: relative;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const MAContent = styled.span`
    font-family: Poppins, sans-serif;
     color: ${props => props.state.isNightModeOn ? theme.red : theme.dark};
     font-size: 40px;
`;
const GpsContainer = styled.div`
    // background-color: lightgreen;
    flex-grow: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const GpsContent = styled.span`
    font-size: 30px;
    font-family: Poppins, sans-serif;
    color: ${props => props.state.isNightModeOn ? theme.red : theme.dark};
`;
const HeadingContainer = styled.div`
    background-color: transparent;
    border-radius: 5px;
    border: 2px solid ${props => props.state.isNightModeOn ? theme.red : theme.dark};
    flex-grow: 3;

    display: flex;
    flex-direction: column;
`;
const HeadingDiv = styled.div`
    // background-color: lightblue;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

`;
const Heading = styled.span`
    font-family: Poppins, sans-serif;
     color: ${props => props.state.isNightModeOn ? theme.red : theme.dark};
     font-size: 60px;
`;
const LogPlusTrip = styled.div`
    // background-color: lightgreen;
    flex-grow: 2;
    display: flex;
`;
const findAvg = array => {
    let sum = 0;
    array.forEach(element => {
        sum = sum +element;
    });
    return sum/array.length;
}
const findMax = array => {
    let max = 0;
    array.forEach(element => {
        if(element > max) max = element
    });
    return max;
}

const GpsData = ({state, trip, distance}) => {

    const classes = useStyles();
    const [gpsData, setGpsData] = useState(null);
    const [permision, setPermision] = useState(null);

    useEffect(()=>{
       console.log('start gps tracking');
        let watch = null;
            if (navigator.geolocation) {
                watch = navigator.geolocation.watchPosition(showPosition, errorGPS, {
                    enableHighAccuracy: true,
                    timeout: 5 * 1000, // 5 seconds
                    maximumAge: 0
                });
            } else {
                errorGPS();
                console.log("Geolocation is not supported by this browser.");
            }

        function errorGPS(){
           setPermision(false)
        }
        function showPosition(position) {
            setPermision(true)
            setGpsData({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                heading: (position.coords.heading !== null) && (Math.round(position.coords.speed * 1.94384449 * 10) / 10 > 0.19) ? position.coords.heading : '000',
                speed: position.coords.speed !== null ?  position.coords.speed : '0.0'
            })
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
            {gpsData !== null ? (
                <>
                    <SogContainer
                        state={state}
                    >
                        <SogPlusmax>
                            <Sog>
                                <SogText state={state}>Sog</SogText>
                                <SogContent state={state}>{Math.round(gpsData.speed * 1.94384449 * 10)/10} <span style={{ fontSize: '30px' }}>knt</span></SogContent>                            </Sog>
                            <MaxAvg state={state}>
                                <MAContainer>
                                    <SogText state={state}>max</SogText>
                                    <MAContent state={state}> {trip.length > 0 ? Math.round(findMax(trip) * 1.94384449 *10)/10 : '_._'} <span style={{ fontSize: '30px' }}>knt</span></MAContent>

                                </MAContainer>
                                <MAContainer>
                                    <SogText state={state}>avg</SogText>
                                    <MAContent state={state}> {trip.length > 0 ? Math.round(findAvg(trip) * 1.94384449 *10)/10 : '_._'} <span style={{ fontSize: '30px' }}>knt</span></MAContent>

                                </MAContainer>
                            </MaxAvg>

                        </SogPlusmax>
                        <GpsContainer>
                            <SogText state={state}>Gps</SogText>
                            <GpsContent state={state}>
                                {formatcoords(gpsData.lat, gpsData.lon).format('DDMMssX',{ latLonSeparator: '| ', decimalPlaces: 3 }).split('|')[0]} <br/>
                                {formatcoords(gpsData.lat, gpsData.lon).format('DDMMssX',{ latLonSeparator: '| ', decimalPlaces: 3 }).split('|')[1]}
                            </GpsContent>
                        </GpsContainer>
                    </SogContainer>
                    <HeadingContainer
                        state={state}
                    >
                        <HeadingDiv>
                            <SogText state={state}>heading</SogText>
                            <Heading state={state}> {Math.round(gpsData.heading)}°</Heading>
                        </HeadingDiv>
                        <LogPlusTrip>

                            <MAContainer>
                                <SogText state={state}>log</SogText>
                                <MAContent state={state}> _._ <span style={{ fontSize: '30px' }}>nm</span></MAContent>
                            </MAContainer>

                            <MAContainer>
                                <SogText state={state}>trip</SogText>
                                <MAContent state={state}> {Math.round(distance / 1852 * 10)/10} <span style={{ fontSize: '30px' }}>nm</span></MAContent>
                            </MAContainer>
                        </LogPlusTrip>
                    </HeadingContainer>
                </>
            ): (
                <>
                    { permision === false ? (
                        <Backdrop className={classes.backdrop} open={true}>
                            <img src={Permission} alt="shield" style={{width: '90px', height: '90px', marginBottom: '15px'}}/>
                            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px' }}>No GPS permission</span>
                            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', padding: '10px', textAlign: 'center' }}>Please change the gps settings to use the application</p>
                        </Backdrop>
                    ):(
                        <Backdrop className={classes.backdrop} open={true}>
                            <span style={{fontFamily: 'Poppins, sans-serif', fontSize: '18px'}}>Waiting for the GPS signal</span>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    )}
                </>

            )}
        </Container>
     );
}

export default GpsData;