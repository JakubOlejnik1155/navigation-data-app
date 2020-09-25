import React, { useState } from 'react';
import styled from 'styled-components';
import {theme} from '../data/styleThemes';
import AnchorImage from '../images/anchor.svg';
import IconButton from '@material-ui/core/IconButton';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar';
import { set, get } from 'idb-keyval';
import { getDistance } from 'geolib';


const NavigationBar = styled.header`
  background-color: ${(props) => props.isNightModeOn === true ? theme.dark : theme.light};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  width: 100%;
`;
const Logo = styled.img`
  margin-left: 10px;
  height: 26px;
  width: 26px;
`;
const AppName = styled.span`
  margin: 0 auto 0 5px;
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
  color: ${props => props.isNightModeOn === true ? theme.red : theme.dark}};
`;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
let watchPositionIdex = null;
let tripObject = null;

const Header = ({ state, setState, setTrip, setDistance, setLog, log}) => {

  const [isSnackbar, setIsSnackbar] = useState({
    open: false,
    text: '-',
    severity: 'success',
  });

  const handleClose = () => {
    setIsSnackbar({
      open: false,
      text: '-',
    });
  };
  const handleShowSnackbar = (text, severity) => {
    setIsSnackbar({
      open: true,
      text,
      severity
    })
  }
  const handleStartTripButton = () => {
    if(tripObject === null){
      tripObject = {
        startTime: new Date().toJSON(),
        endTime:  null,
        isfinished: false,
        coordsArray: [],
        speedArray: [],
        tripDistance: 0,
      }
    }
    if (navigator.geolocation) {
      watchPositionIdex = navigator.geolocation.watchPosition(getPosition, errorGPS, {
        enableHighAccuracy: true,
        timeout: 5 * 1000, // 10 seconds
        maximumAge: 0
      });
    } else {
      errorGPS();
    }

    function errorGPS() {
      console.error("error in GPS position watching")
    }
    async function getPosition(position) {
      let flag = false;
      await tripObject.coordsArray.forEach((element) => {
        if(element[0] === position.coords.latitude && element[1] === position.coords.longitude) {
          flag = true;
        }
      })
      if(!flag){
        tripObject = {
          ...tripObject,
          coordsArray: [
            ...tripObject.coordsArray,
            [position.coords.latitude, position.coords.longitude]
          ],
          speedArray: [
            ...tripObject.speedArray,
            position.coords.speed ? position.coords.speed : 0
          ]
        }
        setTrip(tripObject.speedArray);
        setDistance(GetDistanceFromArray(tripObject.coordsArray));
        await set('log', log + GetDistanceFromArray(tripObject.coordsArray))
        setLog(log + GetDistanceFromArray(tripObject.coordsArray))
      }
    }
  };

  const GetDistanceFromArray =  (array) =>{
    let distance = 0;
    for( let i = 0 ; i < array.length - 1 ; i++){
      distance += getDistance({
        latitude: array[i][0],
        longitude: array[i][1]
      }, {
        latitude: array[i + 1][0],
        longitude: array[i + 1][1]
      })
    }
    return distance;
  }

  const handleEndingTrip = async () => {
    tripObject = {
      ...tripObject,
      isfinished: true,
      endTime: new Date().toJSON(),
      tripDistance: GetDistanceFromArray(tripObject.coordsArray)
    }
    if(tripObject.coordsArray.length > 0){
      await get("tripsArray").then((val)=>{
        set("tripsArray", [...val, tripObject]);
      }).catch(()=>{
        set("tripsArray", [tripObject]);
      })
    }
    setTrip([]);
    setDistance(0);
    navigator.geolocation.clearWatch(watchPositionIdex);
    tripObject = null;

  };
  const handlePausingTrip = () => {
    navigator.geolocation.clearWatch(watchPositionIdex);
  };



    return (
      <NavigationBar
        isNightModeOn={state.isNightModeOn}
      >
        <IconButton
          aria-label="menu icon"
          size="small"
          style={{ width: "40px", height: '40px', marginLeft: '10px'}}
          onClick={() => setState({ ...state, isMenuOpened: !state.isMenuOpened })}
        >
          <MenuRoundedIcon
            fontSize="inherit"
            style={state.isNightModeOn === true ? { color: theme.red, width: "35px", height: '35px', } : { color: theme.dark, width: "35px", height: '35px',}}
          />
        </IconButton>
        <Logo src={AnchorImage} alt="anchor logo"/>
        <AppName isNightModeOn={state.isNightModeOn}>
          NavData
        </AppName>

        {state.isTripActive === true && (
              <>
                <IconButton
                  aria-label="pause Trip"
                  size="medium"
                  style={{ width: "30px", height: '30px', marginRight: '10px', backgroundColor: `${theme.blue}` }}
                  onClick={() => {
                    setState({ ...state, isTripActive: 'paused' })
                    handleShowSnackbar("trip has been paused","info")
                    handlePausingTrip();
                  }}
                >
                  <PauseRoundedIcon
                    fontSize="inherit"
                    style={{ color: theme.dark, width: "20px", height: '20px', }}
                  />
                </IconButton>
                <IconButton
                  aria-label="end Trip"
                  size="medium"
                  style={{ width: "30px", height: '30px', marginRight: '10px', backgroundColor: `${theme.red}` }}
                  onClick={() => {
                    setState({ ...state, isTripActive: false });
                    handleShowSnackbar("trip has been ended","warning");
                    handleEndingTrip();
                  }}
                >
                  <StopRoundedIcon
                    fontSize="inherit"
                    style={{ color: theme.dark, width: "20px", height: '20px', }}
                  />
                </IconButton>
              </>
        )}
        {state.isTripActive === false && (
          <IconButton
            aria-label="start Trip"
            size="medium"
            style={{ width: "30px", height: '30px', marginRight: '10px', backgroundColor: `${theme.green}` }}
            onClick={()=> {
              setState({...state, isTripActive: true})
              handleShowSnackbar("trip has been started", "success")
              handleStartTripButton();
            }}
          >
            <PlayArrowRoundedIcon
              fontSize="inherit"
              style={{ color: theme.dark, width: "20px", height: '20px', }}
            />
          </IconButton>
        )}
        {state.isTripActive === "paused" && (
          <>
            <IconButton
              aria-label="start Trip"
              size="medium"
              style={{ width: "30px", height: '30px', marginRight: '10px', backgroundColor: `${theme.green}` }}
              onClick={() => {
                setState({ ...state, isTripActive: true })
                handleShowSnackbar("trip has been resumed", "success")
                handleStartTripButton();
              }}
            >
              <PlayArrowRoundedIcon
                fontSize="inherit"
                style={{ color: theme.dark, width: "20px", height: '20px', }}
              />
            </IconButton>
            <IconButton
              aria-label="stop Trip"
              size="medium"
              style={{ width: "30px", height: '30px', marginRight: '10px', backgroundColor: `${theme.red}` }}
              onClick={() => {
                setState({ ...state, isTripActive: false })
                handleShowSnackbar("trip has been ended", "warning")
                handleEndingTrip()
              }}
            >
              <StopRoundedIcon
                fontSize="inherit"
                style={{ color: theme.dark, width: "20px", height: '20px', }}
              />
            </IconButton>
          </>
        )}
        <Snackbar
          open={isSnackbar.open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal:"right" }}
        >
          <Alert  severity={isSnackbar.severity} >
            {isSnackbar.text}
        </Alert>
        </Snackbar>
      </NavigationBar>
     );
}

export default Header;