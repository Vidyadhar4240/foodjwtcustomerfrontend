import React, { useEffect, useState } from 'react';
import { UseLocalState } from '../util/UseLocalStorage';
import Switch from '@mui/material/Switch';
import { Tag } from 'antd';

const Card = (props) => {
    const [jwt,setjwt] = UseLocalState("","jwt");

    function clickHandler(){
    window.location.href = `/listmenu/${props.description1}`;

    }
        return (           
          <div className="myCard" onClick={() => {
            props.setSelectedRestaurants((selectedRestaurants) => {
                if (selectedRestaurants.includes(props.restaurantId)) {
                    return selectedRestaurants.filter(restaurant => restaurant !== props.restaurantId)
                } else {
                    return [...selectedRestaurants, props.restaurantId]
                }
            }) 
          }}>
            <div className="card__body">
              <img src={props.img} alt={props.img} className="card__image" />
              <div className="card__title">{props.title}<span className={ props.veg ? 'card__veg' : 'card__hide'}>V</span><span className={ props.nonveg ? 'card__nonveg' : 'card__hide'}>N</span></div>
              <div className="card__description"><div style={{ fontSize: '15px', fontWeight: 'bold'}}>Address</div>{props.description2}</div>                                      
              <div className='restaurantButtonCenter'>
              <button className="cardBtn" onClick={() => {
            clickHandler()
            }}>View Menu</button>
            </div>
            </div>
          </div>
        );
      }

    
export default Card;