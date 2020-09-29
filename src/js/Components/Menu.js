import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {del, get, set} from 'idb-keyval';
import Button from '@material-ui/core/Button';


import { theme } from '../../data/styleThemes';
import MenuLink from './MenuLink';
import BoatIcon from '../../images/boat.png';
import WeatherIcon from '../../images/wind.png';
import MapIcon from '../../images/maps-and-location.png';
import TripIcon from '../../images/track.png';
import {makeStyles, Typography, withStyles} from '@material-ui/core';
import Wifi from '../../images/wifi.svg';
import NoWifi from '../../images/no-wifi.svg';
import MooringPoint from '../../images/mooring-point.svg';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import BrightnessMediumRoundedIcon from '@material-ui/icons/BrightnessMediumRounded';
import LoginDialog from "./LoginDialog";
import {LoginContext} from "../ContextLoginApi";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {getFetchFunction, patchFetchFunction} from "../../data/functions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const MenuList = styled.div`
  background-color: ${props => props.state.isNightModeOn ? theme.dark : theme.light};
  padding: 10px;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const CRSpan = styled.span`
  font-family: Poppins, sans-serif;
  font-size: 12px;
  text-align: center;
  color: ${props => props.state.isNightModeOn ? theme.light : theme.dark}

`;
const useStyles = makeStyles(()=>({
  light: {
      backgroundColor: theme.light,
  },
  mode: {
    '& .MuiTypography-root':{
      fontFamily: 'Poppins, sans-serif',fontSize: '14px',
      margin: '0 20px 0 5px'
    }
  }
}))
const ModeSwitch = withStyles({
  switchBase: {
    color: theme.dark,
    '&$checked': {
      color: theme.red,
    },
    '&$checked + $track': {
      backgroundColor: theme.red,
    },
  },
  checked: {},
  track: {},
})(Switch);

