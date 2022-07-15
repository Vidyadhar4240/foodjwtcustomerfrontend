import React, { useState, useEffect } from "react";
import { UseLocalState } from '../util/UseLocalStorage';
import Logo from '../logofolder/Logo2.svg';
import './header.css';
import Avatar from '@mui/material/Avatar';

import {
  AppBar,
  Button,
  Tab,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Tabs } from "@material-ui/core";

const logo = {
  width: "60px",
  height: "60px",
}
const Header = (props) => {

    const [jwt, setjwt] = UseLocalState("", "jwt");
    const [name, setName] = useState("User Name");

    useEffect(() => {
      fetch("/api/from_restaurant/getName", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`
      },
      method: "GET"
      })
      .then((response) => {
        if(response.status === 200) return response.json();
    })
    .then(data => {setName(data.userName)})
    }, []);

    useEffect(()=> {
      if (window.location.pathname.includes("/listmenu") ){
        setValue('/listrestaurant')
      } else {
        setValue(window.location.pathname)
      }  
    })
    function handleChange(event){
     setValue(event.target.id)
     if(event.target.id==="listrestaurant"){
      ListrestaurantRequest();
     }
     else if(event.target.id==="orderHistory") {
      OrderHistoryRequest();
     }
     else {
      UpdateProfileRequest();
     }
    }
    function LogOutRequest(){
        setjwt(null);
        window.location.pathname="/login";
    }
    function UpdateProfileRequest() {
        window.location.pathname = "/editprofile";
      }
    function ListrestaurantRequest(){
        window.location.pathname = "/listrestaurant"
    }
    function OrderHistoryRequest(){
      window.location.pathname = "/orderhistory";
    }
  const [value, setValue] = useState("/listrestaurant");
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  if (name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
} else {
  return {}
}}

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
            <>
              <img style={logo} src = {Logo} alt="logo"/>
              <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              >
                <Tab value="/listrestaurant" to="/listrestaurant" id="listrestaurant" label="RestaurantList" sx={{ marginLeft: "20px", color: "#fff" }} />
                <Tab value="/editprofile" to="/editprofile" id="updateProfile" label="Update Profile" sx={{ marginLeft: "20px", color: "#fff" }} />
                <Tab value="/orderhistory" to="/orderhistory" id="orderHistory" label="Order History" sx={{ marginLeft: "20px", color: "#fff" }} />
              </Tabs>
              
            </>
            <>
              <div className="floatRightButton">
                {/* {console.log({name})} */}
                <Avatar {...stringAvatar(name)} />
                <span>{name}</span>
                <Button sx={{ marginLeft: "10px" }} variant="contained" onClick={() => LogOutRequest()}>
                  LogOut
                </Button>
              </div>
            </>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;