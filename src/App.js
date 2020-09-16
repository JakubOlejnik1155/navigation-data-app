import React, { useState, useEffect } from 'react';
import NavBar from './Components/NavBar';
import styled from 'styled-components';
import { theme } from './data/styleThemes';
import AppContent from './Components/AppContent';
import { get } from 'idb-keyval';

const AppContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    max-height: 100vh;
    background-color: ${props => props.state.isNightModeOn ? theme.dark : theme.light}
  `;

function App() {

  const [state, setState] = useState({
    isMenuOpened: false,
    isNightModeOn: false,
    isTripActive: false,
    isWeatherDataWarning: true,
  });

  useEffect(() => {
    async function ReadIndexDB() {
      setState({
        ...state,
        isNightModeOn: await get('nightMode') === true ?  true : false,
        isWeatherDataWarning: await  get('isWeatherDataWarning') === false ? false : true
      })
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
        state={state}
        setState={setState}
      />
      <AppContent
        state={state}
        setState={setState}
      />
    </AppContainer>
  );
}

export default App;
