import React, { useState } from 'react';
import NavBar from './Components/NavBar';
import styled from 'styled-components';
import { theme } from './data/styleThemes';
import AppContent from './Components/AppContent';

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
  });


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
