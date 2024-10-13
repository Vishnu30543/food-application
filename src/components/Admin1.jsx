//import React from 'react'
import { useEffect, useState } from 'react';
import {db} from '../Firebase2';
import { getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Form1 from './Form1';
import Navbar from './Navbar';

const Admin1 = () => {
  const [foods, setFoods] = useState([]);
  const [isediting, setisEdit] = useState(false);
  const [currfood, setcurrFood] = useState({name:'',category:'', price:'',vegetarian:'',availabilityQuantity:'',image:'', id:''})  
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

const deletefood = async(id) => {
    await deleteDoc(doc(db,"sampleapp",id));
    console.log("Record Deleted");
    fetchFoods();
}

const editfood = (item) => {
    setisEdit(true);
    setcurrFood(item);
}

const updatefood = async (e) => {
  e.preventDefault();
  try{
    await updateDoc(doc(db,"sampleapp",currfood.id), {
      name:currfood.name,
      category:currfood.category,
      price:currfood.price,
      vegetarian:currfood.vegetarian,
      availabilityQuantity:currfood.availabilityQuantity,
      image:currfood.image
    });
    setisEdit(false);
    fetchFoods();
  }
  catch(error){
    console.log("Error occured here : ",error)
  }
}

  return (
    <>
    <Navbar/>
    <div id='bottom'>Menu</div>
    <Form1 /> <br/><br/>
    <div id='table'>
        <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Vegetarian</th>
            <th>Availabe Quantity</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.vegetarian}</td>
              <td>{item.availabilityQuantity}</td>
              <td><img src={item.image} height={200}/></td>
              <td><button onClick={() => deletefood(item.id)}>Delete</button></td>
              <td><button onClick={() => editfood(item)}>Update</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        isediting && (
          <form onSubmit={updatefood}>
            <input type='text' value={currfood.name} onChange={(e) => setcurrFood({...currfood, name:e.target.value})}></input>
            <input type='text' value={currfood.category} onChange={(e) => setcurrFood({...currfood, category:e.target.value})}></input>
            <input type='number' value={currfood.price} onChange={(e) => setcurrFood({...currfood, price:e.target.value})}></input>
            <input type='text' value={currfood.vegetarian} onChange={(e) => setcurrFood({...currfood, vegetarian:e.target.value})}></input>
            <input type='number' value={currfood.availabilityQuantity} onChange={(e) => setcurrFood({...currfood, availabilityQuantity:e.target.value})}></input>
            <input type='text' value={currfood.image} onChange={(e) => setcurrFood({...currfood, image:e.target.value})}></input>
            <button type='submit' onClick={updatefood}>Save</button>
            <button type='button' onClick={()=>isediting(false)}>Cancel</button>
          </form>
        )
      }
      </div>
    </>
  );
}

export default Admin1