const Menu = ({state, setState}) => {

  const LoginAPI = React.useContext(LoginContext);
  const classes = useStyles();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = React.useState(false)
  const [isSnackbar, setIsSnackbar] = React.useState({
    open: false,
    text: '-',
    severity: '',
  });


  const HarborsArrayUnique = array => {
    let a = array.concat();
    for(let i=0; i<a.length; ++i) {
      for(let j=i+1; j<a.length; ++j) {
        if(a[i].name === a[j].name)
          a.splice(j--, 1);
      }
    }
    return a;
  }
  const tripsArrayUnique = trip => {
    let a = trip.concat();
    for(let i=0; i<a.length; ++i) {
      for(let j=i+1; j<a.length; ++j) {
        if(a[i].startTime === a[j].startTime)
          a.splice(j--, 1);
      }
    }
    return a;
  }
  const handleCloseSnackbar = () => {
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
  const handlingMargeData = async () => {
    function getUserData () {
      try{
        getFetchFunction('/')
            .then(async response => {
              if (response.ok){
                const onlineObject = response.object;
                let offlineObject = {}, offlineLog, offlineHarborsArray, offlineTripsArray;
                await get("log").then(async value=> {
                  offlineLog = value
                  if (offlineLog > onlineObject.log) {
                    offlineObject ={...offlineObject, log: offlineLog}
                  }else {
                    offlineObject ={...offlineObject, log: onlineObject.log}
                    await set("log", onlineObject.log)
                  }
                });
                await get("harborsArray").then( async value => {
                  offlineHarborsArray = value
                  const array = onlineObject.harborsArray.concat(offlineHarborsArray)
                  offlineObject ={...offlineObject, harborsArray: HarborsArrayUnique(array)}
                  await set("harborsArray", HarborsArrayUnique(array))
                });
                await get("tripsArray").then(async value => {
                  offlineTripsArray = value
                  const array = onlineObject.tripsArray.concat(offlineTripsArray)
                  offlineObject ={...offlineObject, tripsArray: tripsArrayUnique(array)}
                  await set("tripsArray", tripsArrayUnique(array))
                });
                patchFetchFunction('/',offlineObject).then(res => {
                  if (res.ok){
                    handleShowSnackbar("Successfully merge data" , "success")
                  }
                  else{
                    handleShowSnackbar("Something get wrong" , "error")
                  }
                }).catch(e => console.log(e))
              }
            })
      }catch (e) {
        console.log(e)
      }
    }
    getUserData();
  }

  return (
      <>
        <SwipeableDrawer
            anchor = "left"
            open = {state.isMenuOpened}
            onClose = {() => setState({ ...state, isMenuOpened: !state.isMenuOpened })}
            onOpen = {() => setState({ ...state, isMenuOpened: !state.isMenuOpened })}
        >
          <MenuList
            state = {state}
          >
            <List
              onClick={() => setState({ ...state, isMenuOpened: !state.isMenuOpened })}
              onKeyDown={() => setState({ ...state, isMenuOpened: !state.isMenuOpened })}
            >
              <MenuLink link='/' text="Gps Data" icon={BoatIcon} state={state} />
              <Divider className={state.isNightModeOn ? classes.light : ""}/>
              <MenuLink link='/wind-data' text="Wind Data" icon={WeatherIcon} state={state} />
              <Divider className={state.isNightModeOn ? classes.light : ""}/>
              <MenuLink link='/map' text="Map" icon={MapIcon} state={state} />
              <Divider className={state.isNightModeOn ? classes.light : ""}/>
              <MenuLink link='/my-trips' text="My Trips" icon={TripIcon} state={state} />
              <Divider className={state.isNightModeOn ? classes.light : ""}/>
              <MenuLink link='/harbors' text="Harbors" icon={MooringPoint} state={state} />
              <Divider className={state.isNightModeOn ? classes.light : ""}/>
            </List>
            {navigator.onLine ?(
                <>
                  {LoginAPI.isLogin.login ? (
                      <>
                        <Typography
                            style={{margin: 'auto auto 5px auto', color: state.isNightModeOn ? theme.light : theme.dark,}}
                            variant='body2'
                        >
                          <span style={{fontWeight: '100', display: 'block',width: '100%',fontStyle: 'italic'}}>logged as:  </span>
                          <span style={{fontWeight: 'bold'}}>{LoginAPI.isLogin.user.email.split('@')[0]}</span>
                        </Typography>
                        <Button style={{margin: '2px auto', color: state.isNightModeOn ? theme.red : theme.red, fontSize: '12px', borderColor: theme.red, width: '40%'}}
                                variant="outlined"
                                color='secondary'
                                onClick={async ()=>{
                                  await del("jwt")
                                  LoginAPI.setIsLogin({
                                    login: false,
                                    user: null
                                  })
                                  handleShowSnackbar("Successfully logged out", "info");
                                }}
                        >
                          logout
                        </Button>
                        <Button style={{margin: '2px auto', color: state.isNightModeOn ? theme.green : theme.dark, fontSize: '11px', borderColor: state.isNightModeOn ? theme.green : theme.dark, width: '80%'}}
                                variant="outlined"
                                color='secondary'
                                onClick={handlingMargeData}
                        >
                          Merge data
                        </Button>
                      </>
                  ) : (
                      <Button style={{margin: 'auto auto 5px auto', color: state.isNightModeOn ? theme.light : theme.dark, fontSize: '12px', borderColor: theme.blue, width: '80%'}}
                              variant="outlined"
                              color='secondary'
                              onClick={()=> {
                                setState({...state, isMenuOpened: false})
                                setIsLoginDialogOpen(true);
                              }}
                      >
                        Login / Register
                      </Button>
                  )}
                </>
            ):(
                <div style={{marginTop:'auto'}} />
            )}
              <List>
              <ListItem>
                <ListItemIcon >
                  <BrightnessMediumRoundedIcon style={state.isNightModeOn ? {fill: theme.light} : {fill: theme.dark}}/>
                </ListItemIcon>
                <ListItemText className={classes.mode}id="switch-list-label-mode" primary="Night Mode" style={state.isNightModeOn ? { color: theme.light} : { color: theme.dark}}/>
                <ListItemSecondaryAction>
                  <ModeSwitch
                    edge="end"
                    onChange={ () => {
                      if(state.isNightModeOn)
                        set("nightMode", false);
                      else if (!state.isNightModeOn)
                        set("nightMode", true);
                      setState({...state, isNightModeOn: !state.isNightModeOn});
                    }}
                    checked={state.isNightModeOn ? true : false}
                    inputProps={{ 'aria-labelledby': 'switch-list-label-mode' }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider className={state.isNightModeOn ? classes.light : ""} />
            </List>
            <CRSpan state={state}>©:Jakub Olejnik 2020 / v1.0 {navigator.onLine ? (
                    <img src={Wifi} alt="wifi"  style={{width: '20px', height: '20px', marginBottom: '-5px'}}/>
                  ) : (
                    <img src={NoWifi} alt="no-wifi" style={{width: '20px', height: '20px', marginBottom: '-5px'}}/>
                  )}
            </CRSpan>
          </MenuList>
        </SwipeableDrawer>
        <LoginDialog state={state} isLoginDialogOpen={isLoginDialogOpen} setIsLoginDialogOpen={setIsLoginDialogOpen} />
        <Snackbar
            open={isSnackbar.open}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity={isSnackbar.severity} >
            {isSnackbar.text}
          </Alert>
        </Snackbar>
      </>
  );

}

export default Menu;