import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import DialogTitle from '@material-ui/core/DialogTitle';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import AlternateEmailRoundedIcon from '@material-ui/icons/AlternateEmailRounded';
import Grid from '@material-ui/core/Grid';
import {theme} from "../../data/styleThemes";
import {withStyles} from "@material-ui/core";
import { useForm } from 'react-hook-form';
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from '@material-ui/core/Snackbar';
import {postFetchFunction} from '../../data/functions';
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from "@material-ui/core/styles";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(() => ({
    backdrop: {
        zIndex: 999,
        color: theme.blue,
        display: 'flex',
        flexDirection: 'column'
    },
}));

const LoginDialog = ({state, isLoginDialogOpen, setIsLoginDialogOpen}) => {
    const classes = useStyles();
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
    const { register, handleSubmit } = useForm();
    const [login, setLogin] = React.useState(true);
    const [isSnackbar, setIsSnackbar] = React.useState({
        open: false,
        text: '-',
        severity: '',
    });
    const [isLoading, setIsLoading] = React.useState(false)

    const handleCloseSnackbar = () => {
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
    const handleClose = () =>{
        setIsLoginDialogOpen(false)
    };
    const onLogin = (data) => {
        let flag = true;
        if (data.loginEmail === '' || data.loginPassword === '') {
            handleShowSnackbar('Fill all inputs', 'error');
            flag = false;
        }
        if (data.loginPassword.length < 8) {
            handleShowSnackbar('Bad Password', 'error');
            flag = false;
        }
        if (data.loginEmail.indexOf('@') === -1) {
            handleShowSnackbar('Bad email', 'error');
            flag = false;
        }
        if (flag){
            console.log("login",data)
        }
    }
    const onRegister = (data) => {
        let flag = true;
        if (data.registerEmail === '' || data.registerPassword === '' || data.registerPassword2 === '') {
            handleShowSnackbar('Fill all inputs', 'error');
            flag = false;
        }
        if (data.registerPassword.length < 8) {
            handleShowSnackbar('Bad Password', 'error');
            flag = false;
        }
        if (data.registerPassword !== data.registerPassword2) {
            handleShowSnackbar('Passwords are not the same', 'error');
            flag = false;
        }
        if (data.registerEmail.indexOf('@') === -1) {
            handleShowSnackbar('Bad email', 'error');
            flag = false;
        }
        if (flag){
            try{
                setIsLoading(true)
                postFetchFunction( '/register', {
                    email: data.registerEmail,
                    password: data.registerPassword,
                    password2: data.registerPassword2})
                    .then(response => {
                        if(response.error) handleShowSnackbar(response.msg, 'error')
                        else{
                            setIsLoading(false);
                            setIsLoginDialogOpen(false);
                            handleShowSnackbar("Successfully logged in", 'success');
                        }

                    })
            }catch (e) {
                setIsLoading(false)
                handleShowSnackbar('Something get wrong', 'error');
            }
        }
    }


    return(
        <>
            <Dialog
                open={isLoginDialogOpen}
                aria-labelledby="form-dialog-title"
                PaperProps={state.isNightModeOn ? {
                    style: { backgroundColor: theme.dark, color: theme.light }
                } : {}}
            >
                <DialogTitle id="form-dialog-title">{login ? 'Login' : 'Register'}</DialogTitle>

                    {login ? (
                        <>
                            <DialogContent
                                style={state.isNightModeOn ? { color: theme.light } : { color: theme.dark }}
                            >
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <AlternateEmailRoundedIcon style={{width: '20px', height: '20px'}}/>
                                </Grid>
                                <Grid item>
                                        <CssTextField
                                            autoComplete="off"
                                            margin="dense"
                                            id="email"
                                            label="email"
                                            type="email"
                                            fullWidth
                                            name='loginEmail'
                                            inputRef={register()}
                                        />

                                </Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <LockOpenRoundedIcon style={{width: '20px', height: '20px'}}/>
                                </Grid>
                                <Grid item>
                                    <CssTextField
                                        autoComplete="off"
                                        margin="dense"
                                        id="password"
                                        label="password"
                                        type="password"
                                        fullWidth
                                        name="loginPassword"
                                        inputRef={register()}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                style={{fontSize: '12px', margin: '15px auto 0 auto',width: '100%', color: state.isNightModeOn ? theme.blue : theme.dark}}
                                onClick={() => {
                                    setLogin(!login)
                                }}
                            >
                                I don't have an account yet.
                            </Button>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleClose}
                                color="secondary"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit(onLogin)}
                                color="secondary"
                                style={{marginLeft: 'auto'}}
                            >
                                <ExitToAppTwoToneIcon/>
                            </Button>
                        </DialogActions>
                        {isLoading && (
                            <Backdrop className={classes.backdrop} open={isLoading}>
                                <CircularProgress color="inherit" />
                                <span style={{fontFamily: 'Poppins, sans-serif', fontSize: '18px'}}>Give us a second...</span>
                            </Backdrop>
                        )}
                        </>
                    ) : (
                        <>
                        <DialogContent
                            style={state.isNightModeOn ? { color: theme.light } : { color: theme.dark }}
                        >
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <AlternateEmailRoundedIcon style={{width: '20px', height: '20px'}}/>
                                </Grid>
                                <Grid item>
                                    <CssTextField
                                        autoComplete="off"
                                        margin="dense"
                                        id="emailR"
                                        label="email"
                                        type="email"
                                        fullWidth
                                        name="registerEmail"
                                        inputRef={register()}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <LockOpenRoundedIcon style={{width: '20px', height: '20px'}}/>
                                </Grid>
                                <Grid item>
                                    <CssTextField
                                        autoComplete="off"
                                        margin="dense"
                                        id="passwordR"
                                        label="password"
                                        type="password"
                                        fullWidth
                                        name="registerPassword"
                                        inputRef={register()}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <LockOpenRoundedIcon style={{width: '20px', height: '20px'}}/>
                                </Grid>
                                <Grid item>
                                    <CssTextField
                                        autoComplete="off"
                                        margin="dense"
                                        id="password2"
                                        label="repeat password"
                                        type="password"
                                        fullWidth
                                        name="registerPassword2"
                                        inputRef={register()}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                style={{fontSize: '12px', margin: '15px auto 0 auto',width: '100%', color: state.isNightModeOn ? theme.blue : theme.dark}}
                                onClick={() => setLogin(!login)}
                            >
                                I already have an account.
                            </Button>
                        </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={handleClose}
                                    color="secondary"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit(onRegister)}
                                    color="secondary"
                                    style={{marginLeft: 'auto'}}
                                >
                                    <ExitToAppTwoToneIcon/>
                                </Button>
                            </DialogActions>
                            {isLoading && (
                                <Backdrop className={classes.backdrop} open={isLoading}>
                                    <CircularProgress color="inherit" />
                                    <span style={{fontFamily: 'Poppins, sans-serif', fontSize: '18px'}}>Give us a second...</span>
                                </Backdrop>
                            )}
                        </>
                    )}
            </Dialog>
            <Snackbar
                open={isSnackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert severity={isSnackbar.severity} >
                    {isSnackbar.text}
                </Alert>
            </Snackbar>
        </>
    )
}

export default LoginDialog;
