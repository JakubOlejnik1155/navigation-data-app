import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Map from './AddHarborMap';
import formatcoords from 'formatcoords';
import { theme } from '../../data/styleThemes';
import { withStyles } from '@material-ui/core';




const AddHarborDialog = ({ state, isDialogOpen, setIsDialogOpen, addHarbor}) => {
    const [position, setPosition] = React.useState();
    const CssTextField = withStyles({
        root: {
            "& label": {
                color: `${state.isNightModeOn ? theme.light : theme.dark}`
            },
            "& label.Mui-focused": {
                color: `${state.isNightModeOn ? theme.light : theme.dark}`
            },
            "& .MuiInputBase-input": {
                color: `${state.isNightModeOn ? theme.light : theme.dark}`
            },
            "& .MuiInput-underline:after": {
                borderBottomColor: `${state.isNightModeOn ? theme.light : theme.dark}`
            },
            "& .MuiInput-underline:before": {
                borderBottomColor: `${state.isNightModeOn ? theme.light : theme.dark}`
            }
        }
    })(TextField);
    return (
        <Dialog open={isDialogOpen} aria-labelledby="form-dialog-title"
            PaperProps={state.isNightModeOn ? {
                style: {backgroundColor: theme.dark, color: theme.light}
            } : {}}
        >
            <DialogTitle id="form-dialog-title">New Harbor</DialogTitle>
            <DialogContent>
                <DialogContentText style={state.isNightModeOn ? { color: theme.light } : { color: theme.dark }}>
                    Please, fill in the necessary information:
                </DialogContentText>
                <DialogContentText style={state.isNightModeOn ? { color: theme.light } : { color: theme.dark }}>
                    Position: <br></br> {position ? formatcoords(position.lat, position.lng).format('DDMMssX', { latLonSeparator: '| ', decimalPlaces: 3 }).split('|')[0]: "__°__'_.__'' N/S "}
                             {position ? formatcoords(position.lat, position.lng).format('DDMMssX', { latLonSeparator: '| ', decimalPlaces: 3 }).split('|')[1]: "__°__'_.__'' E/W "}
                </DialogContentText>

                <Map state={state} position={position} setPosition={setPosition}/>
                <CssTextField
                    margin="dense"
                    id="harborName"
                    label="Harbor name"
                    type="text"
                    fullWidth
                />
                <CssTextField
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    multiline
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() =>{
                     setIsDialogOpen(false)
                     setPosition();
                     }} color="secondary">
                    Cancel
                    </Button>
                <Button onClick={() => {
                    setIsDialogOpen(false)
                    addHarbor(position, document.querySelector('#harborName').value, document.querySelector('#description').value)
                    setPosition()
                    }} color="secondary">
                    Add harbor
                    </Button>
            </DialogActions>
        </Dialog>
     );
}

export default AddHarborDialog;