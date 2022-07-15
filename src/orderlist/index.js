import React, { useEffect, useState } from 'react';
import { UseLocalState } from '../util/UseLocalStorage';
import Navbar from '../header';
import Card from '../components/orderItemCard';
import './orderlist.css';
import OrderListItemPopup from '../components/popup';

const OrderList = (props) => {
    const [jwt, setjwt] = UseLocalState("","jwt");
    const [orderItems, setOrderItems] = new useState([]);
    const [selectedOrderItem, setSelectedOrderItem] = new useState(null);
    const [popupStatus, setPopupStatus] = new useState(false);
    const [fromOrderPopup,setfromOrderPopup] = new useState(sessionStorage.getItem("fromOrder"));

    useEffect((id) => {
        fetch(`/api/from_restaurant/order_history`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            method: "GET"
        })
        .then((response) => {
            if(response.status === 200) return response.json();
        })
        .then(listorderItemsData => { setOrderItems(listorderItemsData)
        })
    }, []);

    function clickHandler(orderItem) {
        setSelectedOrderItem(orderItem);
        setPopupStatus(true);
    }

    function showPopupFromOrder() {

        if (sessionStorage.getItem('fromOrder') && orderItems) {   
            sessionStorage.removeItem('fromOrder');
            console.log(orderItems[0], "order");
            return (
                <OrderListItemPopup orderItem={orderItems[0]} popupStatus={fromOrderPopup} handleClose={() => {
                    setfromOrderPopup(false);
                    setSelectedOrderItem(null);
                }}/>  
            )
        }
    }
    return (
        <>
            <Navbar />
            <div className="wrapper">
                {orderItems.length > 0 ? orderItems.map((orderItem) => <Card 
                    key={orderItem.orderId}
                    img="https://images.unsplash.com/photo-1529928520614-7c76e2d99740?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                    order_id={orderItem.orderId}
                    price={orderItem.totalAmount} 
                    date={orderItem.orderDate}  
                    onClick={() => clickHandler(orderItem)}
                />) : <>
                    <div className="order-empty"><span>Your Order History is empty</span></div>
                </>}        
            </div>
            <div>
                    {showPopupFromOrder()}
            </div>          
            <OrderListItemPopup orderItem={selectedOrderItem} popupStatus={popupStatus} handleClose={() => {
                setPopupStatus(false);
                setSelectedOrderItem(null);
            }}/>            
        </>
    );
}

export default OrderList;