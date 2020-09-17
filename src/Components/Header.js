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


const Header = ({state, setState}) => {

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
                    setState({ ...state, isTripActive: false })
                    handleShowSnackbar("trip has been ended","warning")
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