import React, { useEffect, useState } from 'react';
import { UseLocalState } from '../util/UseLocalStorage';
import './restaurantList.css';
import Navbar from '../header';
import Card from '../components/restaurantItemCard';
import BreadcrumbRestaurant from '../components/breadcrumbrestaurant';
const RestaurantList = () => {
    const [jwt,setjwt] = UseLocalState("","jwt");
    const [listrestaurants, setListrestaurants] = new useState(null);
    const [selectedRestaurants, setSelectedRestaurants] = useState([]);
    
    useEffect(() => {
        fetch("/api/from_restaurant/list_restaurants",{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            method: "GET"
        })
        .then((response) => {
            if(response.status === 200) return response.json();
        })
        .then(listrestaurantsData => { setListrestaurants(listrestaurantsData)
        })
    }, []);

    return (
        <>
            <Navbar />   
            <BreadcrumbRestaurant />
            <div className="wrapper">       
                {listrestaurants ? listrestaurants.map(listrestaurant => <Card
            key={listrestaurant.id}
            img={listrestaurant.image_url}
            title={listrestaurant.name}
            description1={listrestaurant.id}
            description2={listrestaurant.address}
            restaurantId = {listrestaurant.id}
            veg={listrestaurant.veg}     
            nonveg={listrestaurant.nonVeg}
            setSelectedRestaurants = {setSelectedRestaurants}
            />) : <></>}
            </div>
        </>
    );
};

export default RestaurantList;