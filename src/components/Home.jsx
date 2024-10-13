import { Button } from '@mui/material';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
        <Navbar />
        <div id='home'>
        <img src='food_delivery_preview-removebg.png' height={200}/>
          <div id='text'>
            <h1>Food Delivery in Minutes</h1><br/>
            <p>Ordering your favorite food online is a convenient and enjoyable way to satisfy your cravings without leaving the comfort of your home. With just a few clicks, you can browse through a variety of restaurants and cuisines, choose from an extensive menu, and customize your order to your liking.</p>
          <br/>
          <Button onClick={() => navigate('/menu')} variant='contained' size='small'>Order Now</Button>
          </div>
          </div>
    </>
  )
}

export default Home