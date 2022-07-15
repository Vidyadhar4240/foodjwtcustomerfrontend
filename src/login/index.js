import { Grid, Paper, Link } from '@material-ui/core';
import React from 'react';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { UseLocalState } from '../util/UseLocalStorage';
const LoginPage = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = UseLocalState("", "jwt");
    const require = React.useRef();

    const paperStyle = {
        padding: '20px 20px 20px 20px',
        height: 'auto',
        width: 300,
        margin: "20px auto auto auto"
    }
    const avatarStyle={
        backgroundColor:'green'
    }
    const passwordStyle={
        paddingbottom: 20
    }

    function sendLoginRequest() {
        const data = {
            username: username,
            password: password
        }
        if(require.current.reportValidity()){
        fetch('/api/auth/login', {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response =>{
            if (response.ok) 
                return Promise.all([response.json, response.headers]);
            else 
                console.log(username+"--"+password);
                return Promise.reject("Invalid login attempt");
        })
        .then(([body, headers]) => {
            setJwt(headers.get("authorization"));
            window.location.href = "/listrestaurant";
        }).catch((message) => {
            alert(message);
        });
    }
    }

    return (
        <Paper elevation={10} style={paperStyle}>
        <form ref={require}>
        <Grid container direction={"column"} spacing={5}>
           
                <Grid item align='center'> 
                <Avatar style={avatarStyle}> <AccessibilityIcon /> </Avatar>
                </Grid>
                <Grid item align='center'>
                <h2> SignIn </h2>
                </Grid>
                <Grid item> <TextField label='Username' placeholder='Enter Username' fullWidth required onChange={(event) => setUserName(event.target.value)}></TextField> </Grid>
                <Grid item> <TextField label='Password' placeholder='Enter Password' type='password' fullWidth required style={passwordStyle} onChange={(event) => setPassword(event.target.value)}></TextField> </Grid>
                <Grid item> <Button color='primary' variant='contained' fullWidth onClick={() => {require.current.reportValidity(); sendLoginRequest()}}> Sign In</Button> </Grid>
                <Grid container direction={"column"} spacing={1.8}>
                <Grid item align='center'> <Typography> Didn't have an account? <Link href ="/signup">  SignUp </Link></Typography> </Grid>               
                </Grid>
        </Grid>
        </form>
        </Paper> 
    );
};

export default LoginPage;
