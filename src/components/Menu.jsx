import React from 'react';
import Navbar from './Navbar';
import { Switch } from '@mui/material';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodList: [
        { id: 1, name: 'Veg Pizza', category: 'Italian', price: 180, vegetarian: true, availabilityQuantity: 15, image:"public/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg" },
        { id: 2, name: 'Non Veg Biryani', category: 'Italian', price: 220, vegetarian: false, availabilityQuantity: 8, image:"public/biryani in hyderabad.webp" },
        { id: 3, name: 'Paneer Butter Masala', category: 'Main Course', price: 200, vegetarian: true, availabilityQuantity: 10, image:"public/Paneer-Tikka-Kebabs-04-720x540.jpg" },
      ],
      searchTerm: '',
      showveg: false 
    };
  }

  search = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  handleCategoryChange = (event) => {
    this.setState({ selectCategory: event.target.value });
  }

  render() {
    const { foodList, searchTerm, showveg, selectCategory } = this.state;
    const filteredFood = foodList
    .filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(food => showveg ? food.vegetarian : true)
    .filter(food => selectCategory ? food.category === selectCategory : true);


    return (
      <>
        <Navbar/>
        <div id='bottom'>
        <header>
          <h1>Menu</h1>
          <div id='hi'><input type='text' 
            id='search-bar'
            placeholder='Search food...'
            onChange={this.search} /></div><br/>
            <div id='test'>
              <select onChange={this.handleCategoryChange} id='select'>
                <option value=''>All Categories</option>  {/* Default option */}
                <option value='Italian'>Italian</option>
                <option value='Main Course'>Main Course</option>
              </select>

              <span>Show Only Vegetarian</span>
              <Switch checked={showveg} defaultChecked color="warning" id='switch'
                onChange={() => this.setState(prevState => ({ showveg: !prevState.showveg }))}
                />
            </div>
        </header>
        <div id="food-list">
          {filteredFood.map(food => {
            return (
              <div key={food.id} className='food-card'>
                <img src={food.image} alt={food.name} style={{ width: '200px'}} />
                <h3><strong>{food.name}</strong></h3>
                <p>{food.category}</p>
                <p>₹{food.price}</p>
                <p><strong>Vegetarian: </strong>{food.vegetarian ? 'Yes' : 'No'}</p>
                <p><strong>Stock: </strong>{food.availabilityQuantity}</p>
              </div>
            );
          })}
        </div>
        </div>
      </>
    );
  }
}

export default Menu;