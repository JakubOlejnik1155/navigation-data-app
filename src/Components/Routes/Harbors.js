import React from 'react';
import { get, set } from 'idb-keyval';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import { theme } from '../../data/styleThemes';
import { makeStyles } from '@material-ui/core/styles';
import AddHarborDialog from './AddHarborDialog';
import OneHarbor from './OneHarbor';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(() => ({
    fab: {
        position: 'absolute',
        color: theme.blue,
        bottom: '8px',
        right: '8px',
        backgroundColor: theme.dark,
        '&:hover': {
            backgroundColor: theme.dark,
        }
    }
}));

const Harborcontainer = styled.div`
    background-color: transparent;
    color: ${props => props.state.isNightModeOn ? theme.red : theme.dark};
    width: 100%;
    padding: 5px;
    height: calc(100vh - 40px);
    overflow-y: scroll;
`;
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Harbors = ({state}) => {
    const classes = useStyles();
    const [harborArray, setHarborArray] = React.useState();
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [isSnackbar, setIsSnackbar] = React.useState({
        open: false,
        text: '-',
        severity: 'success',
    });

    React.useEffect(()=>{
        async function getHarborArray(){
            await get("harborsArray").then((array)=> {
                setHarborArray(array)
            })
        }
        // eslint-disable-next-line no-unused-vars
        let a = getHarborArray();
        return ()=>{
            a = false;
        }
    },[])
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

    const addHarbor = async (pos, name, desc) => {
        if(pos===undefined || name ==="") {
            handleShowSnackbar("fill the information to add harbor", "warning");
        } else{
            let array = []
            async function getHarbors(){
                await get("harborsArray").then(val => {
                    if (val) {
                        array = val;
                    }
                })
            }
            await getHarbors()
            array = [...array, { pos, name, desc }]
            await set("harborsArray",array )
            setHarborArray(array)
            setIsDialogOpen(false);
        }
    }

    return (
        <>
            <Harborcontainer
                state={state}
            >
                {harborArray && harborArray.map(harbor =>(
                    <OneHarbor key={harbor.pos.lat} state={state} harbor={harbor} harborArray={harborArray} setHarborArray={setHarborArray}/>
                ))}
                <Fab
                    size="small"
                    aria-label="add"
                    className={classes.fab}
                    onClick={()=>setIsDialogOpen(true)}
                >
                    <AddIcon />
                </Fab>
            </Harborcontainer>
            <AddHarborDialog
                state={state}
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                addHarbor={addHarbor}
            />
            <Snackbar
                open={isSnackbar.open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert severity={isSnackbar.severity} >
                    {isSnackbar.text}
                </Alert>
            </Snackbar>
        </>
     );
}

export default Harbors;