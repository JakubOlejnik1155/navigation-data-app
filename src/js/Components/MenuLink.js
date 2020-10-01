import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';


import { theme } from '../../data/styleThemes';



const Logo = styled.img`
  height: 35px;
  width: 35px;
`;
const useStyles = makeStyles(()=>({
    text:{
        marginLeft: '20px',
        '& .MuiTypography-root':{
            lineHeight: '35px',
            fontSize: '18px',
            float: "right",
            textDecoration: 'none',
            fontFamily: 'Poppins, sans-serif',
        }
    },
    red:{ color: theme.red},
    dark: {color: theme.dark},
    link:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
}))

const MenuLink = (props) => {
    const classes = useStyles(props.state);
    return (
        <Link to={props.link}>
            <ListItem button className = {classes.link}>
                    <Logo
                        alt="icon"
                        src={props.icon}
                    />
                <ListItemText primary={props.text}
                    className={props.state.isNightModeOn ? classes.text + " " + classes.red : classes.text + " " + classes.dark}
                />
            </ListItem>
        </Link>
    );
}

export default MenuLink;