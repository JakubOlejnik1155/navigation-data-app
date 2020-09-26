import React, { useState, useEffect } from 'react';
import NavBar from './Components/NavBar';
import styled from 'styled-components';
import { theme } from './data/styleThemes';
import AppContent from './Components/AppContent';
import { get } from 'idb-keyval';
import InstallPopupp from './Components/InstallPopup';

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
