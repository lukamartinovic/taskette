import React, {useContext, useState} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { withStyles, makeStyles } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import AuthContext from '../context/AuthContext'


const useStyles = makeStyles({
    signInPaper: {
        padding: "2em"
    },
    signInContainer: {
        marginTop: "2em"
    },
    submitButton:{
        marginTop: "1em"
    }
});

function SignIn(){
    const classes = useStyles();
    const context = useContext(AuthContext);
    const [authState, setAuth] = useState({email:"", password:"", error: false});

    const handleInput = (e) => {
        const newState = e.target.id === "email" ? {email: e.target.value}:{password: e.target.value};
        setAuth(Object.assign(authState, newState));
        console.log(authState)
    };

    const handleLogin = () => {
        axios.post('http://localhost:3000/user/login', {email: authState.email, password: authState.password})
            .then((res) => {context.authenticate(true, res.data); console.log(res)})
            .catch((err) => {console.log(err)})
    };

    return(
        <Container maxWidth="xs" className={classes.signInContainer}>
            <Paper className={classes.signInPaper}>
                <Typography variant="h5" color="textSecondary" align="center">
                    Sign in
                </Typography>
                <TextField margin="normal" fullWidth id="email" label="email" onChange={handleInput}/>
                <TextField margin="normal" fullWidth id="password" type="password" label="password" onChange={handleInput}/>
                <Button className={classes.submitButton} fullWidth variant="contained" color="primary" onClick={handleLogin}>Submit</Button>
            </Paper>
        </Container>
    )
}

export default SignIn;

