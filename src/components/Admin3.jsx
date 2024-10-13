import { useEffect, useState } from 'react';
import { db } from '../Firebase2';
import { getDocs, collection } from 'firebase/firestore';
import Navbar from './Navbar';
import { IconButton, Switch } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
// import Cart from './Cart';
// import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Admin3 = () => {
  const [foods, setFoods] = useState([]);
  const [searchterm, setS] = useState('');
  const [showveg, setV] = useState(false);
  const [selectCategory, setSc] = useState('');
 // const [cart, setCart] = useState({});

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    let farray = [];
    const q = await getDocs(collection(db, "sampleapp"));
    q.forEach((temp) => {
      farray.push({ ...temp.data(), id: temp.id });
    });
    setFoods(farray);
  };

  const filteredFood = foods
    .filter(food => food.name.toLowerCase().includes(searchterm.toLowerCase()))
    .filter(food => (showveg ? food.vegetarian : true))
    .filter(food => (selectCategory ? food.category === selectCategory : true));



  return (
    <>
      <Navbar />
      <div>
      <header>
      <h1>Admin</h1>
      <div id='hi'><input type='text' 
        id='search-bar'
        placeholder='Search food...'
        onChange={(e) => setS(e.target.value)} /></div><br/>
        <div id='test'>
          <select id='select' //onChange={this.handleCategoryChange} >
            onChange={(e) => setSc(e.target.value)}>
            <option value=''>All Categories</option>  {/* Default option */}
            <option value='Italian'>Italian</option>
            <option value='Main Course'>Main Course</option>
          </select>

          <span>Show Only Vegetarian</span>
          <Switch checked={showveg} defaultChecked color="warning" id='switch'
    //        onChange={() => this.setState(prevState => ({ showveg: !prevState.showveg }))}
              onChange={() => setV((prev) => !prev)}
            />
        </div>
    </header>
      <div id="food-list">
        {filteredFood.map(food => (
          <div key={food.id} className='food-card'>
            <img src={food.image} alt={food.name} />
            <h3><strong>{food.name}</strong></h3>
            <p>{food.category}</p>
            <p><strong>Vegetarian: </strong>{food.vegetarian ? 'Yes' : 'No'}</p>
            <p><strong>Stock: </strong>{food.availabilityQuantity}</p>
            <p id='price'>₹{food.price}</p>
            <div id='between'>
            <button onClick={() => navigate('/')}><CreateIcon style={{color:'cornflowerblue'}}/></button> 
            <IconButton><button><DeleteIcon style={{color:'crimson'}}/></button> </IconButton>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default Admin3;
