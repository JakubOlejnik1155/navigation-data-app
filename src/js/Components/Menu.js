import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {del, set} from 'idb-keyval';
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
            {navigator.onLine &&(
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
                        <Button style={{margin: '2px auto', color: state.isNightModeOn ? theme.red : theme.red, fontSize: '12px', borderColor: theme.red, width: '50%'}}
                                variant="outlined"
                                color='secondary'
                                onClick={async ()=>{
                                  await del("jwt")
                                  LoginAPI.setIsLogin({
                                    login: false,
                                    user: null
                                  })
                                }}
                        >
                          logout
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
      </>
  );

}

export default Menu;