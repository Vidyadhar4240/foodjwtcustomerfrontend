import React from 'react';

const Card = (props) => {
    return (
      <>
      <div className={props.className} onClick={() => {
        props.setSelectedMenus((selectedMenus) => {
            if (selectedMenus.includes(props.menuId)) {
                return selectedMenus.filter(restaurant => restaurant !== props.menuId)
            } else {
                return [...selectedMenus, props.menuId]
            }
        }) 
      }}>
        <div className="card__body">
          <img src={props.img} alt={props.img} className="card__image" />
          <h2 className="card__title">{props.title}</h2>
          <div className="card__description"><div style={{ fontSize: '15px', fontWeight: 'bold', paddingBottom: '10px'}}>{props.menu_description}</div></div>
          <div className="card__description__price"><span style={{ fontSize: '15px', fontWeight: 'bold', paddingRight: '10px'}}>Price:</span>₹ {props.description2}</div>
        </div>
      </div>
      </>
    );
  }

  export default Card;