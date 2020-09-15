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


const GpsData = ({state}) => {

    const [gpsData, setGpsData] = useState(null);
    // const [isGpsAllowed, setIsGpsAllowed] = useState(false);

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
                heading: position.coords.heading !== null ? position.coords.heading : '000',
                speed: position.coords.speed !== null ?  position.coords.speed : '0.0'
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
            {/* <pre>{JSON.stringify(gpsData, undefined,2)}</pre> */}
            {gpsData !== null ? (
                <>
                    <SogContainer
                        state={state}
                    >
                        <SogPlusmax>
                            <Sog>
                                <SogText state={state}>Sog</SogText>
                                <SogContent state={state}>{gpsData.speed} <span style={{ fontSize: '30px' }}>knt</span></SogContent>
                            </Sog>
                            <MaxAvg state={state}>
                                <MAContainer>
                                    <SogText state={state}>max</SogText>
                                    <MAContent state={state}>{gpsData.speed} <span style={{ fontSize: '30px' }}>knt</span></MAContent>

                                </MAContainer>
                                <MAContainer>
                                    <SogText state={state}>avg</SogText>
                                    <MAContent state={state}>{gpsData.speed} <span style={{ fontSize: '30px' }}>knt</span></MAContent>

                                </MAContainer>
                            </MaxAvg>

                        </SogPlusmax>
                        <GpsContainer>
                            <SogText state={state}>Gps</SogText>
                            <GpsContent state={state}>
                                {gpsData.lat} <br/>
                                {gpsData.lon}
                            </GpsContent>
                        </GpsContainer>
                    </SogContainer>

                    <HeadingContainer
                        state={state}
                    >
                        <HeadingDiv>
                            <SogText state={state}>heading</SogText>
                            <Heading state={state}> {gpsData.heading}°</Heading>
                        </HeadingDiv>
                        <LogPlusTrip>

                            <MAContainer>
                                <SogText state={state}>log</SogText>
                                <MAContent state={state}> -.- <span style={{ fontSize: '30px' }}>nm</span></MAContent>
                            </MAContainer>

                            <MAContainer>
                                <SogText state={state}>trip</SogText>
                                <MAContent state={state}> -.- <span style={{ fontSize: '30px' }}>nm</span></MAContent>
                            </MAContainer>
                        </LogPlusTrip>
                    </HeadingContainer>
                </>
            ): (

                <p>WEATING FOR GPS SIGNAL</p>
            )}

        </Container>
     );
}

export default GpsData;