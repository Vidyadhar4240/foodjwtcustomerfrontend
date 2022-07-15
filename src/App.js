import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { UseLocalState } from './util/UseLocalStorage';
import { Route, Routes } from 'react-router-dom';

import Register from './register';
import Login from './login';
import Navbar from './header';
import RestaurantList from './restaurantList';
import MenuList from './menuList';
import EditProfile from './edituser';
import OrderList from './orderlist';

function App(props) {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Register />}></Route>
      <Route exact path="/listrestaurant" element={<RestaurantList {...props} />}></Route>
      <Route exact path="/listmenu/:id" element={<MenuList />}></Route>
      <Route exact path="/header" element={<Navbar />}></Route>
      <Route exact path="/editprofile" element={<EditProfile />}></Route>
      <Route exact path="/orderhistory" element={<OrderList />}></Route>
    </Routes>
  );
}

export default App;
