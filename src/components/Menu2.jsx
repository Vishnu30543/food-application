import { useEffect, useState } from 'react';
import {db} from '../Firebase2';
import { getDocs, collection} from 'firebase/firestore';
import Navbar from './Navbar';
import { Button, Switch } from '@mui/material';
import Cart from './Cart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Menu2 = () => {
  const [foods, setFoods] = useState([]);
  const [searchterm, setS] = useState('');          // Function besed, use useState
  const [showveg, setV] = useState(false);
  const [selectCategory, setSc] = useState('');
  const [cart, setCart] = useState({});
  // object type useState
  
  useEffect(() => {
      fetchFoods();
  },[])

  const fetchFoods = async() => {
    let farray = [];
    const q = await getDocs(collection(db,"sampleapp"));
    q.forEach((temp) => {
      farray.push({...temp.data(), id:temp.id});
    })
    setFoods(farray);
  }


//  render() {      class based use this.state
//    const { foodList, searchTerm, showveg, selectCategory } = this.state;
    const filteredFood = foods
    .filter(food => food.name.toLowerCase().includes(searchterm.toLowerCase()))
    .filter(food => showveg ? food.vegetarian : true)
    .filter(food => selectCategory ? food.category === selectCategory : true);

const handleCart = (food) => {
 //  setCart((prevCart) => {
    let newCart = {...cart};
    if(newCart[food.name]){
      newCart[food.name].quantity+=1;
    }
    else {
      newCart[food.name] = {...food, quantity:1};
    }
 //   return newCart;
 setCart(newCart);
}

const handleIncrement = (food) => {
  let newCart = {...cart};
  if (newCart[food.name].quantity >= food.availabilityQuantity) {
    alert("Only "+ food.availabilityQuantity+ " quantity available!");
  }
  else
  {
    newCart[food.name].quantity +=1;
    setCart(newCart);
  }
};

const handleDecrement = (food) => {
  let newCart = { ...cart };
  if (newCart[food.name].quantity > 1) {
    newCart[food.name].quantity -= 1;
    setCart(newCart);
  }
};

return (
  <>
    <Navbar/>
    <div>
    <header>
      <h1>Menu</h1>
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
            <option value='Desserts'>Desserts</option>
          </select>

          <span>Show Only Vegetarian</span>
          <Switch checked={showveg} defaultChecked color="warning" id='switch'
    //        onChange={() => this.setState(prevState => ({ showveg: !prevState.showveg }))}
              onChange={() => setV((prev) => !prev)}
            />
        </div>
    </header>
    <div id="food-list">
      {filteredFood.map(food => {
        return (
          <div key={food.id} className='food-card'>
            <img src={food.image} alt={food.name} />
            <h3><strong>{food.name}</strong></h3>
            <p>{food.category}</p>
            <p><strong>Vegetarian: </strong>{food.vegetarian ? 'Yes' : 'No'}</p>
            <p><strong>Stock: </strong>{food.availabilityQuantity}</p>
            <p id='price'>₹{food.price}</p>
            {cart[food.name] ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                disabled={cart[food.name].quantity <= 1}>
                  <RemoveIcon onClick={() => handleDecrement(food)} style={{ fontSize: '24px', color: 'red' }}/>
              </button>
              <input
                    type="number"
                    value={cart[food.name].quantity}
                    readOnly
                  />
                  <button><AddIcon onClick={() => handleIncrement(food)} style={{ fontSize: '24px', color: 'green' }}/></button>
                </div>
            ) : (
              <Button onClick={() => handleCart(food)} size='small' variant='contained'>
                  Add to Cart
              </Button>
            )}
          </div>
        );
      })}
    </div>
    <Cart cartload={cart} />
    </div>
  </>
);
}

export default Menu2