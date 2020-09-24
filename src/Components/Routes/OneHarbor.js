import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import formatcoords from 'formatcoords';
import { theme } from '../../data/styleThemes';
import StaticMap from './StaticMap';

const OneHarbor = ({state, harbor}) => {
    const useStyles = makeStyles(() => ({
        root: {
            width: '100%',
            marginTop: '10px',
            '& .MuiAccordion-root': {
                backgroundColor: `${state.isNightModeOn ? 'rgb(80,80,80)' : 'rgb(170,170,170)'}`,
                color: `${state.isNightModeOn ? theme.light : theme.dark}`,
            }
        },
        heading: {
            fontSize: '18px',
            fontWeight: "bold",
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: '16px',
            fontWeight: '100'
        },
    }));
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>{harbor.name}</Typography>
                    <Typography className={classes.secondaryHeading}>
                        {formatcoords(harbor.pos.lat, harbor.pos.lng).format('DDMMsX', {latLonSeparator: '| ', decimalPlaces: 2 }).split('|')[0]}
                        {formatcoords(harbor.pos.lat, harbor.pos.lng).format('DDMMsX', { latLonSeparator: '| ', decimalPlaces: 2 }).split('|')[1]}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
                    <StaticMap state={state} harbor={harbor}/> <br></br>
                    <Typography>
                       {harbor.desc}
                     </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
     );
}

export default OneHarbor;