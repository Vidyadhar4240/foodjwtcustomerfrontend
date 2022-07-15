import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { UseLocalState } from '../util/UseLocalStorage';
import {useState, useEffect} from 'react';
import DividerWithText from './divider';
import '../popupstyles/popup.css';
import dateFormat from 'dateformat';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
  const [jwt,setjwt] = UseLocalState("","jwt");
  const [orderDetails,setorderDetails] = useState();
  const [orderItems, setorderItems] = useState([]);
  console.log(props);
  console.log(props.orderItem, "orderItem");
  useEffect(() => {
    if (props.orderItem) {
    fetch(`/api/from_restaurant/get_menu_items/${props.orderItem.orderId}`, {
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`
      },
      method: "GET"
  })
  .then((response) => {
      if(response.status === 200) return response.json();
      })
      .then((data) => {
        setorderDetails(data);
        setorderItems(data.menuNames);
      })
  }}, [props.orderItem])

  function formatDate(date) {
    date = dateFormat(date, "dddd, mmmm d, yyyy, h:MM TT");
    date = date.toString(date);
    return date;
  }

  return (
      <BootstrapDialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.popupStatus}
      >
        <BootstrapDialogTitle className="orderTitle" id="customized-dialog-title" onClose={props.handleClose}>
          Order Details
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <img src="https://images.unsplash.com/photo-1529928520614-7c76e2d99740?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" alt='Restaurant Image' className='card__image' />
            <strong style={{ fontSize: 24 }}>{props.orderItem && props.orderItem.restaurantName}</strong>
          </Typography>
          <DividerWithText></DividerWithText>
          <Typography gutterBottom className='orderMenu'>            
            <span>Order Menu Details</span>
            <div className='marginRight20'>
                {orderItems.map(name => (  
              <div>  
                <strong key={orderItems.indexOf(name)} style={{fontSize: 20}}>{name}</strong> 
              </div>  
              ))}  
            </div>
          </Typography>
          <DividerWithText>
          </DividerWithText>
          <Typography gutterBottom className='spaceBetweenParent'>
            <span>Order Total</span> <span className='marginRight40' style={{ fontWeight: 700, fontSize: 24 }}>₹ {props.orderItem && props.orderItem.totalAmount}</span>
          </Typography>
          <DividerWithText></DividerWithText>
          <Typography gutterBottom>            
            <span className='marginRight20' style={{ fontWeight: 500, fontSize: 15, color: '#333' }}>{props.orderItem && formatDate(props.orderItem.orderDate)}</span>        
          </Typography>
        </DialogContent>       
      </BootstrapDialog>
  );
}
