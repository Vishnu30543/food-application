//import React from 'react'
import { Button } from '@mui/material';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  return (
    <>
        <Navbar />
        <div style={{marginTop:'20px'}}>
          <h3 style={{fontSize:'30px',display:'flex', justifyContent:'center'}}>Payment Successful!</h3> <br/>
          <p style={{fontSize:'20px',display:'flex', justifyContent:'center'}}>Thank you for your purchase. Your payment was successfully processed.</p>
        </div><br/>
        <div style={{display:'flex', justifyContent:'center'}}>
          <Button onClick={() => navigate('/')} variant='contained' size='small'>Go to Home</Button>
        </div>
    </>
  )
}

export default SuccessPage