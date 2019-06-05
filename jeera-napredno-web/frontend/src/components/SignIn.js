import React from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { withStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

const styles = {
    signInPaper: {
        padding: "2em"
    },
    signInContainer: {
        marginTop: "2em"
    },
    submitButton:{
        marginTop: "1em"
    }
};

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email: "", password: "", loggedIn: false, loginError: false}
    }

    render() {
        const { classes } = this.props;
        const context = this.context;
        console.log(context);
        const handleInput = (e) => {
            e.target.id === "email" ?
            this.setState({email: e.target.value}): this.setState({password: e.target.value});
        };

        const handleLogin = () => {
            axios.post('http://localhost:3000/user/login',
                {email: this.state.email, password: this.state.password})
                .then((res) => {
                        console.log(res);
                        this.setState({loggedIn:true})
                        this.props.history.push('/users');
                        this.context.setAuth(true, res.data.jwt);
                        console.log(this.context.loggedIn)
                    })
                .catch((err) => {console.log(err);})
        };

        return(
            <Container maxWidth="xs" className={classes.signInContainer}>
            <Paper className={classes.signInPaper}>
                <Typography variant="h5" color="textSecondary" align="center">
                Sign in
                </Typography>
                <TextField error={this.state.loginError} margin="normal" fullWidth id="email" label="email" onChange={handleInput}/>
                <TextField error={this.state.loginError} margin="normal" fullWidth id="password" type="password" label="password" onChange={handleInput}/>
                 <Button className={classes.submitButton} fullWidth variant="contained" color="primary" onClick={handleLogin}>Submit</Button>
            </Paper>
            </Container>
        )
    }

}

export default withStyles(styles)(SignIn)

