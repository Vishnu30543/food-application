import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const Cart = (props) => {
  const cart = props.cartload;
  useEffect(() => {
    console.log(cart);
  }, []);

  const stripePromise = loadStripe("pk_test_51Q5Vy72N9ZRnb1QYE0gFHW4TZSPYh7SNuEpVdMw9ZXXuEs0r0KXc7U0UclnKfxzPr45XclWXbqIYeK6evts1vfQQ00hPa7QmA2");

  // Making an API call to our own backend, and send required data in body of request
    const handleCheckout = async () => {   
      const response = await fetch("https://payment-server-zeuv.onrender.com/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: Object.entries(cart).map(([key, item]) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
        }),
      });
  
  // Receiving the response and using it to redirect to stripe page
      const session = await response.json();
      const stripe = await stripePromise;
      console.log(session.id);
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
  
      if (error) {
        console.log("Stripe checkout error:", error);
      }
    };
  
const totalprice = Object.entries(cart).reduce((total, [key,item]) => {
  return total + item.price * item.quantity;
}, 0); 

 
return (
  <>
    <h1 id="test">Cart</h1>
  <div style={{ padding: '20px'}} id="test">
    {Object.keys(cart).length > 0 ? (
      <>
      <div style={{display:'flex'}}>
      <TableContainer component={Paper} id="receipt" sx={{ minWidth: 400, maxWidth: 500}}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Desc</TableCell>
              <TableCell align="right">Qty.</TableCell>
              <TableCell align="right">Unit cost</TableCell>
              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(cart).map(([key, item]) => (
              <TableRow key={key}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right">{item.price*item.quantity}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{totalprice}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      <div style={{display:'flex'}}>
      <Button onClick={handleCheckout} id="test" style={{ display: 'block', marginTop: '10px' }} >Checkout</Button>
      </div>
      </>
    ) : (
      <>
      <h3>No items to display</h3></>
    )}
  </div>
    
  </>
);

};

export default Cart;