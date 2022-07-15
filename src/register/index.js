import React, { useState } from 'react'
import { Grid, Paper, Link } from '@material-ui/core';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { UseLocalState } from '../util/UseLocalStorage';

const Register = ({handleChange, passUsername}) => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const[jwt, setjwt] = UseLocalState("", "jwt");
    const require = React.useRef();

    const paperStyle = {
        padding: 20,
        height: 'auto',
        width: 320,
        margin: "0 auto"
    }
    const avatarStyle={
        backgroundColor:'green'
    }
    const passwordStyle={
        paddingbottom: 20
    }

    function signUpRequest() {
        const data = {
            username,
            password,
            firstName,
            lastName,
            address,
            phoneNumber
        }
        if(require.current.reportValidity()){
        fetch("/api/auth/register", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => {
            if(response.status === 200)
             return Promise.all([response.json(), response.headers]);
            else
             return Promise.reject("Invalid SignUp attempt");  
            }).then(() => {
                window.location.href = "/login";
                }) 
    }
}

    return (

        <div>
        <Paper style={paperStyle}>
        <form ref={require}>
        <Grid container direction={"column"} spacing={5}>
           
                <Grid item align='center'> 
                <Avatar style={avatarStyle}> <FoodBankIcon/> </Avatar>
                </Grid>
                <Grid item align='center'>
                <h2> SignUp </h2>
                <Typography variant='caption'>Please fill this form to create an account!</Typography>
                </Grid>
                <Grid item> 
                    <TextField
                        fullWidth
                        label='Username'
                        onChange={(event) => setUserName(event.target.value)} 
                        placeholder='Enter Username'
                        required
                    />
                </Grid>
                <Grid item> <TextField label='Password' placeholder='Enter Password' type='password' fullWidth required style={passwordStyle} onChange={(event) => setPassword(event.target.value)}></TextField> </Grid>
                <Grid item> <TextField label='City' placeholder='Enter Address'  fullWidth required  onChange={(event) => setAddress(event.target.value)}></TextField> </Grid>
                <Grid item> <TextField label='FirstName' placeholder='Enter FirstName'  fullWidth required  onChange={(event) => setFirstName(event.target.value)}></TextField> </Grid>
                <Grid item> <TextField label='LastName' placeholder='Enter LastName'  fullWidth required  onChange={(event) => setLastName(event.target.value)}></TextField> </Grid>
                <Grid item> <TextField label='PhoneNumber' placeholder='Enter PhoneNumber'  fullWidth required  onChange={(event) => setPhoneNumber(event.target.value)}></TextField> </Grid>
                <Grid item> <Button color='primary' variant='contained' fullWidth onClick={() => {require.current.reportValidity(); signUpRequest()}}> Sign Up</Button> </Grid>
                <Grid container direction={"column"} spacing={1.8}>
                <Grid item align='center'> <Typography> Already have an account? <Link href ="/login" onClick={() => handleChange("event", 0)}>  SignIn </Link></Typography> </Grid>
                </Grid>
        </Grid>
        </form>
        </Paper> 
        </div>
    );
}

export default Register;