import React from 'react';
import styled from 'styled-components';
import { theme } from '../../data/styleThemes';
import Cancel from '../../images/cancel.svg';
import {Link} from 'react-router-dom'
const Container = styled.div`
    width: 100%;
    height: calc(100vh - 40px);
    background-color: transparent;
    color: ${props => props.state.isNightModeOn ? theme.light : theme.dark};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const ErrorMsg = styled.span`
    font-size: 32px;
    margin: 10px 0;

`;

const Error404 = ({state}) => {
    return (
        <Container state={state}>
            <img src={Cancel} alt="warning" width="80" height="80"/>
            <ErrorMsg>Error 404</ErrorMsg>
            <Link to="/" style={{textDecoration: 'none', color: theme.blue, fontSize: '24px'}}>Back to the main page</Link>
        </Container>
     );
}

export default Error404;