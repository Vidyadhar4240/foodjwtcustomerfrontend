import React, { useEffect, useState } from 'react';
import { UseLocalState } from '../util/UseLocalStorage';
import './menuList.css';
import Button from '@mui/material/Button';
import Navbar from '../header';
import Card from '../components/menuItemCard';
import BreadcrumbMenu from '../components/breadcrumbmenu';

const MenuList = (props) => {

    const restaurantId = window.location.href.split("/listmenu/")[1];
    const [jwt,setjwt] = UseLocalState("","jwt");
    const [listmenus, setListmenus] = new useState(null);
    const [selectedMenus, setSelectedMenus] = useState([]);
    const [restaurantName, setRestaurantName] = useState("");
    
    useEffect(() => {
        if(restaurantId) fetch(`/api/from_restaurant/menu_list/${restaurantId}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            method: "GET"
        })
        .then((response) => {
            if(response.status === 200) return response.json();
        })
        .then(listmenusData => { setListmenus(listmenusData)
        })
    }, []);

    useEffect(() => {
        if(restaurantId) fetch(`/api/from_restaurant/restaurant_name/${restaurantId}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            method: "GET"
        })
        .then((response) => {
            if(response.status === 200) return response.json();
        })
        .then(restaurantNameData => { setRestaurantName(restaurantNameData)
        })
    }, []);   

    function saveOrder() {
        const order_data = {
            menuIds: selectedMenus
        }
        fetch('/api/from_restaurant/save_order', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            method: "POST",
            body: JSON.stringify(order_data)
        }).then(response =>{
           
            if (response.ok) 
                console.log('Order saved successfully');
            else 
                alert('Order not saved successfully');
        })
        .then(() => {
            sessionStorage.setItem('fromOrder', true);
            window.location.href = '/orderhistory';
        })
        setSelectedMenus([]);

    }

    return (
       <>
       <Navbar />
        <BreadcrumbMenu />
        <div className='restaurantName'>{restaurantName.restaurantName}</div>
        <div className="wrapper">
            {listmenus ? listmenus.map(listmenu => <Card
            key={listmenu.id}
            img={listmenu.image_url}
            title={listmenu.name}
            description1={listmenu.restaurant.name}
            description2={listmenu.price}
            menuId = {listmenu.id}
            menu_description = {listmenu.menu_description}
            setSelectedMenus = {setSelectedMenus}
            className = {`card  ${selectedMenus.includes(listmenu.id) ? "cardBorder" : ""}`}
        />) : <></>}
        </div>
        <div className='saveOrderButton'>
        <Button variant="contained" disabled={selectedMenus.length === 0} onClick={() => {saveOrder()}}>Order</Button>
        </div>
        </>
    );
};

export default MenuList;  