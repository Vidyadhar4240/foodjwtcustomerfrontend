import React from 'react';
import dateFormat from 'dateformat';

const Card = (props) => {

  function formatDate(date) {
    date = dateFormat(date, "dd, mmmm yyyy, h:MM TT");
    date = date.toString(date);
    return date;
  }
    
    return (
      <>
      <div className='myCard'>
        <div className="card__body">
          <img src={props.img} alt={props.img} className="card__image" />
          <h2 className="card__title">{props.title}</h2>
          <div className="card__description"><div style={{ fontSize: '15px', fontWeight: 'bold'}}>Total Price: </div>{props.price}</div>
          <div className="card__description"><div style={{ fontSize: '15px', fontWeight: 'bold'}}>Date of order </div>{formatDate(props.date)}</div>
          <div className="orderlistButtonCenter">
          <button className="cardBtn" onClick={props.onClick}>Show Order Details</button>  
          </div>    
        </div>
      </div>      
      </>
    );
  }

  export default Card;