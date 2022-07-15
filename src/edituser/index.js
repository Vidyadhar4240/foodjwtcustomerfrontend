import { UseLocalState } from "../util/UseLocalStorage";
import React, { useEffect, useState } from "react";
import { Grid, Paper, Link } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Navbar from "../header";
import { useNavigate } from "react-router-dom";

const paperStyle = {
  padding: 50,
  height: 'auto',
  width: 300,
  margin: "20px auto"
}

const passwordStyle={
  paddingbottom: 20
}

const EditProfile = () => {
  const navigate = useNavigate();
  const requ = React.useRef();
  const [jwt, setjwt] = UseLocalState("", "jwt");
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [update, setUpdate] = useState(false);
  let obj = null;

  useEffect(() => {
    fetch("/api/from_restaurant/edit", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((userDetailsData) => {
        obj = userDetailsData;
        setId(obj.id);
        setUsername(obj.username);
        setFirstName(obj.firstName);
        setLastName(obj.lastName);
        // console.log(obj);
        // console.log(rideId);

        setUpdate(true);
        // console.log("user_id" + id + "--");
      });
  }, [obj]);

  function saveRequest() {
    const data = {
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    if(requ.current.reportValidity()){

    fetch("/api/from_restaurant/update", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200){
          console.log("inside then response");
          return Promise.all([response.json(), response.headers]);
        }
        else return Promise.reject("Invalid Updating");
      })
      .then(([body, headers]) => {
        window.location.href = "/listrestaurant";
        // navigate("/dashboard")
        console.log("reached");
        alert("Successfully Updated");
      })
      .catch((message) => {
        console.log("inside catch")
        alert(message);
      });
    }
  }

  return (
    
   <>
    <Navbar />
    <Paper elevation={10} style={paperStyle} >
    <form ref={requ}>
    <Grid container direction={"column"} spacing={5}>
      
            <Grid item align='center'>
            <h2> Update Profile </h2>
            </Grid>
            <Grid item> <TextField value={username} fullWidth readonly></TextField> </Grid>
            <Grid item> <TextField value={password} label='Password' placeholder='Enter Password' type='password' fullWidth required style={passwordStyle} onChange={(event) => setPassword(event.target.value)}></TextField> </Grid>
            <Grid item> <TextField value={firstName}  placeholder='Enter New First Name' fullWidth required onChange={(event) => setFirstName(event.target.value)}></TextField> </Grid>
            <Grid item> <TextField value={lastName} placeholder='Enter New Last Name' fullWidth required onChange={(event) => setLastName(event.target.value)}></TextField> </Grid>
            <Grid item> <Button color='primary' variant='contained' fullWidth onClick={(event) => { requ.current.reportValidity(); saveRequest();}}> Update </Button> </Grid>
            <Grid container direction={"column"} spacing={1.8}>
            </Grid>
            
    </Grid>
    </form>
    </Paper> 
    
    </>
    
  );
};

export default EditProfile;
