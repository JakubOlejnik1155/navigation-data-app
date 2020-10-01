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
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import { set } from 'idb-keyval';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {deleteFetchFunction} from "../../data/functions";

const OneHarbor = ({ state, harbor, harborArray, setHarborArray}) => {
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
        deleteIcon:{
            fill: theme.red,
        },
        deleteBtn:{
            position: 'absolute',
            bottom: '2px',
            right: '2px'
        }
    }));
    const classes = useStyles();
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const deleteHarbor = async (harbor) => {
        if(navigator.onLine){
            deleteFetchFunction(`/harbor/${harbor.name}`)
                .then(() => {})
        }
        let newArray = [];
        for (let i = 0; i < harborArray.length; i++) {
            const element = harborArray[i];
            if (element.name !== harbor.name && element.pos !== harbor.pos && element.desc !== harbor.desc) {
                newArray.push(element)
            }
        }
        await set("harborsArray", newArray)
        setHarborArray(newArray);
    }

    return (
        <div className={classes.root}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
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
                    <IconButton aria-label="delete" size="small" className={classes.deleteBtn} onClick={() => { setIsDialogOpen(true) }}>
                        <DeleteIcon fontSize="small" className={classes.deleteIcon} />
                    </IconButton>
                </AccordionDetails>
            </Accordion>
            <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={state.isNightModeOn ? {
                    style: { backgroundColor: theme.dark, color: theme.light }
                } : {}}
            >
                <DialogTitle id="alert-dialog-title">
                    Warning!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"
                        style={state.isNightModeOn ? { color: theme.light } : { color: theme.dark }}
                    >
                        Are you sure you want to remove this harbor from your history? This operation is irreversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)} color="secondary">
                        Disagree
                    </Button>
                    <Button onClick={()=>deleteHarbor(harbor)} color="secondary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
     );
}

export default OneHarbor;