import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../data/styleThemes';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Permission from '../../images/shield.svg';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles(() => ({
    backdrop: {
        zIndex: 999,
        color: theme.light,
        display: 'flex',
        flexDirection: 'column'
    },
    margin: {
        position: 'absolute',
        bottom: '3px',
        right: '3px',
        width: '25px',
        height: '25px',
    },
    reloadIcon: {
        fill: 'rgb(0,160,0)'
    }
}));
const LastReload = styled.span`
    color: rgb(0,160,0);
    position: absolute;
    bottom: 2px;
    font-family: Poppins, sans-serif;
    left: 2px;
    font-size: 12px;
`;
const Container = styled.div`
    background-color: transparent;
    color: ${props => props.state.isNightModeOn ? theme.red : theme.dark};
    width: 100%;
    padding: 5px;
    height: calc(100vh - 40px);
    display: flex;
    flex-direction: column;
    @media (orientation: landscape){
        flex-direction: row;
    }
`;
const WindContainer = styled.div`
    background-color: transparent;
    border-radius: 5px;
    border: 2px solid ${props => props.state.isNightModeOn ? theme.red : theme.dark};
    flex-grow: 2;
    margin-bottom: 5px;
    position: relative;
    display flex;
    flex-direction: column;
    @media (orientation: landscape){
        margin-right: 5px;
    }
`;
const DepthContainer = styled.div`
    background-color: transparent;
    border-radius: 5px;
    border: 2px solid ${props => props.state.isNightModeOn ? theme.red : theme.dark};
    flex-grow: 1;
    @media (orientation: landscape){
        flex-grow: 2;
    }
    margin-bottom: 5px;
    display flex;
    flex-direction: column;
    justify-content: center;
`;

const Value = styled.div`
    flex-grow: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: Poppins, sans-serif;
`;
const Text = styled.span`
     text-transform: uppercase;
     font-family: Poppins, sans-serif;
     color: ${props => props.state.isNightModeOn ? theme.red : theme.dark};
     position: absolute;
     top: 0px;
     left: 4px;
`;
const Content = styled.span`
     color: ${props => props.state.isNightModeOn ? theme.red : theme.dark};
     font-size: 60px;
    font-family: Poppins, sans-serif;
`;
const ContentDepth = styled.span`
     font-family: Poppins, sans-serif;
     color: ${props => props.data.depth > 5 ? 'rgb(0,160,0)' : theme.red};
     font-size: 60px;
`;

const WeatcherData = ({state}) => {

    const classes = useStyles();
    const [weatherData, setWeatherData] = useState({
        lastReload: '-',
        depth: 14.5,
        WS: '-',
        WA: '-',
        TMP: '-'
    });
    const [permision, setPermision] = useState(null);

    useEffect(()=>{
        async function GetWeatcher(lat, lon){
            const API = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,daily,minutely&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
            const response = await fetch(API);
            return response.json();
        }


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setGpsData, errorGPS, {
                enableHighAccuracy: true,
                timeout: 5 * 1000, // 5 seconds
                maximumAge: 0
            });
        } else {
            errorGPS();
            console.log("Geolocation is not supported by this browser.");
        }

        function errorGPS() {
            setPermision(false)
        }
        function setGpsData(position) {
            setPermision(true)
            if(navigator.onLine)
                GetWeatcher(position.coords.latitude, position.coords.longitude).then(data => {
                    console.log(data);
                    setWeatherData({
                        ...weatherData,
                        lastReload: data.current.dt,
                        WS: Math.round(data.current.wind_speed * 1.94384449 * 10) / 10,
                        WA:  data.current.wind_deg,
                        TMP: Math.round(data.current.temp)
                    })
                })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const NewWeatherFunction = () => {
        async function GetWeatcher(lat, lon) {
            const API = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,daily,minutely&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
            const response = await fetch(API);
            return response.json();
        }


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setGpsData, errorGPS, {
                enableHighAccuracy: true,
                timeout: 5 * 1000, // 5 seconds
                maximumAge: 0
            });
        } else {
            errorGPS();
            console.log("Geolocation is not supported by this browser.");
        }

        function errorGPS() {
            setPermision(false)
        }
        function setGpsData(position) {
            setPermision(true)
            if (navigator.onLine)
                GetWeatcher(position.coords.latitude, position.coords.longitude).then(data => {
                    console.log(data);
                    setWeatherData({
                        ...weatherData,
                        lastReload: data.current.dt,
                        WS: Math.round(data.current.wind_speed * 1.94384449 * 10) / 10,
                        WA: data.current.wind_deg,
                        TMP: Math.round(data.current.temp)
                    })
                })
        }
    };

    return (
        <Container
            state={state}
        >
            <WindContainer
                state={state}
            >
                {permision === false ? (
                    <Backdrop className={classes.backdrop} open={true}>
                        <img src={Permission} alt="shield" style={{ width: '90px', height: '90px', marginBottom: '15px' }} />
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px' }}>No GPS permission</span>
                        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', padding: '10px', textAlign: 'center' }}>Please change the gps settings to use the application</p>
                    </Backdrop>
                ) : (
                    <>
                    {permision === null ? (
                        <Backdrop className={classes.backdrop} open={true}>
                            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px' }}>Waiting for the GPS signal</span>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    ) : (
                        <>
                        <Value
                            state={state}>
                            <Text state={state}>WS</Text>
                            <Content state={state}> {weatherData.WS} <span style={{ fontSize: '30px' }}>knt</span></Content>
                        </Value>
                        <Value
                            state={state}>
                            <Text state={state}>WA</Text>
                            <Content state={state}> {weatherData.WA}°</Content>
                        </Value>
                        <Value
                            state={state}>
                            <Text state={state}>tmp</Text>
                            <Content state={state}> {weatherData.TMP}°C</Content>
                        </Value>
                        </>
                    )}
                    </>
                )}
                {weatherData.lastReload !== '-' && <LastReload>last reload at: {new Date(weatherData.lastReload * 1000).getHours() + ':' + new Date(weatherData.lastReload * 1000).getMinutes()}</LastReload>}
                <IconButton aria-label="reload" className={classes.margin} onClick={NewWeatherFunction}>
                    <ReplayRoundedIcon  className={classes.reloadIcon}/>
                </IconButton>
            </WindContainer>

            <DepthContainer
                state={state}
            >
                <Value
                    state={state}
                >
                    <Text state={state}>DEPTH</Text>
                <ContentDepth state={state} data={weatherData}> {weatherData.depth}m</ContentDepth>
                </Value>
            </DepthContainer>

        </Container>
     );
}

export default WeatcherData;