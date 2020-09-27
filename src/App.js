import React, { useState, useEffect } from 'react';
import NavBar from './js/Components/NavBar';
import styled from 'styled-components';
import { theme } from './data/styleThemes';
import AppContent from './js/Routes/AppContent';
import {get} from 'idb-keyval';
import InstallPopupp from './js/Components/InstallPopup';
import {getFetchFunction} from "./data/functions";
import {LoginContext} from "./js/ContextLoginApi";

const AppContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    max-height: 100vh;
    background-color: ${props => props.state.isNightModeOn ? theme.dark : theme.light};
    position: relative;
  `;

function App() {

  const [state, setState] = useState({
    isMenuOpened: false,
    isNightModeOn: false,
    isTripActive: false,
    isWeatherDataWarning: true,
  });
  const LoginAPI = React.useContext(LoginContext)
  const [trip, setTrip] = React.useState([]);
  const [distance, setDistance] =React.useState(0);
  const [log, setLog] = React.useState(0)

  useEffect(() => {
    async function ReadIndexDB() {
      setState({
        ...state,
        isNightModeOn: await get('nightMode') === true ?  true : false,
        isWeatherDataWarning: await  get('isWeatherDataWarning') === false ? false : true,
      });
      setLog(await get('log') ? await get('log') : 0);
    }
    ReadIndexDB();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
      async function checkLogin(){
        await get("jwt").then(value => {
          if(value !== undefined && navigator.onLine){
            try{
              getFetchFunction('/')
              .then(response => {
                if (response.ok){
                  LoginAPI.setIsLogin({user: response.object, login: true});
                }
              })
            }catch (e) {
              console.log(e)
            }
          }
        })
      }
      checkLogin();
    // eslint-disable-next-line
  }, [])

  return (
    <AppContainer
      state={state}
      setState={setState}
    >
      <NavBar
        log={log}
        setLog={setLog}
        setTrip={setTrip}
        setDistance={setDistance}
        state={state}
        setState={setState}
      />
      <AppContent
        setTrip={setTrip}
        state={state}
        trip={trip}
        log={log}
        distance={distance}
        setState={setState}
      />
      <InstallPopupp />
    </AppContainer>
  );
}

export default App;
